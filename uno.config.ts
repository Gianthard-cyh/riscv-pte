import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind4,
} from 'unocss'
// import { sv39BitRanges } from '~/composables/sv39'

export const sv39BitRanges = [
  { start: 0, end: 0, label: 'V（Valid）', class: 'bit-v bg-green-300 dark:bg-green-700 text-green-900 dark:text-green-300' },
  { start: 1, end: 1, label: 'R（Read）', class: 'bit-r bg-blue-300 dark:bg-blue-700 text-blue-900 dark:text-blue-300' },
  { start: 2, end: 2, label: 'W（Write）', class: 'bit-w bg-yellow-300 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-300' },
  { start: 3, end: 3, label: 'X（Execute）', class: 'bit-x bg-red-300 dark:bg-red-700 text-red-900 dark:text-red-300' },
  { start: 4, end: 4, label: 'U（User）', class: 'bit-u bg-purple-300 dark:bg-purple-700 text-purple-900 dark:text-purple-300' },
  { start: 5, end: 5, label: 'G（Global）', class: 'bit-g bg-pink-300 dark:bg-pink-700 text-pink-900 dark:text-pink-300' },
  { start: 6, end: 6, label: 'A（Accessed）', class: 'bit-a bg-indigo-300 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-300' },
  { start: 7, end: 7, label: 'D（Dirty）', class: 'bit-d bg-teal-300 dark:bg-teal-700 text-teal-900 dark:text-teal-300' },
  { start: 8, end: 9, label: 'Reserved', class: 'bit-reserved bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300' },
  { start: 10, end: 53, label: 'PPN（Physical Page Number）', class: 'bit-ppn bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' },
  { start: 54, end: 62, label: 'Reserved', class: 'bit-reserved bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300' },
  { start: 63, end: 63, label: 'PBMT（可选位）', class: 'bit-other bg-lime-300 dark:bg-lime-700 text-lime-900 dark:text-lime-300' },
]
const sv39Safelist = Array.from(
  new Set(
    sv39BitRanges
      .map(item => item.class)
      .flatMap(cls => cls.split(/\s+/))
      .filter(c => /^bg|text|border|dark:/.test(c)),
  ),
)

console.log('sv39Safelist', sv39Safelist)

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  safelist: [
    ...sv39Safelist,
  ],
})
