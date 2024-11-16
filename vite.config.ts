import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  define: {
    isDev: command === 'serve',
  },
  plugins: [
    react(),
    UnoCSS(),
    svgsprites({ noOptimizeList: ['lu-big', 'lu-big2', 'gua', 'lu'] }),
  ],
}))
