import { useState, useMemo } from 'react';

export const MorningSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- GENERADOR DE NUBES/PARTÍCULAS ---
  // Creamos 15 nubes con tamaños, posiciones y velocidades aleatorias
  const clouds = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // Entre 20px y 80px
      top: Math.random() * 70 + '%', // Posición vertical
      duration: Math.random() * 20 + 30 + 's', // Duración lenta (30s a 50s)
      delay: Math.random() * -30 + 's' // Empiezan en distintos momentos
    }));
  }, []);
  // ------------------------------------

  return (
    <section className="scene" id="scene-morning">
      
      {/* RENDERIZAMOS LAS PARTÍCULAS BLANCAS EN EL FONDO */}
      {clouds.map(cloud => (
        <div 
          key={cloud.id}
          className="cloud-particle"
          style={{
            width: cloud.size,
            height: cloud.size,
            top: cloud.top,
            animationDuration: cloud.duration,
            animationDelay: cloud.delay
          }}
        />
      ))}

      <div className="letter-container">
        <div 
          className={`envelope ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flap"></div>
          <div className="body"></div>
          
          {/* La carta ahora es lisa y con texto grande */}
          <div className="romantic-letter">
            <h1 style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>¡Buenos días, mi amor! ☀️</h1>
            
            <p>Que orgulloso estoy de lo que estamos construyendo y que afortunado me siento por tenerte un día más a mi lado.</p>
            <p>Reconozco que aunque hay dificultades nuestro valor para salir de ellas y mejorar día a día como equipo nos hace más unidos y fuertes.</p>
            <p>Después de tanto tiempo escribiendo nuevas páginas en nuestra historia puedo estar seguro que cada año que pasa te amo más.</p>
            <p>Una cualidad tan esencial de la vida que es la "felicidad", contigo la aprendí y he visto que es algo que se crea y se cultiva paso a paso, y esta puede florecer de una manera hermosa.</p>
            <p>Mi día más oscuro está lleno de celeste opalina y mi día más luminoso es el que te tiene a ti en él.</p>
            <p>Si fuera a despertar contigo mañana me levantaría con las mejores motivaciones, y si no fuera así trabajaría todo lo necesario para asegurarme de un día hacerlo.</p>
            <p>Tu nombre me trae esperanza, significa mi lugar seguro, se siente como un cielo opalina, y se traduce en amor verdadero. Es la felicidad construida, es mi hogar.</p>

            <p><strong>Te amo infinitamente, Amy.</strong><br/>Gracias por ser mi compañera de aventuras, mi abejita y el amor de mi vida.</p>
            <p>Con todo mi amor,<br/>Gabo ❤️</p>
          </div>
        </div>
      </div>
    </section>
  );
};