import { Html } from '@react-three/drei';

interface LetterProps {
  isOpen: boolean;
}

export const Letter = ({ isOpen }: LetterProps) => {
  return (
    <group position={[0, 1, 0]}> {/* Posición en el mundo 3D */}
      
      {/* El componente Html renderiza divs normales dentro del Canvas */}
      <Html 
        transform // Esto hace que el HTML gire y se mueva con la cámara 3D
        occlude   // Se esconderá si un objeto 3D pasa por delante
        distanceFactor={1.5} // Escala
        position={[0, 0, 0]}
      >
        <div className="carta-container">
          {/* Aquí va la estructura HTML de tu carta antigua */}
          <div className="sobre">
             <div className="contenido-carta">
                <h1>Para mi Almendrita ❤️</h1>
                <p>
                  Cada día a tu lado es un regalo...
                  {/* Pega aquí tu texto romántico */}
                </p>
             </div>
          </div>
        </div>
      </Html>
      
    </group>
  );
};