import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQItem } from '../../data/faqData';

// Icône chevron simple en SVG
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface FAQSectionProps {
  faqData?: FAQItem[];
}

// FAQ par défaut pour les mariages
const defaultFaqData: FAQItem[] = [
  {
    id: 1,
    question: "Comment réserver une prestation mariage ?",
    answer: "Il vous suffit de me contacter, le moindre détail sur votre mariage m'intéresse ! Je vous propose un appel pour faire connaissance et découvrir votre projet. La réservation se fait par la signature d'un contrat signé et l'accompte reçu."
  },
  {
    id: 2,
    question: "Où es-tu basée ? Jusqu'où peux-tu te rendre ?",
    answer: "Je suis basée à Paris, mais j'aime voyager et découvrir de nouveaux lieux ! Je me déplace partout en France et même à l'étranger. Les frais de déplacement et de logement à ma charge. Vous recevrez vos photos dans un délai de 4 mois après la prestation. Elles seront mises en ligne dans votre galerie privée pendant 1 an. Vous pourrez ensuite les télécharger et les partager avec vos invités si vous le souhaitez."
  },
  {
    id: 3,
    question: "Qui prends les frais de déplacement et de logement à sa charge ?",
    answer: "Les frais de déplacement et de logement sont à ma charge. Je prends en charge le transport et l'hébergement quand cela est possible. Je réalise toutes mes prestations en France et à l'étranger. Raisonnable et transparent."
  },
  {
    id: 4,
    question: "Comment seront livrées les photos ? Et sous quel délais ?",
    answer: "Vous recevrez vos photos dans un délai de 4 mois après la prestation. Elles seront mises en ligne dans votre galerie privée pendant 1 an. Vous pourrez ensuite les télécharger et les partager avec vos invités si vous le souhaitez."
  },
  {
    id: 5,
    question: "Combien de temps les photos restent-elles sur la galerie en ligne ?",
    answer: "Vos photos restent disponibles dans votre galerie privée pendant 1 an. Vous pouvez les télécharger et les partager avec vos invités si vous le souhaitez."
  },
  {
    id: 6,
    question: "En quoi consiste l'option album photo ? Et l'option de clé USB ?",
    answer: "Album photo : un album de vos photos, à conserver physiquement sans téléchargement dans cette boîte aux lettres électroniques. Clé USB : une clé complète de vos photos, à conserver physiquement sans téléchargement dans cette boîte aux lettres électroniques."
  },
  {
    id: 7,
    question: "Je ne suis pas à l'aise devant un appareil photo, comment faire ?",
    answer: "C'est tout à fait normal — et vous n'êtes pas seul ! Dès notre première rencontre, je vous mets à l'aise. Il ne s'agit pas de \"bien poser\" mais de vivre un moment vrai. Je vous accompagne, je vous guide et je vous rassure."
  },
  {
    id: 8,
    question: "Peut-on refuser ou contrôler la diffusion des photos ? Et pour nos invités ?",
    answer: "Oui, bien sûr ! Vous avez un droit à l'image et ne publie jamais sans votre accord. Concernant vos invités, je respecte toujours le droit à l'image et ne publie jamais sans leur accord. La diffusion se fait toujours de manière raisonnable."
  }
];

const FAQSection: React.FC<FAQSectionProps> = ({ faqData = defaultFaqData }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-[#f6f6f6]">
      <div className="max-w-4xl mx-auto">
        {/* Titre de la section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-perandory text-gray-800 mb-4">
            FAQ
          </h2>
        </motion.div>

        {/* Liste des questions */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Question */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-gray-800 pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>

              {/* Réponse */}
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed font-playfair">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FAQSection;