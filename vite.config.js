import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: '/fizza-interior/', // This is the critical line!
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '.ngrok-free.dev'
    ]
  }
})