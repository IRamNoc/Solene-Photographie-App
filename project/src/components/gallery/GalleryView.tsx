import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { getPhotoUrl } from '../../lib/storage';
import { Download, ArrowLeft, FolderOpen, Grid, List, X, Lock, Unlock, Check } from 'lucide-react';
import { toast } from 'sonner';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface Photo {
  id: string;
  storage_path: string;
  visibility: 'private' | 'client' | 'guest';
  downloads: number;
  folder_id: string | null;
  approved_by_client: boolean;
}

interface Folder {
  id: string;
  name: string;
  event_id: string;
}

interface LocationState {
  eventId: string;
  userType: 'client' | 'guest';
  eventTitle: string;
}

export const GalleryView = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());

  const isClient = state?.userType === 'client';

  useEffect(() => {
    if (!state) {
      navigate('/gallery');
      return;
    }
    
    fetchPhotos();
    fetchFolders();
  }, [id, state]);

  const fetchPhotos = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const userType = state?.userType || 'guest';
      
      let query = supabase
        .from('photos')
        .select('*')
        .eq('event_id', id);
      
      // Filter by visibility based on user type
      if (userType === 'guest') {
        query = query.eq('visibility', 'guest');
      } else if (userType === 'client') {
        query = query.in('visibility', ['client', 'guest']);
      }
      
      const { data, error } = await query.order('created_at', { ascending: true });

      if (error) throw error;

      // Fetch all signed URLs in parallel
      const urlPromises = (data || []).map(async (photo) => {
        if (!photo.storage_path) return null;

        try {
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

  const fetchFolders = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .eq('event_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFolders(data || []);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleDownload = async (photo: Photo) => {
    try {
      if (!signedUrls[photo.id]) {
        toast.error('Impossible de télécharger cette photo');
        return;
      }

      const response = await fetch(signedUrls[photo.id]);
      if (!response.ok) {
        toast.error('Erreur lors du téléchargement');
        return;
      }

      const blob = await response.blob();
      const fileName = photo.storage_path.split('/').pop() || 'photo.jpg';
      
      saveAs(blob, fileName);
      
      // Increment download counter
      const { error } = await supabase
        .from('photos')
        .update({ downloads: photo.downloads + 1 })
        .eq('id', photo.id);

      if (error) {
        console.error('Error updating download count:', error);
      }
      
      toast.success('Photo téléchargée avec succès');
    } catch (error) {
      console.error('Error downloading photo:', error);
      toast.error('Erreur lors du téléchargement');
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
        saveAs(zipBlob, `${state?.eventTitle || 'photos'}_selection.zip`);
        toast.success(`${downloadCount} photos téléchargées avec succès`);
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

      const filteredPhotos = selectedFolder 
        ? photos.filter(photo => photo.folder_id === selectedFolder)
        : photos;

      for (const photo of filteredPhotos) {
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
        saveAs(zipBlob, `${state?.eventTitle || 'photos'}.zip`);
        toast.success(`${downloadCount} photos téléchargées avec succès`);
      } else {
        toast.error('Aucune photo n\'a pu être téléchargée');
      }
    } catch (error) {
      console.error('Error downloading photos:', error);
      toast.error('Erreur lors du téléchargement des photos');
    }
  };

  const handlePhotoClick = (e: React.MouseEvent, photo: Photo) => {
    // Prevent click event if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
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
      setSelectedPhoto(photo);
    }
  };

  const handleToggleVisibility = async (photo: Photo) => {
    if (!isClient) return;

    const newVisibility = photo.visibility === 'guest' ? 'client' : 'guest';

    try {
      const { error } = await supabase
        .from('photos')
        .update({ visibility: newVisibility })
        .eq('id', photo.id);

      if (error) throw error;

      setPhotos(photos.map(p =>
        p.id === photo.id ? { ...p, visibility: newVisibility } : p
      ));

      toast.success(`Photo ${newVisibility === 'client' ? 'masquée aux invités' : 'visible pour les invités'}`);
    } catch (error) {
      console.error('Error updating photo visibility:', error);
      toast.error('Erreur lors de la mise à jour de la visibilité');
    }
  };

  const handleToggleApproval = async (photo: Photo) => {
    if (!isClient) return;

    const newApprovalStatus = !photo.approved_by_client;

    try {
      const { error } = await supabase
        .from('photos')
        .update({ approved_by_client: newApprovalStatus })
        .eq('id', photo.id);

      if (error) throw error;

      setPhotos(photos.map(p =>
        p.id === photo.id ? { ...p, approved_by_client: newApprovalStatus } : p
      ));

      toast.success(`Photo ${newApprovalStatus ? 'approuvée' : 'désapprouvée'}`);
    } catch (error) {
      console.error('Error updating photo approval status:', error);
      toast.error('Erreur lors de la mise à jour du statut d\'approbation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center text-gray-700 hover:text-black"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Retour aux galeries</span>
            </button>
            <h1 className="text-2xl font-serif">{state?.eventTitle || 'Galerie'}</h1>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm px-3 py-1 bg-gray-100 rounded-full">
                {state?.userType === 'client' ? 'Accès client' : 'Accès invité'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            <span>Tout télécharger</span>
          </button>

          {selectedPhotos.size > 0 && (
            <button
              onClick={handleDownloadSelected}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-black text-black hover:bg-gray-100 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              <span>Télécharger la sélection ({selectedPhotos.size})</span>
            </button>
          )}

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
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
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
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
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
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
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))
            ) : photos.filter(photo => selectedFolder === null || photo.folder_id === selectedFolder).length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune photo disponible</h3>
                <p className="text-gray-500">
                  Il n'y a pas encore de photos dans cette galerie.
                </p>
              </div>
            ) : (
              photos
                .filter(photo => selectedFolder === null || photo.folder_id === selectedFolder)
                .map((photo) => (
                  <div
                    key={photo.id}
                    className={`relative aspect-square group cursor-pointer transition-all ${
                      selectedPhotos.has(photo.id)
                        ? 'ring-2 ring-black ring-offset-2'
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
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Chargement...</span>
                      </div>
                    )}

                    {/* Controls Overlay */}
                    <div className={`absolute inset-0 rounded-lg transition-opacity ${
                      selectedPhotos.has(photo.id)
                        ? 'bg-black/10'
                        : 'bg-black/0 group-hover:bg-black/10'
                    }`}>
                      {/* Top Controls */}
                      {isClient && (
                        <div className={`absolute top-2 right-2 flex space-x-2 transition-opacity ${
                          selectedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleVisibility(photo);
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                              photo.visibility === 'guest'
                                ? 'bg-white/90 text-black'
                                : 'bg-black/50 text-white'
                            }`}
                            title={photo.visibility === 'guest' ? 'Masquer aux invités' : 'Rendre visible aux invités'}
                          >
                            {photo.visibility === 'guest' ? (
                              <Unlock className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleApproval(photo);
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                              photo.approved_by_client
                                ? 'bg-green-500/90 text-white'
                                : 'bg-gray-200/90 text-gray-700'
                            }`}
                            title={photo.approved_by_client ? 'Retirer l\'approbation' : 'Approuver cette photo'}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Controls */}
                      <div className={`absolute bottom-2 right-2 transition-opacity ${
                        selectedPhotos.has(photo.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(photo);
                          }}
                          className="p-2 rounded-full backdrop-blur-sm bg-white/90 text-black hover:bg-white transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
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
                  className="h-16 border-b border-gray-100 animate-pulse"
                >
                  <div className="h-full flex items-center px-4">
                    <div className="w-12 h-12 bg-gray-200 rounded" />
                    <div className="ml-4 flex-grow">
                      <div className="h-4 w-1/4 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : photos.filter(photo => selectedFolder === null || photo.folder_id === selectedFolder).length === 0 ? (
              <div className="py-12 text-center">
                <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune photo disponible</h3>
                <p className="text-gray-500">
                  Il n'y a pas encore de photos dans cette galerie.
                </p>
              </div>
            ) : (
              photos
                .filter(photo => selectedFolder === null || photo.folder_id === selectedFolder)
                .map((photo) => (
                  <div
                    key={photo.id}
                    className={`border-b border-gray-100 last:border-0 transition-colors ${
                      selectedPhotos.has(photo.id)
                        ? 'bg-gray-50'
                        : 'hover:bg-gray-50'
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
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Chargement...</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {photo.storage_path.split('/').pop() || 'Photo'}
                          </span>
                          <div className="flex items-center space-x-2">
                            {isClient && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleVisibility(photo);
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    photo.visibility === 'guest'
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'bg-gray-900 text-white'
                                  }`}
                                  title={photo.visibility === 'guest' ? 'Masquer aux invités' : 'Rendre visible aux invités'}
                                >
                                  {photo.visibility === 'guest' ? (
                                    <Unlock className="w-4 h-4" />
                                  ) : (
                                    <Lock className="w-4 h-4" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleApproval(photo);
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    photo.approved_by_client
                                      ? 'bg-green-500 text-white'
                                      : 'bg-gray-100 text-gray-900'
                                  }`}
                                  title={photo.approved_by_client ? 'Retirer l\'approbation' : 'Approuver cette photo'}
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(photo);
                              }}
                              className="p-1.5 rounded bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
                            >
                              <Download className="w-4 h-4" />
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
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90"
              onClick={() => setSelectedPhoto(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
            >
              <div className="absolute right-0 top-0 z-10 flex items-center space-x-2 p-4">
                {isClient && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedPhoto) handleToggleVisibility(selectedPhoto);
                      }}
                      className={`rounded-full p-2 transition-colors ${
                        selectedPhoto?.visibility === 'guest'
                          ? 'bg-white/20 text-white'
                          : 'bg-black/50 text-white'
                      }`}
                      title={selectedPhoto?.visibility === 'guest' ? 'Masquer aux invités' : 'Rendre visible aux invités'}
                    >
                      {selectedPhoto?.visibility === 'guest' ? (
                        <Unlock className="h-5 w-5" />
                      ) : (
                        <Lock className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedPhoto) handleToggleApproval(selectedPhoto);
                      }}
                      className={`rounded-full p-2 transition-colors ${
                        selectedPhoto?.approved_by_client
                          ? 'bg-green-500/80 text-white'
                          : 'bg-white/20 text-white'
                      }`}
                      title={selectedPhoto?.approved_by_client ? 'Retirer l\'approbation' : 'Approuver cette photo'}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPhoto) handleDownload(selectedPhoto);
                  }}
                  className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative">
                {selectedPhoto && signedUrls[selectedPhoto.id] && (
                  <img
                    src={signedUrls[selectedPhoto.id]}
                    alt=""
                    className="max-h-[90vh] w-auto"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryView;