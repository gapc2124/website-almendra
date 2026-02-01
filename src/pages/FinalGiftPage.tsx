import { useState } from 'react';
import '../styles/gift-hub.css'; 
import { CrystalHeart } from '../components/CrystalHeart'; // Importamos el componente 3D

// 👇 PEGA AQUÍ TU LINK DE DRIVE DEL VIDEO
const GOOGLE_DRIVE_VIDEO_URL = "https://drive.google.com/file/d/1FzQQF6fvwzAA3xEuBpST_L6q1ipMYzrH/view?usp=sharing";

// Ya no necesitamos 'video' en el estado porque es un link externo
type GiftSection = 'menu' | 'gift';

export const FinalGiftPage = () => {
  const [view, setView] = useState<GiftSection>('menu');

  // --- 1. MENÚ PRINCIPAL ---
  if (view === 'menu') {
    return (
      <div className="gift-hub-container">
        <h1 className="hub-title">Para ti, mi amor 💖</h1>
        
        <div className="gift-grid">
          
          {/* Opción 1: Cena */}
          <div 
            className="gift-card" 
            // 👇 AGREGA EL #: '#/dinner'
            onClick={() => window.open('#/dinner', '_blank')} 
          >
            <span className="card-icon">🍽️</span>
            <h3 className="card-title">Cena Especial</h3>
            <p className="card-desc">Un plan delicioso para nosotros.</p>
          </div>

          {/* Opción 2: Album */}
          <div 
            className="gift-card" 
            // 👇 AGREGA EL #: '#/album'
            onClick={() => window.open('#/album', '_blank')}
          >
            <span className="card-icon">📸</span>
            <h3 className="card-title">Álbum de Fotos</h3>
            <p className="card-desc">Nuestros mejores momentos.</p>
          </div>

          {/* Opción 3: Video (AHORA ABRE LINK DE DRIVE) */}
          <div 
            className="gift-card" 
            onClick={() => window.open(GOOGLE_DRIVE_VIDEO_URL, '_blank')}
          >
            <span className="card-icon">🎥</span>
            <h3 className="card-title">Video</h3>
            <p className="card-desc">Un mensaje especial.</p>
          </div>

          {/* Opción 4: Regalo Cristal (INTERNO) */}
          <div className="gift-card" onClick={() => setView('gift')}>
            <span className="card-icon">💎</span>
            <h3 className="card-title">Algo para ti</h3>
            <p className="card-desc">Una sorpresa eterna.</p>
          </div>

        </div>
      </div>
    );
  }

  // --- 2. VISTA "ALGO PARA TI" (CRISTAL 3D) ---
  if (view === 'gift') {
    return (
      <div className="crystal-mode-container">
        {/* El componente 3D va al fondo */}
        <CrystalHeart />
        
        {/* Capa de texto y botones encima */}
        <div className="crystal-overlay-content">
          <button className="btn-back" onClick={() => setView('menu')}>⬅ Volver al Menú</button>
          
          <h2 className="inner-title" style={{ fontSize: '3.5rem', color: '#aaddff' }}>Para ti, mi joya 💎</h2>
          <p>
            Este corazón de cristal es como tu corazoncito de opalita
          </p>
        </div>
      </div>
    );
  }

  return null;
};