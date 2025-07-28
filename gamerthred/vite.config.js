import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 👇 This makes client-side routes like /login work
    historyApiFallback: true,
  },
  build:{
    outDir: 'dist',
  }
})