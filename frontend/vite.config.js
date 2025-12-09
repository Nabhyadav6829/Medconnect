
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      ".trycloudflare.com",
      "192.168.137.32"     // your laptop IP
    ],
    proxy: {
      '/api': {
        target: 'http://192.168.137.32:5001',
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'http://192.168.137.32:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
