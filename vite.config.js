import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Allow Vercel preview host
    host: true,
    allowedHosts: ['sb-161lc6yewh4j.vercel.run'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
