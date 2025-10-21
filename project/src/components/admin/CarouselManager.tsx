import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Interface pour les images du carrousel
interface CarouselImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  order: number;
}

// Composant de gestion du carrousel pour l'admin
const CarouselManager: React.FC = () => {
  const [images, setImages] = useState<CarouselImage[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      alt: 'Paysage naturel 1',
      title: 'Séance Nature',
      order: 1
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Paysage naturel 2',
      title: 'Portrait Extérieur',
      order: 2
    }
  ]);

  const [newImage, setNewImage] = useState({
    url: '',
    alt: '',
    title: ''
  });

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Ajouter une nouvelle image
  const addImage = () => {
    if (!newImage.url || !newImage.alt) return;

    const image: CarouselImage = {
      id: Date.now().toString(),
      url: newImage.url,
      alt: newImage.alt,
      title: newImage.title,
      order: images.length + 1
    };

    setImages([...images, image]);
    setNewImage({ url: '', alt: '', title: '' });
  };

  // Supprimer une image
  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  // Réorganiser les images (drag & drop)
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = images.findIndex(img => img.id === draggedItem);
    const targetIndex = images.findIndex(img => img.id === targetId);

    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedImage);

    // Mettre à jour les ordres
    const updatedImages = newImages.map((img, index) => ({
      ...img,
      order: index + 1
    }));

    setImages(updatedImages);
    setDraggedItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-perandory text-[#B8A55C] mb-8 text-center">
        Gestion du Carrousel d'Images
      </h2>

      {/* Formulaire d'ajout */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Ajouter une nouvelle image</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="url"
            placeholder="URL de l'image"
            value={newImage.url}
            onChange={(e) => setNewImage({...newImage, url: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8A55C] focus:border-transparent"
          />
          
          <input
            type="text"
            placeholder="Texte alternatif"
            value={newImage.alt}
            onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8A55C] focus:border-transparent"
          />
          
          <input
            type="text"
            placeholder="Titre (optionnel)"
            value={newImage.title}
            onChange={(e) => setNewImage({...newImage, title: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8A55C] focus:border-transparent"
          />
        </div>
        
        <button
          onClick={addImage}
          className="bg-[#ada133] text-white px-6 py-2 rounded-lg hover:bg-[#9a9130] transition-colors font-medium"
        >
          Ajouter l'image
        </button>
      </div>

      {/* Liste des images */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Images du carrousel ({images.length})
        </h3>
        
        {images.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune image dans le carrousel</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images
              .sort((a, b) => a.order - b.order)
              .map((image) => (
                <motion.div
                  key={image.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, image.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, image.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="absolute top-2 left-2 bg-[#ada133] text-white px-2 py-1 rounded text-sm font-medium">
                      #{image.order}
                    </div>
                    
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      title="Supprimer l'image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {image.title || 'Sans titre'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{image.alt}</p>
                    <p className="text-xs text-gray-400 break-all">{image.url}</p>
                  </div>
                </motion.div>
              ))
            }
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Instructions :</h4>
        <ul className="text-sm text-blue-700 space-y-1 ml-4">
          <li>• Glissez-déposez les images pour changer leur ordre dans le carrousel</li>
          <li>• Les images s'affichent dans l'ordre numéroté sur le site</li>
          <li>• Utilisez des URLs d'images valides (HTTPS recommandé)</li>
          <li>• Le texte alternatif est important pour l'accessibilité</li>
        </ul>
      </div>
    </div>
  );
};

export default CarouselManager;