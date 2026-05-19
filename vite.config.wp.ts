import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'wordpress-export',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index-wp.html',
      output: {
        entryFileNames: 'assets/nk-app.js',
        chunkFileNames: 'assets/nk-[name].js',
        assetFileNames: 'assets/nk-[name].[ext]',
      },
    },
  },
})
