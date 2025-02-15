import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { svgsprites } from './vite_plugins/svgsprites'


// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  define: {
    isDev: command === 'serve',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  plugins: [
    react(),
    UnoCSS(),
    svgsprites({ noOptimizeList: ['lu-big', 'lu-big2', 'lu-big-3', 'gua', 'lu', 'tian'] }),
  ],
}))
