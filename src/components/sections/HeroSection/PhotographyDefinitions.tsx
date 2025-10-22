import React from 'react';

const PhotographyDefinitions: React.FC = () => {
  return (
    <div 
      className="flex-shrink-0 bg-white shadow-sm"
      style={{
        padding: 'clamp(16px, 4vw, 48px)' /* PADDING INTERNE BLOC BLANC RESPONSIVE - RÉDUIT MOBILE */
      }}
    >
      {/* TITRE PRINCIPAL */}
      <div style={{ marginBottom: 'clamp(1px, 0.5vw, 4px)' /* ESPACE RÉDUIT MOBILE */ }}>
        <h1 
          className="font-perandory font-normal text-black tracking-wide"
          style={{
            fontSize: 'clamp(20px, 5vw, 55px)', /* TAILLE TITRE ENCORE PLUS RÉDUITE MOBILE - 20px au lieu de 28px */
            lineHeight: '1.0', /* INTERLIGNE TRÈS SERRÉ POUR MOBILE */
            marginBottom: '6px',
            textAlign: 'left'
          }}
        >
          PHOTOGRAPHIE,
        </h1>
      </div>

      {/* DÉFINITIONS ÉTYMOLOGIQUES - BLOC UNIFORME */}
      <div style={{ 
        marginBottom: 'clamp(12px, 2vw, 32px)', /* ESPACE ENCORE PLUS RÉDUIT MOBILE */
        display: 'flex',
        flexDirection: 'column',
        gap: '0px'
      }}>
        <p 
          className="font-playfair italic text-black"
          style={{
            fontSize: 'clamp(8px, 2vw, 13.1px)', /* TAILLE ENCORE PLUS RÉDUITE MOBILE - 8px au lieu de 11px */
            lineHeight: '1.4', /* INTERLIGNE ENCORE PLUS RÉDUIT MOBILE */
            margin: '0',
            textAlign: 'left'
          }}
        >
          Nom féminin
        </p>
        <p 
          className="font-playfair text-black"
          style={{
            fontSize: 'clamp(8px, 2vw, 13.1px)', /* TAILLE ENCORE PLUS RÉDUITE MOBILE - 8px au lieu de 11px */
            lineHeight: '1.4', /* INTERLIGNE ENCORE PLUS RÉDUIT MOBILE */
            margin: '0',
            textAlign: 'left'
          }}
        >
          <span className="font-playfair">Photo</span>, <span className="italic">φωτός</span> : lumière, clarté. « qui procède de la lumière »
        </p>
        <p 
          className="font-playfair text-black"
          style={{
            fontSize: 'clamp(8px, 2vw, 13.1px)', /* TAILLE ENCORE PLUS RÉDUITE MOBILE - 8px au lieu de 11px */
            lineHeight: '1.4', /* INTERLIGNE ENCORE PLUS RÉDUIT MOBILE */
            margin: '0',
            textAlign: 'left'
          }}
        >
          <span className="font-playfair">graphie</span>, <span className="italic">γραφειν</span> : peindre, dessiner, écrire « qui écrit », « qui aboutit à une image ».
        </p>
      </div>

      {/* CITATIONS NUMÉROTÉES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 1.5vw, 16px)' /* GAP ENCORE PLUS RÉDUIT MOBILE */ }}>
        {/* Citation I - Alignée à droite */}
        <div>
          <p 
            className="font-playfair text-black italic mobile-hero-citations"
            style={{
              fontSize: 'clamp(10px, 2.5vw, 18.6px)', /* TAILLE CITATIONS ENCORE PLUS RÉDUITE MOBILE - 10px au lieu de 14px */
              lineHeight: '1.2', /* INTERLIGNE ENCORE PLUS RÉDUIT MOBILE */
              textAlign: 'right'
            }}
          >
            <span className="font-medium italic">I.</span> L'art de suspendre le temps, de figer<br />
            un souvenir dans l'éternité pour le chérir.
          </p>
        </div>
        
        {/* Citation II - Alignée à droite */}
        <div>
          <p 
            className="font-playfair text-black italic mobile-hero-citations"
            style={{
              fontSize: 'clamp(10px, 2.5vw, 18.6px)', /* TAILLE CITATIONS ENCORE PLUS RÉDUITE MOBILE */
              lineHeight: '1.2', /* INTERLIGNE ENCORE PLUS RÉDUIT MOBILE */
              textAlign: 'right'
            }}
          >
            <span className="font-medium italic">II.</span> L'acte de traduire en image ce que l'on voit,<br />
            mais aussi ce que l'on ressent : émotion, atmosphère, lumière
          </p>
        </div>
        
        {/* Citation III - Alignée à droite */}
        <div>
          <p 
            className="font-playfair text-black italic mobile-hero-citations"
            style={{
              fontSize: 'clamp(10px, 2.5vw, 18.6px)', /* TAILLE CITATIONS ENCORE PLUS RÉDUITE MOBILE */
              lineHeight: '1.2', /* INTERLIGNE ENCORE PLUS RÉDUIT MOBILE */
              textAlign: 'right'
            }}
          >
            <span className="font-medium italic">III.</span> L'écriture d'histoires de vie sans mots,<br />
            à partager et à transmettre
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotographyDefinitions;