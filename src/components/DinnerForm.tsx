import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import '../styles/gift-hub.css';

// Tipo de dato para las opciones con emoji
interface Option {
  label: string;
  emoji: string;
}

export const DinnerForm = () => {
  // --- ESTADOS ---
  const [step, setStep] = useState(0);
  const totalSteps = 6;
  const ticketRef = useRef<HTMLDivElement>(null);

  // Datos
  const [occasion, setOccasion] = useState('Cena');
  const [customOccasion, setCustomOccasion] = useState('');
  
  const [drinks, setDrinks] = useState<string[]>([]);
  const [drinkMods, setDrinkMods] = useState<string[]>([]);
  const [customDrink, setCustomDrink] = useState('');

  const [mains, setMains] = useState<string[]>([]);
  const [customMain, setCustomMain] = useState('');

  const [salad, setSalad] = useState('Ninguna');
  const [customSalad, setCustomSalad] = useState('');

  const [dessert, setDessert] = useState('Ninguno');
  const [customDessert, setCustomDessert] = useState('');

  // --- OPCIONES (Con Emojis) ---
  const occasionOpts: Option[] = [
    { label: 'Desayuno', emoji: '🥐' }, { label: 'Almuerzo', emoji: '☀️' }, { label: 'Cena', emoji: '🌙' }
  ];
  
  const drinkOpts: Option[] = [
    { label: 'Limonada Clásica', emoji: '🍋' }, { label: 'Limonada Fresa', emoji: '🍓' }, 
    { label: 'Limonada Arándanos', emoji: '🫐' }, { label: 'Agua', emoji: '💧' }, 
    { label: 'Vino', emoji: '🍷' }, { label: 'Jugo Lúcuma', emoji: '🧡' }, { label: 'Coca Cola', emoji: '🥤' }
  ];

  const mainOpts: Option[] = [
    { label: 'Puré de Papa', emoji: '🥔' }, { label: 'Alitas BBQ', emoji: '🍗' }, 
    { label: 'Chuleta Cerdo', emoji: '🥩' }, { label: 'Mac & Cheese', emoji: '🧀' }, 
    { label: 'Ceviche', emoji: '🐟' }, { label: 'Leche de Tigre', emoji: '🐯' }, 
    { label: 'Arroz c/ Pollo', emoji: '🥘' }, { label: 'Tallarines Alfredo', emoji: '🍝' },
    { label: 'Pechuga Pollo', emoji: '🍗' }, { label: 'Papa Sancochada', emoji: '🥔' },
    { label: 'Choclito', emoji: '🌽' }, { label: 'Arroz (Amy Style)', emoji: '🍚' },
    { label: 'Camote', emoji: '🍠' }, { label: 'Yuquita Frita', emoji: '🍟' }
  ];

  const saladOpts: Option[] = [
    { label: 'Cocida', emoji: '🥦' }, { label: 'Fresca', emoji: '🥗' }, { label: 'Ninguna', emoji: '❌' }
  ];
  
  const dessertOpts: Option[] = [
    { label: 'Dulce Limón', emoji: '🍋' }, { label: 'Helado Lúcuma', emoji: '🍦' }, 
    { label: 'Kekito', emoji: '🧁' }, { label: 'Un Besote', emoji: '💋' }, { label: 'Ninguno', emoji: '❌' }
  ];

  // --- LÓGICA ---
  const toggleDrink = (opt: string) => {
    if (drinks.includes(opt)) {
      setDrinks(prev => prev.filter(d => d !== opt));
      if (opt.includes('Limonada')) setDrinkMods([]);
    } else {
      if (drinks.length < 2) setDrinks(prev => [...prev, opt]);
    }
  };

  const toggleMain = (opt: string) => {
    setMains(prev => prev.includes(opt) ? prev.filter(m => m !== opt) : [...prev, opt]);
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 0));

  const handleDownloadImage = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current, { backgroundColor: '#fff', scale: 2 });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `Pedido_Amy_${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
      link.click();
    }
  };

  // --- RENDERIZADO DE CONTENIDO ---
  const renderContent = () => {
    switch(step) {
      case 0: return (
        <div className="rules-card form-slide">
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>👩‍🍳✨</div>
          <h2 className="step-title">¡Bienvenida a tu Cocina!</h2>
          <p className="step-subtitle">Antes de ordenar, lee esto mi amor:</p>
          
          <div className="rules-grid">
            <div className="rule-item">
              <h4>1. Cero Culpa 👑</h4>
              <p>Hoy mandas tú. Pide lo que se te antoje sin pensar.</p>
            </div>
            <div className="rule-item">
              <h4>2. Mix & Match 🍛</h4>
              <p>¿Puré con Ceviche? ¡Se vale! Tu creatividad manda.</p>
            </div>
            <div className="rule-item">
              <h4>3. Pide Deseos ✨</h4>
              <p>Si no ves algo, escríbelo en las casillas especiales.</p>
            </div>
            <div className="rule-item">
              <h4>4. Envíalo 📲</h4>
              <p>Al final, genera el ticket y mándamelo por WhatsApp.</p>
            </div>
          </div>
        </div>
      );

      case 1: return (
        <div className="form-slide">
          <h2 className="step-title">¿Qué ocasión es?</h2>
          <p className="step-subtitle">Elige el momento perfecto 🕰️</p>
          <div className="selection-grid">
            {occasionOpts.map(opt => (
              <div key={opt.label} onClick={() => setOccasion(opt.label)}
                className={`option-card ${occasion === opt.label ? 'active' : ''}`}>
                <div className="check-badge">✓</div>
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
              </div>
            ))}
          </div>
          <div className="modern-input-wrapper">
            <input type="text" className="modern-input" placeholder="¿Otra ocasión especial?" 
                   value={customOccasion} onChange={e => setCustomOccasion(e.target.value)} />
          </div>
        </div>
      );

      case 2: return (
        <div className="form-slide">
          <h2 className="step-title">Bebidas Refrescantes</h2>
          <p className="step-subtitle">Selecciona hasta 2 opciones 🍹</p>
          
          <div className="selection-grid">
            {drinkOpts.map(opt => (
              <div key={opt.label} onClick={() => toggleDrink(opt.label)}
                className={`option-card ${drinks.includes(opt.label) ? 'active' : ''}`}>
                <div className="check-badge">✓</div>
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
              </div>
            ))}
          </div>

          {drinks.some(d => d.includes('Limonada')) && (
            <div className="mods-container">
              <span style={{width:'100%', textAlign:'center', fontSize:'0.8rem', color:'#888', marginBottom:'5px'}}>Personaliza tu limonada:</span>
              {['Con Gas 🫧', 'Hojas de Menta 🍃'].map(mod => (
                <div key={mod} onClick={() => 
                  setDrinkMods(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod])
                } className={`mod-chip ${drinkMods.includes(mod) ? 'active' : ''}`}>
                  {mod}
                </div>
              ))}
            </div>
          )}
          
          <div className="modern-input-wrapper">
            <input type="text" className="modern-input" placeholder="¿Deseas otra bebida específica?" 
                   value={customDrink} onChange={e => setCustomDrink(e.target.value)} />
          </div>
        </div>
      );

      case 3: return (
        <div className="form-slide">
          <h2 className="step-title">Plato Fuerte</h2>
          <p className="step-subtitle">¡Arma tu combinación perfecta! Puedes elegir varios 🍽️</p>
          <div className="selection-grid">
            {mainOpts.map(opt => (
              <div key={opt.label} onClick={() => toggleMain(opt.label)}
                className={`option-card ${mains.includes(opt.label) ? 'active' : ''}`}>
                <div className="check-badge">✓</div>
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
              </div>
            ))}
          </div>
          <div className="modern-input-wrapper">
            <input type="text" className="modern-input" placeholder="¿Antojo de algo más? Escríbelo..." 
                   value={customMain} onChange={e => setCustomMain(e.target.value)} />
          </div>
        </div>
      );

      case 4: return (
        <div className="form-slide">
          <h2 className="step-title">Acompañamiento</h2>
          <p className="step-subtitle">Un toque fresco para balancear 🥗</p>
          <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {saladOpts.map(opt => (
              <div key={opt.label} onClick={() => setSalad(opt.label)}
                className={`option-card ${salad === opt.label ? 'active' : ''}`}>
                <div className="check-badge">✓</div>
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
              </div>
            ))}
          </div>
          <div className="modern-input-wrapper">
            <input type="text" className="modern-input" placeholder="Especifica verduras o escribe tu propia ensalada..." 
                   value={customSalad} onChange={e => setCustomSalad(e.target.value)} />
          </div>
        </div>
      );

      case 5: return (
        <div className="form-slide">
          <h2 className="step-title">El Final Dulce</h2>
          <p className="step-subtitle">Porque siempre hay espacio para el postre 🍰</p>
          <div className="selection-grid">
            {dessertOpts.map(opt => (
              <div key={opt.label} onClick={() => setDessert(opt.label)}
                className={`option-card ${dessert === opt.label ? 'active' : ''}`}>
                <div className="check-badge">✓</div>
                <span className="opt-emoji">{opt.emoji}</span>
                <span className="opt-label">{opt.label}</span>
              </div>
            ))}
          </div>
          <div className="modern-input-wrapper">
            <input type="text" className="modern-input" placeholder="¿Otro postre en mente?" 
                   value={customDessert} onChange={e => setCustomDessert(e.target.value)} />
          </div>
        </div>
      );

      case 6: return (
        <div className="form-slide" style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '5rem', marginBottom: '20px', animation: 'bounce 2s infinite' }}>🎉</div>
          <h2 className="step-title">¡Pedido Listo!</h2>
          <p className="step-subtitle" style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
            Todo se ve delicioso. <br/>
            Presiona el botón para generar tu ticket oficial.
          </p>
          <button className="btn-finish" onClick={handleDownloadImage}>
            <span>📸 Descargar & Enviar a Gabo</span>
          </button>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="dinner-wizard-wrapper">
      {/* BARRA DE PROGRESO */}
      <div className="progress-track">
        <div className="progress-indicator" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
      </div>

      {/* CONTENIDO ANIMADO (Usamos key=step para reiniciar animaciones) */}
      <div key={step} style={{ padding: '10px' }}>
        {renderContent()}
      </div>

      {/* NAVEGACIÓN */}
      <div className="wizard-footer">
        {step > 0 ? (
          <button className="btn-nav btn-prev" onClick={handlePrev}>⬅ Atrás</button>
        ) : <div></div>}
        
        {step < totalSteps && (
          <button className="btn-nav btn-next" onClick={handleNext}>
            {step === 0 ? '¡Comenzar! 🚀' : 'Siguiente ➡'}
          </button>
        )}
      </div>

      {/* TICKET OCULTO */}
      <div className="ticket-preview-container">
        <div ref={ticketRef} className="ticket-paper">
          <div className="ticket-header">
            <h2>Comanda del Amor ❤️</h2>
            <p>Chef: Gabo | VIP: Amy</p>
            <hr />
          </div>
          <div className="ticket-body">
            <p><strong>Turno:</strong> {customOccasion || occasion}</p>
            <p><strong>Bebidas:</strong></p>
            <ul>
                {drinks.map(d => <li key={d}>{d}</li>)}
                {customDrink && <li>Extra: {customDrink}</li>}
                {drinks.length === 0 && !customDrink && <li>-</li>}
            </ul>
            {drinkMods.length > 0 && <p className="mods">({drinkMods.join(', ')})</p>}
            <p><strong>Plato Fuerte:</strong></p>
            <ul>
              {mains.map(m => <li key={m}>{m}</li>)}
              {customMain && <li>Extra: {customMain}</li>}
              {mains.length === 0 && !customMain && <li>Sorpréndeme</li>}
            </ul>
            <p><strong>Ensalada:</strong> {salad}</p>
            {customSalad && <p className="mods">Nota: {customSalad}</p>}
            <p><strong>Postre:</strong> {dessert}</p>
            {customDessert && <p className="mods">Nota: {customDessert}</p>}
          </div>
          <div className="ticket-footer">
            <hr />
            <p>Cocinando con amor 👨‍🍳🔥</p>
            <p className="date">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};