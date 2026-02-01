import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const Flower = (props: any) => {
  const flowerRef = useRef<Mesh>(null);

  // Animación: Hacemos que la flor gire suavemente
  useFrame((state, delta) => {
    if (flowerRef.current) {
      flowerRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group {...props}>
      {/* Tallo */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Centro de la flor */}
      <mesh position={[0, 0, 0]} ref={flowerRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffcc00" />
      </mesh>

      {/* Pétalos (Un truco rápido usando varios torus o esferas) */}
      {[0, 1.5, 3, 4.5].map((rot, i) => (
        <mesh key={i} rotation={[0, 0, rot]} position={[0, 0, 0]}>
           <torusGeometry args={[0.5, 0.1, 16, 30]} />
           <meshStandardMaterial color="hotpink" />
        </mesh>
      ))}
    </group>
  );
};