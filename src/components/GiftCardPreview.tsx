import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface GiftCardPreviewProps {
  className?: string;
}

const GiftCardPreview: React.FC<GiftCardPreviewProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-8 border-[#ff96bf]">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="bg-[#ff5f5f] flex items-center justify-center">
                    <div className="bg-[#ff96bf] rounded-full w-4/5 h-4/5 flex items-center justify-center">
                      <h3 className="font-perandory text-[#ff5f5f] text-2xl md:text-3xl text-center">
                        CARTE<br/>CADEAU
                      </h3>
                    </div>
                  </div>
                  <div className="grid grid-rows-3">
                    <div className="bg-[#97d5e6] relative">
                      <div className="absolute top-1/4 left-1/4 w-8 h-6 bg-white rounded-[100%]" />
                    </div>
                    <div className="bg-[#fff27e] flex items-center justify-center">
                      <span className="font-perandory text-[#abcf5a] opacity-20 text-4xl">ST.</span>
                    </div>
                    <div className="bg-[#abcf5a]" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-perandory text-4xl text-[#998e79] mb-6">CARTE CADEAU</h2>
              <p className="text-[#998e79] mb-8 leading-relaxed">
                Offrez une expérience photographique unique à vos proches. 
                La carte cadeau est personnalisable et peut être utilisée pour toutes nos prestations.
              </p>
              <Link 
                to="/boutique/carte-cadeau"
                className="inline-block bg-[#ff96bf] text-white font-perandory px-8 py-3 rounded-full hover:bg-[#ff5f5f] transition-colors"
              >
                EN VOIR PLUS
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftCardPreview;