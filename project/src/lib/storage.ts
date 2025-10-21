// Service de stockage utilisant l'API backend MongoDB

// Configuration de l'API backend
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  images?: any[];
}

interface Image {
  _id: string;
  eventId: string;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  fullUrl: string;
  thumbnailFullUrl?: string;
  size: number;
  mimetype: string;
  dimensions: {
    width: number;
    height: number;
  };
  visibility: 'private' | 'client' | 'guest';
  folder: string;
  downloads: number;
  approvedByClient: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  clientEmail?: string;
  status: 'active' | 'archived' | 'draft';
  settings: {
    allowDownload: boolean;
    allowSelection: boolean;
    maxSelections: number;
  };
  imageCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Fonction pour uploader des photos
export const uploadPhotos = async (
  files: FileList | File[],
  eventId: string,
  visibility: 'private' | 'client' | 'guest' = 'private',
  folder: string = 'default'
): Promise<UploadResult> => {
  try {
    const formData = new FormData();
    
    // Ajouter les fichiers au FormData
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });
    
    // Ajouter les métadonnées
    formData.append('visibility', visibility);
    formData.append('folder', folder);
    
    const response = await fetch(`${API_BASE_URL}/api/images/upload/${eventId}`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de l\'upload');
    }
    
    const data = await response.json();
    return {
      success: true,
      images: data.images
    };
  } catch (error) {
    console.error('Error uploading photos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

// Fonction pour récupérer les images d'un événement
export const getEventImages = async (
  eventId: string,
  options: {
    visibility?: 'private' | 'client' | 'guest';
    folder?: string;
    page?: number;
    limit?: number;
  } = {}
): Promise<{ images: Image[]; pagination?: any }> => {
  try {
    const params = new URLSearchParams();
    if (options.visibility) params.append('visibility', options.visibility);
    if (options.folder) params.append('folder', options.folder);
    if (options.page) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());
    
    const response = await fetch(`${API_BASE_URL}/api/images/event/${eventId}?${params}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des images');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event images:', error);
    return { images: [] };
  }
};

// Fonction pour récupérer une image spécifique
export const getImage = async (imageId: string): Promise<Image | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}`);
    
    if (!response.ok) {
      throw new Error('Image non trouvée');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

// Fonction pour mettre à jour une image
export const updateImage = async (
  imageId: string,
  updates: Partial<Pick<Image, 'visibility' | 'folder' | 'approvedByClient'>>
): Promise<Image | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating image:', error);
    return null;
  }
};

// Fonction pour supprimer une image
export const deleteImage = async (imageId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Fonction pour enregistrer un téléchargement
export const recordDownload = async (imageId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}/download`, {
      method: 'POST',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error recording download:', error);
    return false;
  }
};

// Fonctions pour la gestion des événements
export const createEvent = async (eventData: {
  title: string;
  description?: string;
  date?: string;
  clientEmail?: string;
  clientPassword?: string;
  guestPassword?: string;
  settings?: Partial<Event['settings']>;
}): Promise<Event | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'événement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    return null;
  }
};

export const getEvents = async (options: {
  status?: 'active' | 'archived' | 'draft';
  page?: number;
  limit?: number;
} = {}): Promise<{ events: Event[]; pagination?: any }> => {
  try {
    const params = new URLSearchParams();
    if (options.status) params.append('status', options.status);
    if (options.page) params.append('page', options.page.toString());
    if (options.limit) params.append('limit', options.limit.toString());
    
    const response = await fetch(`${API_BASE_URL}/api/events?${params}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des événements');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return { events: [] };
  }
};

export const getEvent = async (eventId: string): Promise<Event | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
    
    if (!response.ok) {
      throw new Error('Événement non trouvé');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

export const authenticateEvent = async (
  eventId: string,
  password: string,
  type: 'client' | 'guest'
): Promise<{ success: boolean; userType?: string; event?: any; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, type }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error };
    }
    
    return data;
  } catch (error) {
    console.error('Error authenticating event:', error);
    return { success: false, error: 'Erreur de connexion' };
  }
};

// Fonction utilitaire pour obtenir l'URL complète d'une image
export const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${API_BASE_URL}${imagePath}`;
};

// Alias pour compatibilité avec l'ancien code
export const getPhotoUrl = getImageUrl;

// Alias pour uploadPhoto (compatibilité avec l'ancien code)
export const uploadPhoto = async (
  file: File,
  eventId: string,
  visibility: 'private' | 'client' | 'guest' = 'private',
  folderId: string | null = null
): Promise<UploadResult> => {
  const folder = folderId || 'default';
  return uploadPhotos([file], eventId, visibility, folder);
};

// Export des types pour utilisation dans d'autres composants
export type { Image, Event, UploadResult };