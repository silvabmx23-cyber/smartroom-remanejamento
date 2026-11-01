import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // ou @vitejs/plugin-react

export default defineConfig({
  plugins: [react()],
  base: '/smartroom-remanejamento/', // <-- ADICIONE ESSA LINHA COM O NOME DO SEU REPOSITÓRIO
})
