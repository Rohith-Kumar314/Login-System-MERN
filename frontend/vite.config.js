import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['login-system-mern-1-o7ju.onrender.com', 'localhost', '0.0.0.0'],
    // You can also specify the host as 'all' to allow any host (but be cautious with this)
    // allowedHosts: 'all',
  },
})
