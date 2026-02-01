import React from 'react';
import { DinnerForm } from '../components/DinnerForm';
import '../styles/gift-hub.css'; // Reusamos el estilo bonito del Hub

export const DinnerPage = () => {
  return (
    <div className="gift-hub-container">
      {/* Reusamos el contenedor "section-content" pero centrado */}
      <div className="section-content" style={{ height: 'auto', minHeight: '90vh', display: 'block' }}>
        
        <h2 className="inner-title">Diseña tu Cena Perfecta 🍽️</h2>
        
        <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.1rem' }}>
          Selecciona lo que se te antoje hoy, mi amor. Cuando termines, 
          presiona el botón verde y mándame la foto por WhatsApp.
        </p>
        
        {/* Aquí va el formulario */}
        <DinnerForm />
        
      </div>
    </div>
  );
};