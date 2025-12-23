import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Info_minera/',
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