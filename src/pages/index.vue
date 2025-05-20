<script setup lang="ts" generic="T extends any, O extends any">
import { getBitInfo, getPteInfo } from '~/composables/sv39'

defineOptions({
  name: 'IndexPage',
})

const flags: Array<{
  key: keyof PteInfo
  label: string
}> = [
  { key: 'v', label: 'Valid' },
  { key: 'r', label: 'Readable' },
  { key: 'w', label: 'Writable' },
  { key: 'x', label: 'Executable' },
  { key: 'u', label: 'User Can Access' },
  { key: 'a', label: 'Accessed' },
  { key: 'd', label: 'Dirty' },
  { key: 'g', label: 'Global' },
  { key: 'leaf', label: 'Is Leaf' },
]

const pteStr = ref('0x1000')
const pte = computed(() => {
  const value = pteStr.value
  if (value.startsWith('0x')) {
    return BigInt(value)
  }
  return BigInt(`0x${value}`)
})
const pteInfo = ref<PteInfo>(getPteInfo(pte.value))

watch(
  () => pte.value,
  (value) => {
    pteInfo.value = getPteInfo(value)
  },
)

const { pressed: mousePressed } = useMousePressed()

const startBit = ref(0)
const shadowEndBit = ref(0)

function inRange(idx: number) {
  return idx >= Math.min(startBit.value, shadowEndBit.value) && idx <= Math.max(startBit.value, shadowEndBit.value)
}

function onBitMouseDown(idx: number) {
  startBit.value = idx
  shadowEndBit.value = idx
}

function onEnterBit(idx: number) {
  if (mousePressed.value) {
    shadowEndBit.value = idx
  }
}

function onBitMouseUp(idx: number) {
  const endBit = idx
  const start = Math.min(startBit.value, endBit)
  const end = Math.max(startBit.value, endBit)
  const mask = BigInt(((1n << BigInt((end - start + 1))) - 1n) << BigInt(start))

  pteStr.value = `0x${(pte.value ^ mask).toString(16)}`
  startBit.value = -1
  shadowEndBit.value = -1
}
</script>

<template>
  <div font-mono>
    <p text-2xl>
      riscv-pte
    </p>

    <div py-4 />

    <div flex flex-col items-center>
      <HexInput :model-value="pteStr" placeholder="Sv39 pte" :maxlength="18" @submit="(value) => { pteStr = value }" />
      <div border="1px solid gray-300 dark:gray-600" flex="~ col" mt-1rem p4 rounded-md>
        <div mb-1rem inline-flex items-center>
          <Tooltip v-for="(bit, index) in pteInfo.binaryStr" :key="index">
            <span
              :key="index"
              class="border-2 border-transparent cursor-text select-none transition box-border hover:border-gray-500 hover:dark:border-gray-300" :class="[getBitInfo(63 - index)?.class, inRange(63 - index) ? '!bg-gray-400' : '']"
              @mousedown="onBitMouseDown(63 - index)" @mouseup="onBitMouseUp(63 - index)"
              @mouseenter="onEnterBit(63 - index)"
            >{{ bit }}</span>
            <template #content>
              <div text-sm select-none>
                {{ getBitInfo(63 - index)?.label }}
              </div>
            </template>
          </Tooltip>
          <CopyButton ml-0.5rem :text="`${pteInfo.binaryStr}`" :timeout="2000" />
        </div>
        <div class="gap-x-2 gap-y-1 grid grid-cols-[max-content_auto]" mt1rem>
          <div class="text-right" text="gray-500 dark:gray-400">
            Physical Page Number:
          </div>
          <div class="text-left inline-flex gap-x-2 items-center">
            {{ `0x${pteInfo.ppn.toString(16)}` }}
            <CopyButton :text="`0x${pteInfo.ppn.toString(16)}`" :timeout="2000" />
          </div>
          <div class="text-right" text="gray-500 dark:gray-400">
            Physical Address:
          </div>
          <div class="text-left inline-flex gap-x-2 items-center">
            {{ `0x${pteInfo.pa.toString(16)}` }}
            <CopyButton :text="`0x${pteInfo.pa.toString(16)}`" :timeout="2000" />
          </div>
          <template v-for="flag in flags" :key="flag.key">
            <div class="text-right" text="gray-500 dark:gray-400">
              {{ flag.label }}:
            </div>
            <div class="text-left" :class="pteInfo[flag.key] ? 'text-green-500' : 'text-red-500'">
              {{ pteInfo[flag.key] ? 'Yes' : 'No' }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
