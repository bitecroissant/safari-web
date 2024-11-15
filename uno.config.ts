import {
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, transformerAttributifyJsx,
  } from 'unocss'
  
  export default defineConfig({
    theme: {},
    shortcuts: {
      'g-btn': 'h-48px w-100% b-none text-white bg-#041616 rounded-8px text-18px cursor-pointer',
      'g-input-text': 'h-48px px-16px leading-32px py-8px b-#041616 b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
      'g-form': 'px-16px flex flex-col gap-y-8px children-flex children-flex-col',
      'g-form-label': 'text-18px mb-8px',
    },
    safelist: [
    ],
    rules: [
      ['h-vhcheck', { height: 'calc(100vh - var(--vh-offset, 0px))' }],
    ],
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
      }),
      presetTypography(),
    ],
    transformers: [
      transformerAttributifyJsx(),
    ],
  })
  