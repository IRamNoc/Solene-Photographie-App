import React from 'react';
import { useNavigate } from 'react-router-dom';

// Services avec les couleurs exactes
const services = [
  {
    id: 1,
    title: 'MARIAGE',
    color: 'bg-[#f86d6d]', // Couleur de fond
    textColor: 'text-[#fdd7e0]', // Couleur du texte
    route: '/prestations/mariage'
  },
  {
    id: 2,
    title: 'SHOOTING',
    color: 'bg-[#ffc3e2]', // Couleur de fond
    textColor: 'text-[#f86d6d]', // Couleur du texte
    route: '/prestations/shooting'
  },
  {
    id: 3,
    title: 'FAMILLE',
    color: 'bg-[#aad8e0]', // Couleur de fond
    textColor: 'text-[#ebf3f7]', // Couleur du texte
    route: '/prestations/famille'
  },
  {
    id: 4,
    title: 'PROFESSIONNEL',
    color: 'bg-[#fdf6b8]', // Couleur de fond
    textColor: 'text-[#f1bb45]', // Couleur du texte
    route: '/prestations/professionnel'
  },
  {
    id: 5,
    title: 'ÉVÉNEMENTIEL',
    color: 'bg-[#f1bb45]', // Couleur de fond
    textColor: 'text-[#fdf6b8]', // Couleur du texte
    route: '/prestations/evenementiel'
  },
  {
    id: 6,
    title: 'AUTRES',
    color: 'bg-[#ada133]', // Couleur de fond
    textColor: 'text-[#fdf6b8]', // Couleur du texte
    route: '/prestations/autres'
  }
];

const PrestationsMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Section Prestations avec espacement optimal */}
      <section 
        id="prestations-grid"
        className="pt-32 md:pt-40 pb-24 px-2 md:px-4 lg:px-6"
      >
        {/* Grille des services - 2 lignes de 3 colonnes avec plus d'espace */}
        <div className="w-full mt-16">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4 max-w-none mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.route)}
                className={`${service.color} ${service.textColor} h-64 md:h-72 lg:h-80 flex items-center justify-center cursor-pointer group rounded-none`}
              >
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-perandory font-normal tracking-wider transition-transform duration-300 group-hover:scale-105">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestationsMenu;