export interface PteInfo {
  ppn: bigint
  pa: bigint
  d: boolean
  a: boolean
  g: boolean
  u: boolean
  x: boolean
  w: boolean
  r: boolean
  v: boolean
  leaf: boolean
  binaryStr: string
}

export interface BitRange {
  start: number
  end: number
  label: string
  class: string
}

export const sv39BitRanges: BitRange[] = [
  { start: 0, end: 0, label: 'V (Valid)', class: 'bit-v bg-green-300 dark:bg-green-700 text-green-900 dark:text-green-300' },
  { start: 1, end: 1, label: 'R (Read)', class: 'bit-r bg-blue-300 dark:bg-blue-700 text-blue-900 dark:text-blue-300' },
  { start: 2, end: 2, label: 'W (Write)', class: 'bit-w bg-yellow-300 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-300' },
  { start: 3, end: 3, label: 'X (Execute)', class: 'bit-x bg-red-300 dark:bg-red-700 text-red-900 dark:text-red-300' },
  { start: 4, end: 4, label: 'U (User)', class: 'bit-u bg-purple-300 dark:bg-purple-700 text-purple-900 dark:text-purple-300' },
  { start: 5, end: 5, label: 'G (Global)', class: 'bit-g bg-pink-300 dark:bg-pink-700 text-pink-900 dark:text-pink-300' },
  { start: 6, end: 6, label: 'A (Accessed)', class: 'bit-a bg-indigo-300 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-300' },
  { start: 7, end: 7, label: 'D (Dirty)', class: 'bit-d bg-teal-300 dark:bg-teal-700 text-teal-900 dark:text-teal-300' },
  { start: 8, end: 9, label: 'Reserved', class: 'bit-reserved bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300' },
  { start: 10, end: 53, label: 'PPN (Physical Page Number)', class: 'bit-ppn bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200' },
  { start: 54, end: 62, label: 'Reserved', class: 'bit-reserved bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300' },
  { start: 63, end: 63, label: 'PBMT (Optional)', class: 'bit-other bg-lime-300 dark:bg-lime-700 text-lime-900 dark:text-lime-300' },
]

export function getBitInfo(idx: number): BitRange | undefined {
  return sv39BitRanges.find(bit => bit.start <= idx && bit.end >= idx)
}

export function getPteInfo(pte: bigint): PteInfo {
  const v = Boolean(pte & (1n << 0n))
  const r = Boolean(pte & (1n << 1n))
  const w = Boolean(pte & (1n << 2n))
  const x = Boolean(pte & (1n << 3n))
  const u = Boolean(pte & (1n << 4n))
  const g = Boolean(pte & (1n << 5n))
  const a = Boolean(pte & (1n << 6n))
  const d = Boolean(pte & (1n << 7n))

  const ppn = (pte >> 10n)
  const pa = (ppn << 12n)

  // 如果 r / x 有一个是 true，就说明是叶子页
  const leaf = r || x

  return {
    v,
    r,
    w,
    x,
    u,
    g,
    a,
    d,
    ppn,
    pa,
    leaf,
    binaryStr: pte.toString(2).padStart(64, '0'),
  }
}

export function usePteInfo(pte: MaybeRef<bigint>) {
  const pteInfo = computed<PteInfo>(() => {
    const val = unref(pte)
    const pteBig = typeof val === 'bigint' ? val : BigInt(val)

    return getPteInfo(pteBig)
  })

  return pteInfo
}
