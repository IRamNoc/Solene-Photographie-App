import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Configuration pour le stockage externe
// Vous pouvez utiliser AWS S3, Cloudinary, Uploadcare, etc.
// Exemple avec Cloudinary (à adapter selon votre choix)
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL || '';
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || '';

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Fonction pour télécharger une image vers Cloudinary
export const uploadToCloudinary = async (file: File): Promise<UploadResult> => {
  try {
    // Vérifier si la configuration Cloudinary est disponible
    if (!CLOUDINARY_UPLOAD_URL || !CLOUDINARY_PRESET) {
      throw new Error('Configuration Cloudinary manquante');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement');
    }
    
    const data = await response.json();
    return {
      success: true,
      url: data.secure_url
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

// Fonction pour télécharger une image et l'enregistrer dans la base de données
export const uploadPhoto = async (
  file: File, 
  eventId: string, 
  visibility: 'private' | 'client' | 'guest' = 'private',
  folderId: string | null = null
): Promise<UploadResult> => {
  try {
    let storagePath = '';
    
    // Essayer d'abord Cloudinary
    if (CLOUDINARY_UPLOAD_URL && CLOUDINARY_PRESET) {
      const uploadResult = await uploadToCloudinary(file);
      
      if (uploadResult.success && uploadResult.url) {
        storagePath = uploadResult.url;
      } else {
        console.warn('Cloudinary upload failed, falling back to Supabase storage');
      }
    }
    
    // Si Cloudinary échoue ou n'est pas configuré, utiliser Supabase
    if (!storagePath) {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}-${uuidv4()}.${fileExt}`;
      const filePath = `${eventId}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          contentType: file.type
        });
      
      if (uploadError) throw uploadError;
      storagePath = filePath;
    }
    
    // Enregistrer les métadonnées dans Supabase
    const { data, error } = await supabase
      .from('photos')
      .insert({
        event_id: eventId,
        storage_path: storagePath,
        visibility: visibility,
        folder_id: folderId,
        downloads: 0
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      url: storagePath
    };
  } catch (error) {
    console.error('Error in uploadPhoto:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

// Fonction pour récupérer l'URL d'une photo
export const getPhotoUrl = async (photoPath: string): Promise<string | null> => {
  // Si c'est déjà une URL complète (stockage externe), la retourner directement
  if (photoPath.startsWith('http')) {
    return photoPath;
  }
  
  // Sinon, c'est un chemin Supabase, créer une URL signée
  try {
    const { data, error } = await supabase.storage
      .from('photos')
      .createSignedUrl(photoPath, 3600);
    
    if (error) throw error;
    return data.signedUrl;
  } catch (error) {
    console.error('Error getting photo URL:', error);
    return null;
  }
};