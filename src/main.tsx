import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Importamos todas las páginas que hemos creado
import { LoginPage } from './pages/LoginPage'
import { SurprisePage } from './pages/SurprisePage'
import { FinalGiftPage } from './pages/FinalGiftPage'
import { AlbumPage } from './pages/AlbumPage'
import { DinnerPage } from './pages/DinnerPage'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/website-almendra">
      <Routes>
        {/* Ruta de Inicio (Login) */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Ruta del Recorrido (Mañana/Tarde/Noche) */}
        <Route path="/sorpresa" element={<SurprisePage />} />
        
        {/* Ruta Final (El Hub/Menú principal) */}
        <Route path="/te-amo-infinito" element={<FinalGiftPage />} />
        
        {/* Rutas Externas (Se abren en nuevas pestañas) */}
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/dinner" element={<DinnerPage />} />
        
        {/* Si escriben cualquier otra cosa, los manda al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)