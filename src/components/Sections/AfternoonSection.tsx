export const AfternoonSection = () => {
  return (
    <section id="scene-afternoon">
      {/* 1. EL SOL RADIANTE */}
      <div className="sun-container">
        <div className="sun"></div>
      </div>

      {/* 2. TEXTO ROMÁNTICO */}
      <div className="afternoon-hero-text">
        <h1>
          Eres mi sol, mi rojo atardecer,<br />
          Y ES POR TI QUE LATE MI CORAZÓN
        </h1>
      </div>

      {/* 3. GAVIOTAS VOLANDO */}
      <div className="bird bird--1"></div>
      <div className="bird bird--2"></div>

      {/* 4. EL OCÉANO (Olas giratorias) */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </section>
  );
};