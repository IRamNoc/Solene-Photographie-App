import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Camera, Calendar, Lock } from 'lucide-react';
import { GalleryLoginModal } from './modals/GalleryLoginModal';

interface Event {
  id: string;
  title: string;
  created_at: string;
}

export const GalleryList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, title, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowLoginModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen pt-20 bg-primary/10">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506259091721-347e791bab0f?auto=format&fit=crop&w=2070&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative text-center text-text">
          <h1 className="text-4xl md:text-5xl font-perandory mb-4">Galeries</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            Retrouvez les photos de vos événements
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 mx-auto text-primary-dark mb-4" />
                <h3 className="text-xl font-medium text-text mb-2">Aucune galerie disponible</h3>
                <p className="text-gray-500">
                  Revenez plus tard pour voir les photos de vos événements.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="h-48 bg-primary/5 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-primary/30" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-perandory text-white">{event.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-text mb-4">
                        <Calendar className="w-4 h-4 mr-2 text-primary-dark" />
                        <span className="text-sm">{formatDate(event.created_at)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Accès protégé</span>
                        <Lock className="w-4 h-4 text-primary-dark" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Login Modal */}
      {selectedEvent && (
        <GalleryLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default GalleryList;