import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 REEMPLAZA 'nombre-de-tu-repo' CON EL NOMBRE EXACTO QUE PUSISTE EN GITHUB
export default defineConfig({
  plugins: [react()],
  base: "/website-almendra/", 
})