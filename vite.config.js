import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // This will enable the local IP to be accessible
    port: 3000, // You can specify any port
  },
  plugins: [react()],
})
