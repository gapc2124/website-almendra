import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MorningSection } from '../components/Sections/MorningSection';
import { AfternoonSection } from '../components/Sections/AfternoonSection';
import { NightSection } from '../components/Sections/NightSection';
import '../styles/scenes.css';

type Mode = 'morning' | 'afternoon' | 'night';

export const SurprisePage = () => {
  const navigate = useNavigate();
  
  const [currentMode, setCurrentMode] = useState<Mode>('morning');
  const [visited, setVisited] = useState({ morning: false, afternoon: false, night: false });
  
  // Estados para la UI oculta
  const [uiHidden, setUiHidden] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Verificar si completó todo
  const allCompleted = useMemo(() => visited.morning && visited.afternoon && visited.night, [visited]);

  const toggleVisited = (mode: 'morning' | 'afternoon' | 'night') => {
    setVisited(prev => ({ ...prev, [mode]: !prev[mode] }));
  };

  // Manejar la tecla ENTER para restaurar UI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (uiHidden && e.key === 'Enter') {
        setUiHidden(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [uiHidden]);

  // Función para ocultar UI
  const handleHideUI = () => {
    setUiHidden(true);
    setShowToast(true);
    // El toast desaparece visualmente por CSS después de 4s
    setTimeout(() => setShowToast(false), 4000); 
  };

  return (
    // Agregamos la clase 'ui-hidden' al contenedor principal si el estado es true
    <main className={`main-container mode-${currentMode} ${uiHidden ? 'ui-hidden' : ''}`}>
      
      {/* --- SECCIÓN MAÑANA --- */}
      {currentMode === 'morning' && (
        <>
          <MorningSection />
          <div className="mark-done-container">
            <button className={`btn-check ${visited.morning ? 'completed' : ''}`} onClick={() => toggleVisited('morning')}>
              {visited.morning ? '¡Leído! ✅' : 'Marcar como Leído ⬜'}
            </button>
          </div>
        </>
      )}

      {/* --- SECCIÓN TARDE (Con funcionalidad de ocultar UI) --- */}
      {currentMode === 'afternoon' && (
        <>
          <AfternoonSection />
          
          {/* Botón para Ocultar UI */}
          <button className="btn-hide-ui" onClick={handleHideUI}>
            👁️ Ocultar UI
          </button>

          {/* Botón de Marcar Visto */}
          <div className="mark-done-container">
            <button className={`btn-check ${visited.afternoon ? 'completed' : ''}`} onClick={() => toggleVisited('afternoon')}>
              {visited.afternoon ? '¡Visto! ✅' : 'Marcar como Visto ⬜'}
            </button>
          </div>

          {/* Mensaje Toast (Solo aparece si se activa el toast) */}
          {showToast && (
            <div className="ui-toast">
              Presiona <strong>Enter</strong> para mostrar el UI
            </div>
          )}
        </>
      )}

      {/* --- SECCIÓN NOCHE --- */}
      {currentMode === 'night' && (
        <>
          <NightSection />
          <div className="mark-done-container">
            <button className={`btn-check ${visited.night ? 'completed' : ''}`} onClick={() => toggleVisited('night')}>
              {visited.night ? '¡Visto! ✅' : 'Marcar como Visto ⬜'}
            </button>
          </div>
        </>
      )}

      {/* BOTÓN FINAL (Redirige a la nueva página) */}
      {allCompleted && !uiHidden && (
        <div className="final-btn-container">
          <button 
            className="btn-final" 
            onClick={() => navigate('/te-amo-infinito')}
          > 
            Continua por acá bebé ➡
          </button>
        </div>
      )}

      {/* BARRA DE NAVEGACIÓN */}
      <div className="mode-switcher">
        <button onClick={() => setCurrentMode('morning')} className={`btn-mode ${currentMode === 'morning' ? 'active' : ''}`}>
          ☀️ Mañana {visited.morning && <span className="check-indicator">✓</span>}
        </button>
        <button onClick={() => setCurrentMode('afternoon')} className={`btn-mode ${currentMode === 'afternoon' ? 'active' : ''}`}>
          🌅 Tarde {visited.afternoon && <span className="check-indicator">✓</span>}
        </button>
        <button onClick={() => setCurrentMode('night')} className={`btn-mode ${currentMode === 'night' ? 'active' : ''}`}>
          🌙 Noche {visited.night && <span className="check-indicator">✓</span>}
        </button>
      </div>
    </main>
  );
};