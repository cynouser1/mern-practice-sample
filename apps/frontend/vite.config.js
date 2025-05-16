import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import tailwindcss from 'tailwindcss'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ],
  server:{
    port: 4000,
    // host: true,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:4001',
      //   // changeOrigin: true,
      //   // secure: false,
      //   // rewrite: (path) => path.replace(/^\/api/, '')
      // }
      '/api': 'http://localhost:4001',
    }
  }
})
