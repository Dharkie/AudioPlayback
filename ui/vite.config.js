import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api': 'http://localhost:5001/'
    }
  }
})
//configuring vite, if you see anything from the API App, crate a proxy 
