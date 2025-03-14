import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { uploadPhoto, getPhotoUrl } from '../../lib/storage';
import { Upload, X, FolderPlus, Settings2, Download, Lock, Unlock, Grid, List, Plus } from 'lucide-react';
import { EventSettingsModal } from './modals/EventSettingsModal';
import { FolderModal } from './modals/FolderModal';
import { PhotoViewerModal } from './modals/PhotoViewerModal';
import { NewEventModal } from './modals/NewEventModal';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Event {
  id: string;
  title: string;
  client_password?: string;
  guest_password?: string;
  clientPassword?: string;
  guestPassword?: string;
}

interface Photo {
  id: string;
  storage_path: string;
  visibility: 'private' | 'client' | 'guest';
  downloads: number;
  folder_id: string | null;
}

interface Folder {
  id: string;
  name: string;
  event_id: string;
}

const AdminGallery = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'downloads'>('date');
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [viewerPhoto, setViewerPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchPhotos(selectedEvent.id);
      fetchFolders(selectedEvent.id);
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEvents(data || []);
      if (data && data.length > 0 && !selectedEvent) {
        setSelectedEvent(data[0]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Erreur lors de la récupération des événements');
    }
  };

  const fetchPhotos = async (eventId: string) => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('photos')
        .select('*')
        .eq('event_id', eventId);

      if (sortBy === 'downloads') {
        query = query.order('downloads', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: true });
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch all signed URLs in parallel
      const urlPromises = (data || []).map(async (photo) => {
        if (!photo.storage_path) {
          console.error('Missing storage path for photo:', photo);
          return null;
        }

        try {
          // Utiliser la nouvelle fonction getPhotoUrl
          const signedUrl = await getPhotoUrl(photo.storage_path);
          
          if (!signedUrl) {
            throw new Error('Failed to get signed URL');
          }

          return { id: photo.id, url: signedUrl };
        } catch (error) {
          console.error('Error creating signed URL for photo:', photo.id, error);
          return null;
        }
      });

      const urls = await Promise.all(urlPromises);
      const newSignedUrls: Record<string, string> = {};
      urls.forEach(result => {
        if (result) {
          newSignedUrls[result.id] = result.url;
        }
      });

      setSignedUrls(newSignedUrls);
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast.error('Erreur lors de la récupération des photos');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFolders = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFolders(data || []);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length || !selectedEvent) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const totalFiles = files.length;
      let uploadedFiles = 0;

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast.error(`Le fichier ${file.name} n'est pas une image`);
          continue;
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt || '')) {
          toast.error(`Format non supporté pour ${file.name}. Utilisez JPG, PNG, GIF ou WebP`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} est trop volumineux (max 5MB)`);
          continue;
        }

        // Utiliser la nouvelle fonction uploadPhoto
        const result = await uploadPhoto(
          file,
          selectedEvent.id,
          'private',
          selectedFolder
        );

        if (!result.success) {
          throw new Error(result.error || 'Échec du téléchargement');
        }

        uploadedFiles++;
        setUploadProgress((uploadedFiles / totalFiles) * 100);
      }

      toast.success(`${uploadedFiles} photos téléchargées avec succès`);
      fetchPhotos(selectedEvent.id);
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast.error('Erreur lors du téléchargement des photos');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCreateEvent = async (eventData: { title: string; clientPassword: string; guestPassword: string }) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          title: eventData.title,
          client_password: eventData.clientPassword,
          guest_password: eventData.guestPassword
        })
        .select()
        .single();

      if (error) throw error;

      setEvents([data, ...events]);
      setSelectedEvent(data);
      toast.success('Événement créé avec succès');
      setShowNewEventModal(false);
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Erreur lors de la création de l\'événement');
    }
  };

  const handleCreateFolder = async (name: string) => {
    if (!selectedEvent) return;

    try {
      const { data, error } = await supabase
        .from('folders')
        .insert({
          name,
          event_id: selectedEvent.id
        })
        .select()
        .single();

      if (error) throw error;

      setFolders([...folders, data]);
      toast.success('Dossier créé avec succès');
      setShowFolderModal(false);
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error('Erreur lors de la création du dossier');
    }
  };

  const handleMoveToFolder = async (photoIds: string[], folderId: string | null) => {
    try {
      const { error } = await supabase
        .from('photos')
        .update({ folder_id: folderId })
        .in('id', photoIds);

      if (error) throw error;

      setPhotos(photos.map(photo => 
        photoIds.includes(photo.id) ? { ...photo, folder_id: folderId } : photo
      ));

      toast. success('Photos déplacées avec succès');
      setSelectedPhotos(new Set());
    } catch (error) {
      console.error('Error moving photos:', error);
      toast.error('Erreur lors du déplacement des photos');
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedPhotos.size === 0) {
      toast.error('Aucune photo sélectionnée');
      return;
    }

    try {
      const zip = new JSZip();
      let downloadCount = 0;

      const selectedPhotosList = photos.filter(photo => selectedPhotos.has(photo.id));

      for (const photo of selectedPhotosList) {
        try {
          if (!signedUrls[photo.id]) {
            console.error('No signed URL for photo:', photo.id);
            continue;
          }

          const response = await fetch(signedUrls[photo.id]);
          if (!response.ok) {
            console.error('Error downloading photo:', photo.id, response.statusText);
            continue;
          }

          const blob = await response.blob();
          const fileName = photo.storage_path.split('/').pop() || 'photo.jpg';
          
          zip.file(fileName, blob);
          downloadCount++;

          // Increment download counter
          const { error } = await supabase
            .from('photos')
            .update({ downloads: photo.downloads + 1 })
            .eq('id', photo.id);

          if (error) {
            console.error('Error updating download count:', error);
          }
        } catch (error) {
          console.error('Error downloading photo:', photo.id, error);
        }
      }

      if (downloadCount > 0) {
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `${selectedEvent?.title || 'photos'}_selection.zip`);
        toast.success(`${downloadCount} photos téléchargées avec succès`);
        
        // Refresh photos to update download counts
        if (selectedEvent) {
          fetchPhotos(selectedEvent.id);
        }
      } else {
        toast.error('Aucune photo n\'a pu être téléchargée');
      }
    } catch (error) {
      console.error('Error downloading photos:', error);
      toast.error('Erreur lors du téléchargement des photos');
    }

    // Clear selection after download
    setSelectedPhotos(new Set());
  };

  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();
      let downloadCount = 0;

      const folderMap = new Map<string | null, JSZip>();
      folders.forEach(folder => {
        folderMap.set(folder.id, zip.folder(folder.name)!);
      });
      folderMap.set(null, zip);

      for (const photo of photos) {
        try {
          if (!signedUrls[photo.id]) {
            console.error('No signed URL for photo:', photo.id);
            continue;
          }

          const response = await fetch(signedUrls[photo.id]);
          if (!response.ok) {
            console.error('Error downloading photo:', photo.id, response.statusText);
            continue;
          }

          const blob = await response.blob();
          const fileName = photo.storage_path.split('/').pop() || 'photo.jpg';
          
          const targetFolder = folderMap.get(photo.folder_id);
          if (targetFolder) {
            targetFolder.file(fileName, blob);
            downloadCount++;
          }
        } catch (error) {
          console.error('Error downloading photo:', photo.id, error);
        }
      }

      if (downloadCount > 0) {
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `${selectedEvent?.title || 'photos'}.zip`);
        toast.success(`${downloadCount} photos téléchargées avec succès`);
      } else {
        toast.error('Aucune photo n\'a pu être téléchargée');
      }
    } catch (error) {
      console.error('Error downloading photos:', error);
      toast.error('Erreur lors du téléchargement des photos');
    }
  };

  const handleUpdateEvent = async (eventData: Partial<Event>) => {
    if (!selectedEvent) return;

    try {
      // Convert clientPassword to client_password for database
      const dbEventData = {
        title: eventData.title,
        client_password: eventData.clientPassword,
        guest_password: eventData.guestPassword
      };

      const { error } = await supabase
        .from('events')
        .update(dbEventData)
        .eq('id', selectedEvent.id);

      if (error) throw error;

      // Update local state with the new data
      const updatedEvent = {
        ...selectedEvent,
        title: eventData.title || selectedEvent.title,
        client_password: eventData.clientPassword || selectedEvent.client_password,
        guest_password: eventData.guestPassword || selectedEvent.guest_password,
        clientPassword: eventData.clientPassword || selectedEvent.clientPassword,
        guestPassword: eventData.guestPassword || selectedEvent.guestPassword
      };

      setEvents(events.map(event =>
        event.id === selectedEvent.id ? updatedEvent : event
      ));
      setSelectedEvent(updatedEvent);
      toast.success('Événement mis à jour avec succès');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Erreur lors de la mise à jour de l\'événement');
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      // First, delete all photos from storage
      for (const photo of photos) {
        if (!photo.storage_path) continue;

        // Si c'est une URL externe, pas besoin de supprimer du stockage Supabase
        if (!photo.storage_path.startsWith('http')) {
          const { error: storageError } = await supabase.storage
            .from('photos')
            .remove([photo.storage_path]);

          if (storageError) {
            console.error('Error deleting photo from storage:', storageError);
          }
        }
      }

      // Then delete all photos from the database
      const { error: photosError } = await supabase
        .from('photos')
        .delete()
        .eq('event_id', selectedEvent.id);

      if (photosError) throw photosError;

      // Delete all folders
      const { error: foldersError } = await supabase
        .from('folders')
        .delete()
        .eq('event_id', selectedEvent.id);

      if (foldersError) throw foldersError;

      // Finally delete the event
      const { error: eventError } = await supabase
        .from('events')
        .delete()
        .eq('id', selectedEvent.id);

      if (eventError) throw eventError;

      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setSelectedEvent(events.find(event => event.id !== selectedEvent.id) || null);
      toast.success('Événement supprimé avec succès');
      setShowSettingsModal(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Erreur lors de la suppression de l\'événement');
    }
  };

  const handlePhotoClick = (e: React.MouseEvent, photo: Photo) => {
    // Prevent click event if clicking on buttons or select
    if ((e.target as HTMLElement).closest('button, select')) {
      return;
    }

    if (e.ctrlKey || e.metaKey) {
      // Toggle photo selection
      setSelectedPhotos(prev => {
        const newSelection = new Set(prev);
        if (newSelection.has(photo.id)) {
          newSelection.delete(photo.id);
        } else {
          newSelection.add(photo.id);
        }
        return newSelection;
      });
    } else {
      // Open photo viewer
      setViewerPhoto(photo);
    }
  };

  const handleToggleVisibility = async (photo: Photo) => {
    const newVisibility = photo.visibility === 'private' ? 'client' : 'private';

    try {
      const { error } = await supabase
        .from('photos')
        .update({ visibility: newVisibility })
        .eq('id', photo.id);

      if (error) throw error;

      setPhotos(photos.map(p =>
        p.id === photo.id ? { ...p, visibility: newVisibility } : p
      ));

      toast.success(`Photo ${newVisibility === 'private' ? 'masquée' : 'visible'}`);
    } catch (error) {
      console.error('Error updating photo visibility:', error);
      toast.error('Erreur lors de la mise à jour de la visibilité');
    }
  };

  return (
    <div className="min-h-screen bg-primary/10 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Event Selection Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow flex items-center gap-4">
              <select
                value={selectedEvent?.id || ''}
                onChange={(e) => {
                  const event = events.find(evt => evt.id === e.target.value);
                  setSelectedEvent(event || null);
                }}
                className="flex-grow px-4 py-2 rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
              >
                {events.length === 0 && (
                  <option value="" disabled>Aucun événement</option>
                )}
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowNewEventModal(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-accent text-white hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Nouvel événement</span>
              </button>
            </div>
            {selectedEvent && (
              <button
                onClick={() => setShowSettingsModal(true)}
                className="inline-flex items-center px-4 py-2 rounded-lg border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                <Settings2 className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Paramètres</span>
              </button>
            )}
          </div>
        </div>

        {selectedEvent && (
          <>
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 rounded-lg ${
                      isUploading
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-accent text-white hover:bg-primary-dark'
                    } transition-colors`}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {isUploading ? (
                      <span>Upload en cours ({Math.round(uploadProgress)}%)</span>
                    ) : (
                      'Ajouter des photos'
                    )}
                  </label>
                </div>

                <button
                  onClick={() => setShowFolderModal(true)}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-primary/30 hover:bg-primary/20 transition-colors"
                >
                  <FolderPlus className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Nouveau dossier</span>
                </button>

                <button
                  onClick={handleDownloadAll}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-primary/30 hover:bg-primary/20 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Tout télécharger</span>
                </button>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                {selectedPhotos.size > 0 && (
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleDownloadSelected}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-accent text-white hover:bg-primary-dark transition-colors"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      <span className="hidden sm:inline">Télécharger</span>
                      <span className="ml-2">({selectedPhotos.size})</span>
                    </button>

                    <select
                      onChange={(e) => {
                        const folderId = e.target.value || null;
                        handleMoveToFolder(Array.from(selectedPhotos), folderId);
                      }}
                      className="px-4 py-2 rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                      value=""
                    >
                      <option value="" disabled>Déplacer vers...</option>
                      <option value="">Sans dossier</option>
                      {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as 'date' | 'downloads');
                      if (selectedEvent) {
                        fetchPhotos(selectedEvent.id);
                      }
                    }}
                    className="px-4 py-2 rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                  >
                    <option value="date">Trier par date</option>
                    <option value="downloads">Trier par popularité</option>
                  </select>

                  <div className="flex items-center border border-primary/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-text' : 'hover:bg-primary/20'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-text' : 'hover:bg-primary/20'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Folders */}
            {folders.length > 0 && (
              <div className="mb-8 overflow-x-auto">
                <div className="flex items-center space-x-4 min-w-max pb-2">
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedFolder === null
                        ? 'bg-primary text-text'
                        : 'bg-white border border-primary/30 hover:bg-primary/20'
                    }`}
                  >
                    Toutes les photos
                  </button>
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedFolder === folder.id
                          ? 'bg-primary text-text'
                          : 'bg-white border border-primary/30 hover:bg-primary/20'
                      }`}
                    >
                      {folder.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Photos Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                  Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="aspect-square bg-primary/20 rounded-lg animate-pulse"
                    />
                  ))
                ) : (
                  photos
                    .filter(photo => selectedFolder === null || photo.folder_id === selectedFolder)
                    .map((photo) => (
                      <div
                        key={photo.id}
                        className={`relative aspect-square group cursor-pointer transition-all ${
                          selectedPhotos.has(photo.id)
                            ? 'ring-2 ring-accent ring-offset-2'
                            : 'hover:shadow-lg'
                        }`}
                        onClick={(e) => handlePhotoClick(e, photo)}
                      >
                        {signedUrls[photo.id] ? (
                          <img
                            src={signedUrls[photo.id]}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                            onError={() => {
                              // Refresh the signed URL if the image fails to load
                              const refreshSignedUrl = async () => {
                                try {
                                  const signedUrl = await getPhotoUrl(photo.storage_path);
                                  
                                  if (signedUrl) {
                                    setSignedUrls(prev => ({
                                      ...prev,
                                      [photo.id]: signedUrl
                                    }));
                                  }
                                } catch (error) {
                                  console.error('Error refreshing signed URL:', error);
                                }
                              };
                              refreshSignedUrl();
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/20 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">Chargement...</span>
                          </div>
                        )}

                        {/* Controls Overlay */}
                        <div className={`absolute inset-0 rounded-lg transition-opacity ${
                          selectedPhotos.has(photo.id)
                            ? 'bg-primary/10'
                            : 'bg-black/0 group-hover:bg-primary/10'
                        }`}>
                          {/* Top Controls */}
                          <div className={`absolute top-2 right-2 transition-opacity ${
                            selectedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleVisibility(photo);
                              }}
                              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                                photo.visibility === 'private'
                                  ? 'bg-primary/50 text-text'
                                  : 'bg-white/90 text-text'
                              }`}
                            >
                              {photo.visibility === 'private' ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Unlock className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Bottom Controls */}
                          <div className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg transition-opacity ${
                            selectedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                            <div className="flex items-center justify-between">
                              <select
                                value={photo.folder_id || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleMoveToFolder([photo.id], e.target.value || null);
                                }}
                                className="w-3/4 px-2 py-1 text-sm bg-white/90 rounded"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="">Sans dossier</option>
                                {folders.map((folder) => (
                                  <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                  </option>
                                ))}
                              </select>
                              <div className="flex items-center text-white text-sm ml-2">
                                <Download className="w-4 h-4 mr-1" />
                                <span>{photo.downloads}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="h-16 border-b border-primary/10 animate-pulse"
                    >
                      <div className="h-full flex items-center px-4">
                        <div className="w-12 h-12 bg-primary/20 rounded" />
                        <div className="ml-4 flex-grow">
                          <div className="h-4 w-1/4 bg-primary/20 rounded" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  photos
                    .filter(photo => selectedFolder === null || photo.folder_id === selectedFolder)
                    .map((photo) => (
                      <div
                        key={photo.id}
                        className={`border-b border-primary/10 last:border-0 transition-colors ${
                          selectedPhotos.has(photo.id)
                            ? 'bg-primary/10'
                            : 'hover:bg-primary/5'
                        }`}
                        onClick={(e) => handlePhotoClick(e, photo)}
                      >
                        <div className="flex items-center px-4 py-2">
                          <div className="w-16 h-16 relative flex-shrink-0">
                            {signedUrls[photo.id] ? (
                              <img
                                src={signedUrls[photo.id]}
                                alt=""
                                className="w-full h-full object-cover rounded"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary/20 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Chargement...</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="flex items-center justify-between">
                              <select
                                value={photo.folder_id || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleMoveToFolder([photo.id], e.target.value || null);
                                }}
                                className="px-2 py-1 text-sm border border-primary/20 rounded"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="">Sans dossier</option>
                                {folders.map((folder) => (
                                  <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                  </option>
                                ))}
                              </select>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center text-text text-sm">
                                  <Download className="w-4 h-4 mr-1" />
                                  <span>{photo.downloads}</span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleVisibility(photo);
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    photo.visibility === 'private'
                                      ? 'bg-primary text-text'
                                      : 'bg-primary/10 text-text'
                                  }`}
                                >
                                  {photo.visibility === 'private' ? (
                                    <Lock className="w-4 h-4" />
                                  ) : (
                                    <Unlock className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {selectedEvent && (
        <>
          <EventSettingsModal
            isOpen={showSettingsModal}
            onClose={() => setShowSettingsModal(false)}
            event={selectedEvent}
            onUpdate={handleUpdateEvent}
            onDelete={handleDeleteEvent}
          />
          <FolderModal
            isOpen={showFolderModal}
            onClose={() => setShowFolderModal(false)}
            onSubmit={handleCreateFolder}
          />
          {viewerPhoto && (
            <PhotoViewerModal
              isOpen={true}
              onClose={() => setViewerPhoto(null)}
              photoUrl={signedUrls[viewerPhoto.id] || ''}
              visibility={viewerPhoto.visibility}
              downloads={viewerPhoto.downloads}
              onVisibilityChange={() => handleToggleVisibility(viewerPhoto)}
            />
          )}
        </>
      )}

      <NewEventModal
        isOpen={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default AdminGallery;