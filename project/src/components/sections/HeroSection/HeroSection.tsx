import React from 'react';
import PhotographyDefinitions from './PhotographyDefinitions';
import CaptureCallToAction from './CaptureCallToAction';

const HeroSection: React.FC = () => {
  return (
    <section 
      className="w-full" 
      style={{ 
        backgroundColor: '#f5f3f0', /* FOND BEIGE */
        paddingTop: 'clamp(160px, 15vw, 280px)', /* PADDING TOP TRÈS RÉDUIT MOBILE - 160px au lieu de 220px */
        paddingBottom: 'clamp(24px, 5vw, 120px)' /* PADDING BOTTOM RÉDUIT MOBILE */
      }}
    >
      <div 
        className="max-w-8xl mx-auto"
        style={{
          paddingLeft: 'clamp(16px, 3vw, 64px)', /* PADDING LATERAL RÉDUIT MOBILE */
          paddingRight: 'clamp(16px, 3vw, 64px)' /* PADDING LATERAL RÉDUIT MOBILE */
        }}
      >
        <div 
          className="flex flex-col md:flex-row items-start" 
          style={{
            gap: 'clamp(20px, 4vw, 48px)' /* GAP RÉDUIT MOBILE */
          }}
        >
          {/* ORDRE INVERSÉ POUR MOBILE : CaptureCallToAction en premier sur mobile, PhotographyDefinitions en premier sur desktop */}
          <div className="order-2 md:order-1 w-full md:w-[65%]">
            <PhotographyDefinitions />
          </div>
          <div className="order-1 md:order-2 w-full md:w-[35%]">
            <CaptureCallToAction />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;