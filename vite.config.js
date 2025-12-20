import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        proxy: {
            '/api/georef': {
                target: 'https://infra.datos.gob.ar',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/georef/, '/georef-dev')
            }
        }
    }
})