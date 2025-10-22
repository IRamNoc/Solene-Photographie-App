import React from 'react';

const MentionsLegales: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 py-16 mt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font text-center text-gray-900 mb-8">
            Mentions Légales
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center font-playfair">
            Solène_Trm Photographie
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="text-center mb-6 sm:mb-12">
            <h1 className="text-xl sm:text-4xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
              Mentions Légales
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 font-playfair">
              Solène_Trm Photographie
            </p>
          </div>

          <div className="prose prose-sm sm:prose-lg max-w-none space-y-4 sm:space-y-8">
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Informations générales
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p>
                  <strong>Nom de l'entreprise :</strong> Solène_Trm Photographie
                </p>
                <p>
                  <strong>Statut juridique :</strong> Micro-entreprise
                </p>
                <p>
                  <strong>Numéro SIRET :</strong> 98765432100012
                </p>
                <p>
                  <strong>Adresse :</strong> 123 Rue de la Photographie, 75001 Paris, France
                </p>
                <p>
                  <strong>Téléphone :</strong> +33 1 23 45 67 89
                </p>
                <p>
                  <strong>Email :</strong> contact@solenetrm-photographie.fr
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Activité
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p>
                  Photographe professionnelle : prestations de photographies de mariage, événements (remises de diplômes, soirées), portraits, séances studio ou extérieures, retouches et livraisons numériques ou imprimées sur demande.
                </p>
              </div>
            </section>

            {/* Section 3 - Hébergement du site */}
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Hébergement du site
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p><strong>Hébergeur :</strong> Contabo GmbH</p>
                <p><strong>Adresse :</strong> Aschauer Strasse 32a, 81549 München, Allemagne</p>
                <p><strong>Téléphone :</strong> +49 (0) 89 212 683 72</p>
                <p><strong>Fax :</strong> +49 (0) 89 216 658 62</p>
                <p><strong>Numéro d'enregistrement :</strong> HRB 180722 (AG Munich)</p>
                <p><strong>TVA :</strong> DE267602842</p>
              </div>
            </section>

            {/* Section 4 - Responsable de la publication */}
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Responsable de la publication
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p><strong>Solène Termeau</strong></p>
                <p><strong>Contact :</strong> solenetrm.photographie@gmail.com</p>
              </div>
            </section>

            {/* Section 5 - Propriété intellectuelle */}
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Propriété intellectuelle
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p>
                  L'ensemble du contenu de ce site (textes, photographies, logos, éléments graphiques…) est la propriété exclusive de Solene Trm Photographie, sauf mention contraire.
                </p>
                <p>
                  Toute reproduction, diffusion ou utilisation sans autorisation écrite préalable est strictement interdite.
                </p>
              </div>
            </section>

            {/* Section 6 - Protection des données personnelles */}
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Protection des données personnelles
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p>
                  Les informations collectées via le formulaire de contact sont utilisées uniquement pour répondre aux demandes des utilisateurs.
                </p>
                <p>
                  Aucune donnée personnelle n'est vendue ni transmise à des tiers.
                </p>
                <p>
                  Conformément à la loi Informatique et Libertés et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à solenetrm.photographie@gmail.com
                </p>
              </div>
            </section>

            {/* Section 7 - Limitation de responsabilité */}
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Limitation de responsabilité
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed text-justify text-xs sm:text-base">
                <p>
                  Solene Trm Photographie ne pourra être tenue responsable des dommages directs ou indirects liés à l'utilisation du site ou à son indisponibilité temporaire.
                </p>
              </div>
            </section>

            {/* Section 8 - Droit applicable */}
            <section>
              <h2 className="text-sm sm:text-2xl font-bold text-gray-900 font-playfair mb-2 sm:mb-4">
                Droit applicable
              </h2>
              <div className="text-gray-700 font-playfair leading-tight sm:leading-relaxed space-y-2 sm:space-y-4 text-justify text-xs sm:text-base">
                <p>
                  Les présentes mentions légales sont régies par le droit français.
                </p>
                <p>
                  En cas de litige, les tribunaux compétents seront ceux du ressort de Paris (Île de France).
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 font-playfair">
            © 2024 Solène_Trm Photographie - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;