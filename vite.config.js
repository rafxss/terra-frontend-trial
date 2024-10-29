import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser', // Indica a Vite que use Terser
    terserOptions: {
      compress: {
        drop_console: true, // Opcional: elimina los console.log en producción
      },
      format: {
        comments: false, // Elimina los comentarios
      },
    }
  }
})
