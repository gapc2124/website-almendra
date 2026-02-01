import React from 'react'
import ReactDOM from 'react-dom/client'
// 👇 CAMBIO 1: Importamos HashRouter en lugar de BrowserRouter
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import { SurprisePage } from './pages/SurprisePage'
import { FinalGiftPage } from './pages/FinalGiftPage'
import { AlbumPage } from './pages/AlbumPage'
import { DinnerPage } from './pages/DinnerPage'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 👇 CAMBIO 2: Usamos HashRouter y QUITAMOS el basename */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sorpresa" element={<SurprisePage />} />
        <Route path="/te-amo-infinito" element={<FinalGiftPage />} />
        
        {/* Rutas Externas */}
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/dinner" element={<DinnerPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)