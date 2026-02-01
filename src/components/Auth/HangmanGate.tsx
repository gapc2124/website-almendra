import { useState, useMemo } from 'react';
import '../../styles/hangman.css'; // Asegúrate de importar el CSS nuevo

// Las opciones posibles
const WORDS = [
  "OPALITE",
  "FEBRERO",
  "ABEJITA",
  "CANELA RADIANTE",
  "TU NOVIO ES BIEN GUAPO"
];

interface HangmanGateProps {
  onSuccess: () => void;
}

export const HangmanGate = ({ onSuccess }: HangmanGateProps) => {
  // --- LÓGICA DE FONDO (HOJAS) ---
  // Generamos posiciones aleatorias para las hojas solo una vez
  const leaves = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Posición horizontal %
      delay: Math.random() * 10, // Retraso de animación
      duration: 5 + Math.random() * 10, // Duración de caída
      size: 10 + Math.random() * 15 // Tamaño variable
    }));
  }, []);

  // --- LÓGICA DEL JUEGO ---
  const [targetWord] = useState(() => 
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 6;
  const [gameOver, setGameOver] = useState(false);
  const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    setGuessedLetters(prev => [...prev, letter]);

    if (!targetWord.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= maxMistakes) {
        setGameOver(true);
        setTimeout(() => {
            alert("Acceso Denegado. 🔒");
            window.location.href = "about:blank"; 
        }, 500);
      }
    } else {
      const isWinner = targetWord.split('').every(char => 
        char === ' ' || guessedLetters.includes(char) || char === letter
      );
      if (isWinner) {
        setTimeout(onSuccess, 1000);
      }
    }
  };

  const renderWord = () => {
    return targetWord.split('').map((char, index) => {
      if (char === ' ') return <span key={index} className="space"> </span>;
      return (
        <span key={index} className="letter">
          {guessedLetters.includes(char) ? char : "_"}
        </span>
      );
    });
  };

  return (
    <div className="hangman-container">
      
      {/* 🍃 FONDO DE HOJAS CAYENDO 🍃 */}
      {leaves.map((leaf) => (
        <div 
          key={leaf.id} 
          className="leaf"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`
          }}
        />
      ))}

      <div className="hangman-box">
        <h1 className="title">🔐 Seguridad del Corazón</h1>
        <p className="subtitle">Completa la clave para entrar al bosque</p>

        {/* DIBUJO DEL AHORCADO (TU PANDA) */}
        <div className="drawing-area">
          <svg height="300" width="300" className="hangman-svg" viewBox="0 0 400 400">

  

  {/* ========================================================== */}

  {/* 🎋 CAPA 1 (FONDO): ESTRUCTURA DE BAMBÚ (Siempre visible) 🎋 */}

  {/* ========================================================== */}

  {/* 1. SUELO */}

  <path d="M0 380 Q 200 350 400 380 L 400 400 L 0 400 Z" fill="#8D6E63" />



  {/* 2. POSTE VERTICAL (Izquierda) */}

  {/* Tallo principal */}

  <rect x="40" y="50" width="25" height="330" rx="5" fill="#558B2F" stroke="#33691E" strokeWidth="2" />

  {/* Detalles/Nudos */}

  <rect x="40" y="150" width="25" height="4" fill="#33691E" />

  <rect x="40" y="250" width="25" height="4" fill="#33691E" />



  {/* 3. POSTE HORIZONTAL (Arriba) */}

  {/* Tallo superior */}

  <rect x="30" y="40" width="340" height="25" rx="5" fill="#558B2F" stroke="#33691E" strokeWidth="2" />

  {/* Detalles/Nudos */}

  <rect x="120" y="40" width="4" height="25" fill="#33691E" />

  <rect x="280" y="40" width="4" height="25" fill="#33691E" />



  {/* 4. HOJITAS DECORATIVAS */}

  <path d="M65 150 Q 90 130 70 110 Q 50 130 65 150" fill="#7CB342" stroke="#33691E" strokeWidth="1"/>

  <path d="M280 40 Q 300 20 320 40 Q 300 60 280 40" fill="#7CB342" stroke="#33691E" strokeWidth="1"/>



  {/* 5. CUERDA */}

  {/* Baja desde el bambú hasta la cabeza del panda */}

  <line x1="200" y1="65" x2="200" y2="100" stroke="#8D6E63" strokeWidth="6" strokeLinecap="round" />



  {/* ========================================================== */}

  {/* 🐼 CAPA 2 (FRENTE): EL PANDA PROGRESIVO 🐼 */}

  {/* (Este es el mismo código que aprobaste en el paso anterior) */}

  {/* ========================================================== */}



  {/* --- 1. CUERPO (Fallo 1) --- */}

  {mistakes >= 1 && (

    <g id="body" transform="translate(0, 20)">

      <ellipse cx="200" cy="230" rx="75" ry="85" fill="white" stroke="#212121" strokeWidth="4" />

      <path d="M140 180 Q 200 220 260 180 Q 250 150 200 150 Q 150 150 140 180" fill="#212121"/>

    </g>

  )}



  {/* --- 2. PATAS / BRAZOS (Fallo 2) --- */}

  {mistakes >= 2 && (

    <g id="arms" transform="translate(0, 20)">

      <ellipse cx="125" cy="210" rx="25" ry="40" fill="#212121" transform="rotate(30 125 210)" />

      <ellipse cx="275" cy="210" rx="25" ry="40" fill="#212121" transform="rotate(-30 275 210)" />

    </g>

  )}



  {/* --- 3. PIERNAS (Fallo 3) --- */}

  {mistakes >= 3 && (

    <g id="legs" transform="translate(0, 20)">

      <ellipse cx="160" cy="300" rx="24" ry="20" fill="#212121" />

      <ellipse cx="240" cy="300" rx="24" ry="20" fill="#212121" />

    </g>

  )}



  {/* --- 4. CABEZA (Fallo 4) --- */}

  {/* La parte superior de la cabeza (y=90) conecta visualmente con la cuerda (y=100) */}

  {mistakes >= 4 && (

    <g id="head">

      <circle cx="130" cy="100" r="30" fill="#212121" />

      <circle cx="270" cy="100" r="30" fill="#212121" />

      <rect x="110" y="90" width="180" height="135" rx="60" ry="60" fill="white" stroke="#212121" strokeWidth="4" />

    </g>

  )}



  {/* --- 5. CARITA (Fallo 5 y 6) --- */}

  {mistakes >= 5 && (

    <g id="face">

      <ellipse cx="165" cy="150" rx="18" ry="14" fill="#212121" transform="rotate(15 165 150)" />

      <ellipse cx="235" cy="150" rx="18" ry="14" fill="#212121" transform="rotate(-15 235 150)" />

      {mistakes < 6 ? (

        <g>

           <circle cx="168" cy="148" r="4" fill="white" />

           <circle cx="232" cy="148" r="4" fill="white" />

           <circle cx="164" cy="152" r="2" fill="white" opacity="0.7"/>

           <circle cx="236" cy="152" r="2" fill="white" opacity="0.7"/>

        </g>

      ) : (

        <g stroke="white" strokeWidth="3" strokeLinecap="round">

           <path d="M160 145 L170 155 M170 145 L160 155" />

           <path d="M230 145 L240 155 M240 145 L230 155" />

           <path d="M260 130 Q 270 140 260 150 Q 250 140 260 130" fill="#4FC3F7" stroke="none" />

        </g>

      )}

      <ellipse cx="200" cy="165" rx="7" ry="5" fill="#212121" />

      <path d="M 190 175 Q 195 180 200 175 Q 205 180 210 175" stroke="#212121" strokeWidth="2" fill="none" strokeLinecap="round" />

      <ellipse cx="140" cy="170" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />

      <ellipse cx="260" cy="170" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />

    </g>

  )}

</svg>
        </div>

        <div className="word-display">
          {renderWord()}
        </div>

        <div className="keyboard">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || gameOver}
              className={`key-btn ${guessedLetters.includes(letter) ? 'used' : ''}`}
            >
              {letter}
            </button>
          ))}
        </div>
        
        <div className="status">
            Intentos: {mistakes} / {maxMistakes}
        </div>
      </div>
    </div>
  );
};