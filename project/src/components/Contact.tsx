import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, X } from 'lucide-react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  selectedPackages: string[];
  description: string;
  questions: string;
  images: File[];
};

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6 }
};

// Import services data from Services component
const services = [
  {
    id: 'mariage',
    title: 'Mariage',
    packages: [
      { name: 'Classique', price: '900€' },
      { name: 'Signature', price: '1200€' },
      { name: 'HÉRITAGE', price: '1500€' },
      { name: 'Formule étendue', price: '1700€' }
    ]
  },
  {
    id: 'engagement',
    title: 'Engagement',
    packages: [
      { name: 'EXPECTING', price: '130€' }
    ]
  },
  {
    id: 'maternite',
    title: 'Maternité',
    packages: [
      { name: 'EXPECTING', price: '130€' }
    ]
  },
  {
    id: 'naissance',
    title: 'Naissance',
    packages: [
      { name: 'Bienvenue au monde', price: '75€' },
      { name: 'Jolis souvenirs', price: '130€' }
    ]
  },
  {
    id: 'famille',
    title: 'Famille',
    packages: [
      { name: 'Photo de famille', price: '75€' },
      { name: 'Jolis souvenirs', price: '130€' },
      { name: 'Reportage', price: '300€' }
    ]
  },
  {
    id: 'autres',
    title: 'Autres services',
    packages: [
      { name: 'Promesse', price: '75€' },
      { name: 'Blooming', price: '75€' }
    ]
  }
];

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    services: [],
    selectedPackages: [],
    description: '',
    questions: '',
    images: [],
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [imageError, setImageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => {
      const newServices = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service].slice(0, 3);
      
      // Remove selected packages for services that are no longer selected
      const newSelectedPackages = prev.selectedPackages.filter(pkg => {
        const serviceForPackage = services.find(s => 
          s.packages.some(p => p.name === pkg) && 
          newServices.includes(s.id)
        );
        return serviceForPackage !== undefined;
      });

      return { 
        ...prev, 
        services: newServices,
        selectedPackages: newSelectedPackages
      };
    });
  };

  const handlePackageChange = (packageName: string) => {
    setFormData(prev => {
      const newSelectedPackages = prev.selectedPackages.includes(packageName)
        ? prev.selectedPackages.filter(p => p !== packageName)
        : [...prev.selectedPackages, packageName];
      return { ...prev, selectedPackages: newSelectedPackages };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageError('');

    if (formData.images.length + files.length > MAX_IMAGES) {
      setImageError(`Vous ne pouvez télécharger que ${MAX_IMAGES} images maximum`);
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        setImageError('Certains fichiers dépassent la limite de 5MB');
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setImageError('Seules les images sont acceptées');
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles].slice(0, MAX_IMAGES),
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImageError('');
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.location.trim()) newErrors.location = 'La localisation est requise';
    if (formData.services.length === 0) newErrors.services = 'Sélectionnez au moins une formule';
    if (formData.selectedPackages.length === 0) newErrors.selectedPackages = 'Sélectionnez au moins une formule spécifique';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file: File) => {
            formDataToSend.append('images', file);
          });
        } else if (key === 'services' || key === 'selectedPackages') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('https://formspree.io/f/martin.contal@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          location: '',
          services: [],
          selectedPackages: [],
          description: '',
          questions: '',
          images: [],
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen pt-20 bg-primary/10"
      {...pageTransition}
    >
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=2071&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative text-center text-text">
          <h1 className="text-4xl md:text-5xl font-perandory mb-4">Contact</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            Parlons de votre projet
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-text mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow ${
                    errors.firstName ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-text mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow ${
                    errors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-text mb-1">
                  Localisation *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ville, département..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow ${
                    errors.location ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Services Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text mb-3">
                Catégories de prestations * (3 maximum)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceChange(service.id)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      formData.services.includes(service.id)
                        ? 'bg-primary text-text border-primary'
                        : 'border-gray-200 hover:border-primary hover:bg-primary/10'
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
              {errors.services && (
                <p className="mt-1 text-sm text-red-500">{errors.services}</p>
              )}
            </div>

            {/* Package Selection */}
            {formData.services.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-text mb-3">
                  Formules spécifiques *
                </label>
                <div className="space-y-4">
                  {formData.services.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    if (!service) return null;

                    return (
                      <div key={service.id} className="bg-primary/10 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">{service.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.packages.map((pkg) => (
                            <button
                              key={pkg.name}
                              type="button"
                              onClick={() => handlePackageChange(pkg.name)}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-colors ${
                                formData.selectedPackages.includes(pkg.name)
                                  ? 'bg-primary text-text border-primary'
                                  : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/10'
                              }`}
                            >
                              <span>{pkg.name}</span>
                              <span className="font-medium">{pkg.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.selectedPackages && (
                  <p className="mt-1 text-sm text-red-500">{errors.selectedPackages}</p>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-sm font-medium text-text mb-1">
                Description du projet (optionnel)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                placeholder="Parlez-nous de votre projet..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text mb-3">
                Inspirations (optionnel - 10 images maximum)
              </label>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="images"
                    className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-primary/30 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                  >
                    <Upload className="w-8 h-8 text-primary-dark mb-2" />
                    <span className="text-sm text-text">
                      Cliquez pour ajouter vos images
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG jusqu'à 5MB
                    </span>
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {imageError && (
                  <p className="text-sm text-red-500">{imageError}</p>
                )}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative group aspect-square">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Questions */}
            <div className="mb-8">
              <label htmlFor="questions" className="block text-sm font-medium text-text mb-1">
                Questions (optionnel)
              </label>
              <textarea
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow"
                placeholder="Vos questions..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-accent hover:bg-primary-dark'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="mr-2"
                    >
                      <Send className="w-4 h-4" />
                    </motion.span>
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer ma demande
                  </span>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="mt-4 text-green-600 text-center">
                  Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="mt-4 text-red-500 text-center">
                  Une erreur est survenue lors de l'envoi. Veuillez réessayer.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;