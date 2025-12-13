import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Isso permite que ele seja acessível a partir de qualquer IP na sua rede
    port: 5173, // A porta padrão (pode ser outra, como 3000)
  },
})
