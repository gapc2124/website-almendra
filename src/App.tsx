import { useState, useMemo } from 'react';
import { HangmanGate } from './components/Auth/HangmanGate';
import { MorningSection } from './components/Sections/MorningSection';
import { AfternoonSection } from './components/Sections/AfternoonSection';
import { NightSection } from './components/Sections/NightSection';
import './styles/scenes.css';
import './styles/hangman.css';

type Mode = 'morning' | 'afternoon' | 'night' | 'final';

function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('morning');
  
  // Estado para saber qué secciones ya marcó como vistas
  const [visited, setVisited] = useState({
    morning: false,
    afternoon: false,
    night: false
  });

  // Calculamos si ya terminó todo (Las 3 están true)
  const allCompleted = useMemo(() => {
    return visited.morning && visited.afternoon && visited.night;
  }, [visited]);

  // Función para marcar/desmarcar una sección
  const toggleVisited = (mode: 'morning' | 'afternoon' | 'night') => {
    setVisited(prev => ({ ...prev, [mode]: !prev[mode] }));
  };

  // --- 1. LOGIN ---
  if (!accessGranted) {
    return <HangmanGate onSuccess={() => setAccessGranted(true)} />;
  }

  // --- 2. PÁGINA FINAL (La sorpresa extra) ---
  if (currentMode === 'final') {
    return (
      <div className="main-container mode-final scene">
        <h1 style={{ color: 'white', fontSize: '3rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          🎉 ¡Felicidades, Amor! 🎉
        </h1>
        <p style={{ color: 'white', fontSize: '1.5rem', marginTop: '20px' }}>
          Has desbloqueado el nivel final.
        </p>
        <p style={{ color: 'white', marginTop: '10px' }}>
          (Aquí puedes poner tu regalo final, el código QR, o el link a tu repositorio real)
        </p>
        <button 
          onClick={() => setCurrentMode('morning')} 
          className="btn-mode" 
          style={{ marginTop: '30px', background: 'white', color: '#ff6b6b' }}
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  // --- 3. APP PRINCIPAL ---
  return (
    <main className={`main-container mode-${currentMode}`}>
      
      {/* RENDERIZADO DE ESCENAS CON LA PROPIEDAD DE CHECK */}
      {currentMode === 'morning' && (
        <>
          <MorningSection />
          {/* Botón de Check Flotante dentro de la escena */}
          <div className="mark-done-container">
            <button 
              className={`btn-check ${visited.morning ? 'completed' : ''}`}
              onClick={() => toggleVisited('morning')}
            >
              {visited.morning ? '¡Leído! ✅' : 'Marcar como Leído ⬜'}
            </button>
          </div>
        </>
      )}

      {currentMode === 'afternoon' && (
        <>
          <AfternoonSection />
          <div className="mark-done-container">
            <button 
              className={`btn-check ${visited.afternoon ? 'completed' : ''}`}
              onClick={() => toggleVisited('afternoon')}
            >
              {visited.afternoon ? '¡Visto! ✅' : 'Marcar como Visto ⬜'}
            </button>
          </div>
        </>
      )}

      {currentMode === 'night' && (
        <>
          <NightSection />
          <div className="mark-done-container">
            <button 
              className={`btn-check ${visited.night ? 'completed' : ''}`}
              onClick={() => toggleVisited('night')}
            >
              {visited.night ? '¡Visto! ✅' : 'Marcar como Visto ⬜'}
            </button>
          </div>
        </>
      )}


      {/* BOTÓN "SIGUIENTE PÁGINA" (Solo aparece si todo está completo) */}
      {allCompleted && (
        <div className="final-btn-container">
          <button className="btn-final" onClick={() => setCurrentMode('final')}>
            🎁 Abrir Regalo Final ➡
          </button>
        </div>
      )}


      {/* BARRA DE NAVEGACIÓN (ABAJO) */}
      <div className="mode-switcher">
        <button 
          onClick={() => setCurrentMode('morning')} 
          className={`btn-mode ${currentMode === 'morning' ? 'active' : ''}`}
        >
          ☀️ Mañana
          {visited.morning && <span className="check-indicator">✓</span>}
        </button>

        <button 
          onClick={() => setCurrentMode('afternoon')} 
          className={`btn-mode ${currentMode === 'afternoon' ? 'active' : ''}`}
        >
          🌅 Tarde
          {visited.afternoon && <span className="check-indicator">✓</span>}
        </button>

        <button 
          onClick={() => setCurrentMode('night')} 
          className={`btn-mode ${currentMode === 'night' ? 'active' : ''}`}
        >
          🌙 Noche
          {visited.night && <span className="check-indicator">✓</span>}
        </button>
      </div>

    </main>
  );
}

export default App;