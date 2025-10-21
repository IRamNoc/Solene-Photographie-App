import React from 'react';

const PhotographyDefinitions: React.FC = () => {
  return (
    <div 
      className="flex-shrink-0 bg-white rounded-lg shadow-sm"
      style={{
        padding: 'clamp(16px, 4vw, 48px)' /* PADDING INTERNE BLOC BLANC RESPONSIVE - RÉDUIT MOBILE */
      }}
    >
      {/* TITRE PRINCIPAL */}
      <div style={{ marginBottom: 'clamp(1px, 0.5vw, 4px)' /* ESPACE RÉDUIT MOBILE */ }}>
        <h1 
          className="font-perandory font-normal text-black tracking-wide"
          style={{
            fontSize: 'clamp(28px, 7vw, 55px)', /* TAILLE TITRE RÉDUITE MOBILE - 28px au lieu de 36px */
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
        marginBottom: 'clamp(16px, 3vw, 32px)', /* ESPACE RÉDUIT MOBILE */
        display: 'flex',
        flexDirection: 'column',
        gap: '0px'
      }}>
        <p 
          className="font-playfair italic text-black"
          style={{
            fontSize: 'clamp(11px, 2.8vw, 13.1px)', /* TAILLE RÉDUITE MOBILE */
            lineHeight: '1.6', /* INTERLIGNE RÉDUIT MOBILE */
            margin: '0',
            textAlign: 'left'
          }}
        >
          Nom féminin
        </p>
        <p 
          className="font-playfair text-black"
          style={{
            fontSize: 'clamp(11px, 2.8vw, 13.1px)', /* TAILLE RÉDUITE MOBILE */
            lineHeight: '1.6', /* INTERLIGNE RÉDUIT MOBILE */
            margin: '0',
            textAlign: 'left'
          }}
        >
          <span className="font-playfair">Photo</span>, <span className="italic">φωτός</span> : lumière, clarté. « qui procède de la lumière »
        </p>
        <p 
          className="font-playfair text-black"
          style={{
            fontSize: 'clamp(11px, 2.8vw, 13.1px)', /* TAILLE RÉDUITE MOBILE */
            lineHeight: '1.6', /* INTERLIGNE RÉDUIT MOBILE */
            margin: '0',
            textAlign: 'left'
          }}
        >
          <span className="font-playfair">graphie</span>, <span className="italic">γραφειν</span> : peindre, dessiner, écrire « qui écrit », « qui aboutit à une image ».
        </p>
      </div>

      {/* CITATIONS NUMÉROTÉES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2.5vw, 16px)' /* GAP RÉDUIT MOBILE */ }}>
        {/* Citation I - Alignée à droite */}
        <div>
          <p 
            className="font-playfair text-black italic"
            style={{
              fontSize: 'clamp(14px, 3.5vw, 18.6px)', /* TAILLE CITATIONS RÉDUITE MOBILE - 14px au lieu de 18.6px */
              lineHeight: '1.3', /* INTERLIGNE RÉDUIT MOBILE */
              textAlign: 'right'
            }}
          >
            <span className="font-medium italic">I.</span> L'art de suspendre le temps, de figer un souvenir<br />
            dans l'éternité pour le chérir bien après qu'il ait disparu.
          </p>
        </div>
        
        {/* Citation II - Alignée à droite */}
        <div>
          <p 
            className="font-playfair text-black italic"
            style={{
              fontSize: 'clamp(14px, 3.5vw, 18.6px)', /* TAILLE CITATIONS RÉDUITE MOBILE */
              lineHeight: '1.3', /* INTERLIGNE RÉDUIT MOBILE */
              textAlign: 'right'
            }}
          >
            <span className="font-medium italic">II.</span> L'acte de traduire en image non pas seulement ce que l'on voit,<br />
            mais ce que l'on ressent : une émotion, une atmosphère, une lumière
          </p>
        </div>
        
        {/* Citation III - Alignée à droite */}
        <div>
          <p 
            className="font-playfair text-black italic"
            style={{
              fontSize: 'clamp(14px, 3.5vw, 18.6px)', /* TAILLE CITATIONS RÉDUITE MOBILE */
              lineHeight: '1.3', /* INTERLIGNE RÉDUIT MOBILE */
              textAlign: 'right'
            }}
          >
            <span className="font-medium italic">III.</span> L'écriture de petites et grandes histoires de vie,<br />
            sans l'usage des mots, à partager et à transmettre
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotographyDefinitions;