import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, Lock, Unlock } from 'lucide-react';

interface PhotoViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  visibility: 'private' | 'client' | 'guest';
  downloads: number;
  onVisibilityChange: () => void;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({
  isOpen,
  onClose,
  photoUrl,
  visibility,
  downloads,
  onVisibilityChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="absolute right-0 top-0 z-10 flex items-center space-x-2 p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVisibilityChange();
              }}
              className={`rounded-full p-2 transition-colors ${
                visibility === 'private'
                  ? 'bg-black/50 text-white'
                  : 'bg-white/90 text-black'
              }`}
            >
              {visibility === 'private' ? (
                <Lock className="h-5 w-5" />
              ) : (
                <Unlock className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative">
            <img
              src={photoUrl}
              alt=""
              className="max-h-[90vh] w-auto"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/ 60 to-transparent p-4 text-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                <span>{downloads}</span>
              </div>
            </div>
            <div className="text-sm">
              {visibility === 'private' ? 'Photo privée' : visibility === 'client' ? 'Visible par le client' : 'Visible par tous'}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};