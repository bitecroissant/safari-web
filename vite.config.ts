import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  define: {
    isDev: command === 'serve',
  },
  plugins: [
    react(),
    UnoCSS(),
  ],
}))
