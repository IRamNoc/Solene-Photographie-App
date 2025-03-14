import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: { title: string; clientPassword: string; guestPassword: string }) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    clientPassword: '',
    guestPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.clientPassword.trim()) {
      newErrors.clientPassword = 'Le mot de passe client est requis';
    }
    if (!formData.guestPassword.trim()) {
      newErrors.guestPassword = 'Le mot de passe invité est requis';
    }
    if (formData.clientPassword === formData.guestPassword) {
      newErrors.guestPassword = 'Les mots de passe doivent être différents';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ title: '', clientPassword: '', guestPassword: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg rounded-lg bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-medium">Nouvel événement</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="clientPassword" className="block text-sm font-medium text-gray-700">
                  Mot de passe client
                </label>
                <input
                  type="text"
                  id="clientPassword"
                  value={formData.clientPassword}
                  onChange={(e) => setFormData({ ...formData, clientPassword: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm ${
                    errors.clientPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.clientPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.clientPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="guestPassword" className="block text-sm font-medium text-gray-700">
                  Mot de passe invités
                </label>
                <input
                  type="text"
                  id="guestPassword"
                  value={formData.guestPassword}
                  onChange={(e) => setFormData({ ...formData, guestPassword: e.target.value })}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm ${
                    errors.guestPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.guestPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.guestPassword}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Créer l'événement
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};