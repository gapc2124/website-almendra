import { Sky, Stars } from '@react-three/drei';

export const Sunset = () => {
  return (
    <>
      {/* El sol en posición de atardecer.
         mieCoefficient: controla la bruma.
         rayleigh: controla el color del cielo (dispersión).
         inclination: qué tan bajo está el sol (0 = amanecer, 0.5 = mediodía).
         azimuth: rotación alrededor del horizonte.
      */}
      <Sky 
        distance={450000} 
        sunPosition={[0, 1, -10]} // Posición X, Y, Z (Y bajo = atardecer)
        inclination={0} 
        azimuth={0.25} 
      />
      
      {/* Agregamos estrellas que aparecerán si bajas más el sol */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Luz ambiental cálida para simular el tono naranja del atardecer */}
      <ambientLight intensity={0.5} color="#ff9966" />
    </>
  );
};