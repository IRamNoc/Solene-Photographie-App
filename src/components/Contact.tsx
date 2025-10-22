import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, X } from 'lucide-react';
import { FORMSPREE_CONFIG } from '../config/formspree';

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
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB (Basin limit)

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6 }
};

// Import services data from current prestations data with colors
const services = [
  {
    id: 'mariage',
    title: 'Mariage',
    color: 'bg-[#f86d6d]',
    textColor: 'text-[#fdd7e0]',
    packages: [
      { name: 'Essentiel', price: '400€' },
      { name: 'Classique', price: '1 250€' },
      { name: 'Signature', price: '1 500€' },
      { name: 'Prestige', price: '1 900€' }
    ]
  },
  {
    id: 'shooting',
    title: 'Shooting',
    color: 'bg-[#ffc3e2]',
    textColor: 'text-[#f86d6d]',
    packages: [
      { name: 'Flash', price: '70€' },
      { name: 'Classique', price: '90€' },
      { name: 'Reportage', price: '150€' },
      { name: 'Éditorial', price: '150€' }
    ]
  },
  {
    id: 'famille',
    title: 'Famille',
    color: 'bg-[#aad8e0]',
    textColor: 'text-[#ebf3f7]',
    packages: [
      { name: 'Photo de famille', price: '70€' },
      { name: 'Reportage', price: '150€' }
    ]
  },
  {
    id: 'evenementiel',
    title: 'Événementiel',
    color: 'bg-[#f1bb45]',
    textColor: 'text-[#fdf6b8]',
    packages: [
      { name: 'Instant', price: '200€' },
      { name: 'Soirée', price: '350€' },
      { name: 'Journée', price: '450€' }
    ]
  },
  {
    id: 'professionnel',
    title: 'Professionnel',
    color: 'bg-[#fdf6b8]',
    textColor: 'text-[#f1bb45]',
    packages: [
      { name: 'Professionnel', price: '150€' }
    ]
  },
  {
    id: 'autres',
    title: 'Autres services',
    color: 'bg-[#ada133]',
    textColor: 'text-[#fdf6b8]',
    packages: [
      { name: 'Cartes cadeaux', price: '50€ - 70€ - 100€' },
      { name: 'Options supplémentaires', price: 'Tarifs variables' },
      { name: 'Formule sur mesure', price: 'Sur devis' }
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
        setImageError('Certains fichiers dépassent la limite de 100MB');
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
    if (formData.services.length === 0) newErrors.services = ['Sélectionnez au moins une formule'];
    if (formData.selectedPackages.length === 0) newErrors.selectedPackages = ['Sélectionnez au moins une formule spécifique'];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Format professional email content
      const selectedServicesDetails = formData.services.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return service ? service.title : serviceId;
      }).join(', ');

      const selectedPackagesDetails = formData.selectedPackages.map(packageName => {
        // Find the package with its price
        for (const service of services) {
          const pkg = service.packages.find(p => p.name === packageName);
          if (pkg) {
            return `${pkg.name} (${pkg.price})`;
          }
        }
        return packageName;
      }).join(', ');

      const emailContent = `
NOUVELLE DEMANDE DE DEVIS - SOLÈNE PHOTOGRAPHIE

═══════════════════════════════════════════════════════════════

📋 INFORMATIONS CLIENT
═══════════════════════════════════════════════════════════════
• Nom complet : ${formData.firstName} ${formData.lastName}
• Email : ${formData.email}
• Téléphone : ${formData.phone}
• Localisation : ${formData.location}

📸 PRESTATIONS DEMANDÉES
═══════════════════════════════════════════════════════════════
• Catégories : ${selectedServicesDetails}
• Formules spécifiques : ${selectedPackagesDetails}

📝 DÉTAILS DU PROJET
═══════════════════════════════════════════════════════════════
${formData.description ? `Description : ${formData.description}` : 'Aucune description fournie'}

❓ QUESTIONS SPÉCIFIQUES
═══════════════════════════════════════════════════════════════
${formData.questions ? formData.questions : 'Aucune question spécifique'}

🖼️ IMAGES D'INSPIRATION
═══════════════════════════════════════════════════════════════
• Nombre d'images jointes : ${formData.images.length}
${formData.images.length > 0 ? '• Images d\'inspiration jointes à cette demande' : '• Aucune image sélectionnée'}

═══════════════════════════════════════════════════════════════
Demande reçue le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
      `;

      const formDataToSend = new FormData();
      
      // Add formatted email content
      formDataToSend.append('_subject', `Nouvelle demande de devis - ${formData.firstName} ${formData.lastName}`);
      formDataToSend.append('message', emailContent);
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_format', 'plain');
      
      // Add individual fields for better processing
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('services', selectedServicesDetails);
      formDataToSend.append('packages', selectedPackagesDetails);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('questions', formData.questions);

      // Add image files to FormData (Basin supports file uploads)
      formData.images.forEach((file, index) => {
        formDataToSend.append(`image_${index}`, file);
      });

      const response = await fetch(FORMSPREE_CONFIG.CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        // Remove headers for multipart/form-data (let browser set Content-Type with boundary)
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen pt-48 bg-gray-50"
      {...pageTransition}
    >
      {/* Form Section - Moved up and simplified */}
      <section className="pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1 font-playfair">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black ${
                    errors.firstName ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500 font-playfair">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-black mb-1 font-playfair">
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black ${
                    errors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500 font-playfair">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1 font-playfair">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 font-playfair">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-1 font-playfair">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 font-playfair">{errors.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-black mb-1 font-playfair">
                  Localisation *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ville, département..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black ${
                    errors.location ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500 font-playfair">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Services Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black mb-3 font-playfair">
                Catégories de prestations * (3 maximum)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceChange(service.id)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors font-playfair ${
                      formData.services.includes(service.id)
                        ? `${service.color} ${service.textColor} border-transparent`
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-black'
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
              {errors.services && (
                <p className="mt-1 text-sm text-red-500 font-playfair">{errors.services}</p>
              )}
            </div>

            {/* Package Selection */}
            {formData.services.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-black mb-3 font-playfair">
                  Formules spécifiques *
                </label>
                <div className="space-y-4">
                  {formData.services.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    if (!service) return null;

                    return (
                      <div key={service.id} className={`${service.color}/10 p-4 rounded-lg`}>
                        <h3 className="font-medium mb-3 font-playfair">{service.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.packages.map((pkg) => (
                            <button
                              key={pkg.name}
                              type="button"
                              onClick={() => handlePackageChange(pkg.name)}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-colors font-playfair ${
                                formData.selectedPackages.includes(pkg.name)
                                  ? `${service.color} ${service.textColor} border-transparent`
                                  : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-black'
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
                  <p className="mt-1 text-sm text-red-500 font-playfair">{errors.selectedPackages}</p>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-sm font-medium text-black mb-1 font-playfair">
                Description du projet (optionnel)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black"
                placeholder="Parlez-nous de votre projet..."
              />
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black mb-3 font-playfair">
                Inspirations (optionnel - 10 images maximum, 100MB par fichier)
              </label>
              <div className="space-y-4">
                
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="images"
                    className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-primary/30 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                  >
                    <Upload className="w-8 h-8 text-primary-dark mb-2" />
                    <span className="text-sm text-black font-playfair">
                      Sélectionner vos images d'inspiration
                    </span>
                    <span className="text-xs text-gray-400 mt-1 font-playfair">
                      PNG, JPG, GIF, WebP jusqu'à 100MB par fichier
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
                  <p className="text-sm text-red-500 font-playfair">{imageError}</p>
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
              <label htmlFor="questions" className="block text-sm font-medium text-black mb-1 font-playfair">
                Questions (optionnel)
              </label>
              <textarea
                id="questions"
                name="questions"
                value={formData.questions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow font-playfair text-black"
                placeholder="Vos questions..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 rounded-full text-white font-medium transition-colors font-playfair ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'hover:bg-[#9a9130] transition-colors'
                }`}
                style={{
                  backgroundColor: isSubmitting ? undefined : '#ada133'
                }}
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-green-800 font-medium font-playfair mb-2">
                        Demande envoyée avec succès !
                      </h3>
                      <p className="text-green-700 text-sm font-playfair">
                        Votre demande de devis a été transmise à Solène.<br />
                        Vous recevrez une réponse personnalisée sous 24-48h à l'adresse : <strong>{formData.email}</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-red-800 font-medium font-playfair mb-2">
                        ❌ Erreur lors de l'envoi
                      </h3>
                      <p className="text-red-700 text-sm font-playfair">
                        Une erreur technique est survenue. Veuillez réessayer ou nous contacter directement à :<br />
                        <strong>solenetrm.photographie@gmail.com</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;