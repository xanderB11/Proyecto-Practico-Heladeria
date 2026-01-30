import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                pedidos: resolve(__dirname, 'src/pages/pedidos.html'),
                carrito: resolve(__dirname, 'src/pages/carrito.html'),
                contacto: resolve(__dirname, 'src/pages/contacto.html'),
                nosotros: resolve(__dirname, 'src/pages/nosotros.html'),
                historia: resolve(__dirname, 'src/pages/historia.html'),
            }
        }
    }
})