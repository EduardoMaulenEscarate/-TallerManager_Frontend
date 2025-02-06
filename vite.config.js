import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite que el contenedor acepte conexiones externas
    port: 5173,
    watch: {
      usePolling: true, // Requerido para algunos sistemas de archivos montados
    },
  },
})
