import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail } from 'lucide-react';
import { sendBrochureRequest } from '../../services/emailService';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // EmailJS est initialisé automatiquement dans le service

  const categories = [
    { id: 'MARIAGE', name: 'Mariage', color: '#f86d6d', textColor: '#fdd7e0' },
    { id: 'SHOOTING', name: 'Shooting', color: '#ffc3e2', textColor: '#f86d6d' },
    { id: 'FAMILLE', name: 'Famille', color: '#aad8e0', textColor: '#ebf3f7' },
    { id: 'PROFESSIONNEL', name: 'Professionnel', color: '#fdf6b8', textColor: '#f1bb45' },
    { id: 'EVENEMENTIEL', name: 'Événementiel', color: '#f1bb45', textColor: '#fdf6b8' },
    { id: 'AUTRES', name: 'Toutes mes prestations', color: '#ada133', textColor: '#ffffff' }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || selectedCategories.length === 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Envoi réel des brochures via EmailJS
      const success = await sendBrochureRequest({
        email: email,
        selectedCategories: selectedCategories,
        message: 'Demande de brochures depuis le site web'
      });

      if (success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setSelectedCategories([]);
    setSubmitStatus('idle');
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-lg shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-6">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#ada133]" />
                <h2 className="text-xl font-perandory text-black">Recevoir ma brochure</h2>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2 font-playfair">
                  Votre adresse email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ada133] focus:border-transparent font-playfair"
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              {/* Categories Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-3 font-playfair">
                  Catégories de prestations *
                </label>
                <p className="text-xs text-gray-600 mb-3 font-playfair">
                  Sélectionnez les brochures que vous souhaitez recevoir
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`p-3 rounded-lg border text-sm transition-all font-playfair ${
                        selectedCategories.includes(category.id)
                          ? 'border-transparent'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-black'
                      }`}
                      style={{
                        backgroundColor: selectedCategories.includes(category.id) ? category.color : undefined,
                        color: selectedCategories.includes(category.id) ? category.textColor : undefined
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                {selectedCategories.length === 0 && (
                  <p className="mt-2 text-xs text-red-500 font-playfair">
                    Veuillez sélectionner au moins une catégorie
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!email || selectedCategories.length === 0 || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-perandory text-white transition-all ${
                  !email || selectedCategories.length === 0 || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#ada133] hover:bg-[#9a9130] active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Envoi en cours...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center justify-center">
                    ✅ Brochure envoyée !
                  </span>
                ) : submitStatus === 'error' ? (
                  <span className="flex items-center justify-center">
                    ❌ Erreur d'envoi
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer ma brochure
                  </span>
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-green-800 text-sm font-playfair text-center">
                    Votre brochure sera envoyée à <strong>{email}</strong> dans les prochaines minutes.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-800 text-sm font-playfair text-center">
                    Une erreur s'est produite. Veuillez réessayer.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default BrochureModal;