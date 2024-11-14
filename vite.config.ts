import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  define: {
    isDev: command === 'serve',
  },
  plugins: [react()],
}))
