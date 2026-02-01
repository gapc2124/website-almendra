import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Asegúrate de mantener el .js si lo necesitaste antes, si no, quítalo.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const CrystalHeart = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. ESCENA Y CÁMARA ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02020a);
    scene.fog = new THREE.FogExp2(0x02020a, 0.003);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    // --- 2. CONTROLES ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = false;

    // --- 3. ILUMINACIÓN ---
    const ambientLight = new THREE.AmbientLight(0x222244, 1);
    scene.add(ambientLight);

    const mainLight = new THREE.SpotLight(0xffeadd, 500);
    mainLight.position.set(15, 30, 20);
    mainLight.angle = 0.5;
    mainLight.penumbra = 1;
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0x0088ff, 200);
    rimLight.position.set(-20, -10, -20);
    scene.add(rimLight);

    // --- 4. GEOMETRÍA DEL CORAZÓN (AJUSTADA: Menos gordita) ---
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    // 🔥 CAMBIOS AQUÍ: Valores reducidos para un corazón más delgado
    const extrudeSettings = {
      steps: 2,
      depth: 2.5, // Mucho más delgado (antes 8)
      bevelEnabled: true,
      bevelThickness: 1.5, // Bisel menos profundo (antes 4)
      bevelSize: 1.5, // Bisel menos ancho (antes 3)
      bevelOffset: 0,
      bevelSegments: 8 // Suavidad adecuada para este tamaño
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // --- 5. MATERIAL OPALITA LECHOSA ---
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xddeeff,
      emissive: 0x223355,
      emissiveIntensity: 0.2,
      metalness: 0.0,
      roughness: 0.15, // Un poco más liso ahora que es delgado
      transmission: 0.7, // Un poco más transparente al ser más fino
      
      // Ajustamos el grosor óptico para que coincida con la nueva geometría
      thickness: 4.0, // Antes 15.0

      ior: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      iridescence: 1.0,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 500],
      side: THREE.DoubleSide,
    });

    const heartMesh = new THREE.Mesh(geometry, crystalMaterial);
    heartMesh.castShadow = true;
    heartMesh.receiveShadow = true;
    heartMesh.rotation.x = Math.PI; // Mantenemos la rotación para que esté al derecho
    heartMesh.scale.set(0.5, 0.5, 0.5);
    scene.add(heartMesh);

    // --- 6. FONDO ESTRELLADO ---
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const posArray = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 300; 
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.15, color: 0xaabbff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending
    });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // --- 7. ANIMACIÓN ---
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      // Flotación suave
      heartMesh.position.y = Math.sin(time * 0.7) * 0.5; 
      heartMesh.rotation.z = Math.sin(time * 0.5) * 0.03;
      starsMesh.rotation.y -= 0.0002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- 8. RESIZE ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mainLight.shadow.map?.dispose();
      mainLight.shadow.map = null;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      crystalMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'fixed', top:0, left:0, zIndex: 0, background: '#02020a' }} />;
};