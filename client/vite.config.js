import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/movies": "http://localhost:3000",
      "/users": "http://localhost:3000",
      "/reservations": "http://localhost:3000",
      "/theater": "http://localhost:3000",
      "/showtimes": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    }
  }
})
