import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  base: '/smartroom-remanejamento/', // <- COLE EXATAMENTE ESSA LINHA AQUI
})