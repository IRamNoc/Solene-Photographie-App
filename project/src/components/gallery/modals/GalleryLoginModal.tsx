import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Users, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../../../lib/supabase';

interface Event {
  id: string;
  title: string;
}

interface GalleryLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export const GalleryLoginModal: React.FC<GalleryLoginModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'client' | 'guest'>('client');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get the event details to check password
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('client_password, guest_password')
        .eq('id', event.id)
        .single();

      if (eventError) throw eventError;

      const correctPassword = userType === 'client' 
        ? eventData.client_password 
        : eventData.guest_password;

      if (password !== correctPassword) {
        setError('Mot de passe incorrect');
        setIsLoading(false);
        return;
      }

      // If password is correct, navigate to gallery view
      toast.success('Connexion réussie');
      navigate(`/gallery/view/${event.id}`, { 
        state: { 
          eventId: event.id,
          userType,
          eventTitle: event.title
        } 
      });
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
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
          className="relative w-full max-w-md rounded-lg bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-perandory text-accent">{event.title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-2">
                Type d'accès
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
                    userType === 'client'
                      ? 'bg-primary text-text border-primary'
                      : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/10'
                  }`}
                >
                  <User className="w-6 h-6 mb-2 text-accent" />
                  <span className="font-medium">Client</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('guest')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
                    userType === 'guest'
                      ? 'bg-primary text-text border-primary'
                      : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/10'
                  }`}
                >
                  <Users className="w-6 h-6 mb-2 text-accent" />
                  <span className="font-medium">Invité</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary-dark" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  placeholder={userType === 'client' ? 'Mot de passe client' : 'Mot de passe invité'}
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {userType === 'client' 
                  ? 'Entrez le mot de passe fourni par le photographe pour accéder à toutes vos photos.'
                  : 'Entrez le mot de passe invité pour accéder aux photos partagées.'}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex items-center px-4 py-2 rounded-lg ${
                  isLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-accent text-white hover:bg-primary-dark'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Connexion...
                  </>
                ) : (
                  'Accéder à la galerie'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};