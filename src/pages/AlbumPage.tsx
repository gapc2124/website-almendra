import React from 'react';
import '../styles/album.css';

// LISTA COMPLETA DE FOTOS (Rutas actualizadas a ./assets/img/)
const misFotos = [
  // --- PRE-2022 ---
  { url: "./assets/img/pre-2022-1.jpg", caption: "tan chiquitos y felices" },
  { url: "./assets/img/pre-2022-2.jpg", caption: "¿le gustaré a ella también?" },
  { url: "./assets/img/pre-2022-3.JPEG", caption: "Definitivamente le gusto" },
  { url: "./assets/img/pre-2022-4.JPG", caption: "matching" },
  { url: "./assets/img/pre-2022-5.JPG", caption: "Pedrito riete por favor" },
  { url: "./assets/img/pre-2022-6.JPG", caption: "gatitaaaa" },
  { url: "./assets/img/pre-2022-7.jpeg", caption: "adios mayorasgo  :(" },
  { url: "./assets/img/pre-2022-8.JPG", caption: "me está ganando?!!" },
  { url: "./assets/img/pre-2022-9.JPG", caption: "Ojalá no piense que soy raro" },

  // --- 2022 ---
  { url: "./assets/img/2022-1.JPG", caption: "its happening!!!" },
  { url: "./assets/img/2022-2.JPG", caption: "será el amor de mi vida" },
  { url: "./assets/img/2022-3.webp", caption: "es el amor de mi vida" },
  { url: "./assets/img/2022-4.JPG", caption: "el mejor viaje" },
  { url: "./assets/img/2022-5.JPG", caption: "noche inolvidable" },
  { url: "./assets/img/2022-6.JPG", caption: "felicidad" },
  { url: "./assets/img/2022-7.JPG", caption: "noche en riviera maya" },
  { url: "./assets/img/2022-8.jpg", caption: "casualmente hermosa" },
  { url: "./assets/img/100_0029.JPG", caption: "churro por dios" },
  { url: "./assets/img/100_0061.JPG", caption: "ocean + amy = my happy place" },
  { url: "./assets/img/100_0112.JPG", caption: "me encanta el paddle" },

  // --- 2023 ---
  { url: "./assets/img/2023-1.jpg", caption: "true friendship" },
  { url: "./assets/img/2023-2.jpg", caption: "asthetic" },
  { url: "./assets/img/2023-3.jpg", caption: "mi bella fotogenica" },
  { url: "./assets/img/2023-4.jpg", caption: "hermosa con sus flores" },
  { url: "./assets/img/2023-5.jpg", caption: "cerca a ser parte de tu familia" },
  { url: "./assets/img/2023-6.jpg", caption: "el real remember" },

  // --- 2024 ---
  { url: "./assets/img/2024-1.jpg", caption: "volvisteee!!! cleopatra" },
  { url: "./assets/img/2024-2.jpg", caption: "Morat + Amy = otro happy place" },
  { url: "./assets/img/2024-3.jpg", caption: "que feliz me haces" },
  { url: "./assets/img/2024-4.jpeg", caption: "amo como me miras" },
  { url: "./assets/img/2024-5.jpg", caption: "soy tu tuyo" },
  { url: "./assets/img/2024-6.jpg", caption: "asthetic x2" },
  { url: "./assets/img/2024-7.jpg", caption: "amo que uses mi ropa" },
  { url: "./assets/img/2024-8.jpg", caption: "amo que toques mi carita" },
  { url: "./assets/img/2024-9.JPG", caption: "Bésame ya!" },
  { url: "./assets/img/2024-10.jpg", caption: "Cómplices Always" },
  { url: "./assets/img/2024-11.JPG", caption: "Amor del bueno" },

  // --- 2025 ---
  { url: "./assets/img/2025-1.jpg", caption: "Floreees" },
  { url: "./assets/img/2025-2.jpg", caption: "amo el paddle dms" },
  { url: "./assets/img/2025-3.JPG", caption: "y amo besar tu carita" },
  { url: "./assets/img/2025-4.JPG", caption: "El mejor concierto de mi vida!" },
  { url: "./assets/img/2025-5.JPG", caption: "Contigo todo" },
  { url: "./assets/img/2025-6.JPG", caption: "contigo hasta el fin del mundo" },
  { url: "./assets/img/2025-7.JPG", caption: "contigo me emborracho de amor" },
  { url: "./assets/img/2025-8.JPG", caption: "Por más días así" },

  // --- 2026 ---
  { url: "./assets/img/2026-1.jpg", caption: "que se repita" },
  { url: "./assets/img/2026-2.jpg", caption: "gracias por estar en mis logros" },
  { url: "./assets/img/2026-3.JPG", caption: "primer amanecer 2026 juntos" },
  { url: "./assets/img/2026-4.JPG", caption: "Siempre tú, forever you" },
  { url: "./assets/img/2026-5.jpg", caption: "Mi persona favorita" },
  { url: "./assets/img/2026-6.jpg", caption: "Equipo imparable" },
  { url: "./assets/img/2026-7.jpg", caption: "guapos toda la vida" },
  { url: "./assets/img/2026-8.jpg", caption: "hasta el Infinito y más allá" },

  // --- OTROS ---
  { url: "./assets/img/otros1.jpeg", caption: "que recuerdos" },
  { url: "./assets/img/otros2.jpg", caption: "momento random" },
  { url: "./assets/img/otros3.jpeg", caption: "primer besito en el cachete" },
  { url: "./assets/img/otros4.jpg", caption: "hermoso día" },
  { url: "./assets/img/otros5.jpg", caption: "hermoso instante" },
  { url: "./assets/img/otros6.jpg", caption: "hermosos los dos" },
  { url: "./assets/img/otros7.png", caption: "dos guapos y matias" },
];

export const AlbumPage = () => {
  return (
    <div className="album-body">
      <div className="album-container">
        <h1 className="album-title">Nuestra Historia en Fotos 🎞️</h1>

        <div className="polaroid-grid">
          {misFotos.map((foto, index) => {
            // Rotación aleatoria fija por índice
            const rotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 2); 
            
            return (
              <div 
                key={index} 
                className="polaroid" 
                style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}
              >
                <div className="tape"></div>
                <img src={foto.url} alt={`Recuerdo ${index}`} loading="lazy" />
                <div className="polaroid-caption">{foto.caption}</div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};