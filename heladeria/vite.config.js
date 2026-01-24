import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                contacto: resolve(__dirname, 'src/pages/contacto.html'),
                nosotros: resolve(__dirname, 'src/pages/nosotros.html'),
                historia: resolve(__dirname, 'src/pages/historia.html'),
            }
        }
    }
})