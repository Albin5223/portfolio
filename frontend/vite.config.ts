import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Vite écoute sur toutes les interfaces réseau
    watch: {
      usePolling: true, // Vite scanne régulièrement les fichiers pour détecter les changements
    },
  },
})
