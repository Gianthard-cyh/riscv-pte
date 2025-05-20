<script setup lang="ts" generic="T extends any, O extends any">
import { getBitInfo, getPteInfo } from '~/composables/sv39'

defineOptions({
  name: 'IndexPage',
})

const flags: Array<
  {
    key: keyof PteInfo
    label: string
  }
>
  = [
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

const name = ref('')
const pte = 0n
const pteInfo = ref<PteInfo>(getPteInfo(pte))
</script>

<template>
  <div font-mono>
    <p text-2xl>
      riscv-pte
    </p>

    <div py-4 />

    <div flex flex-col items-center>
      <HexInput v-model="name" placeholder="Sv39 pte" :maxlength="18" @submit="(value) => { pteInfo = getPteInfo(value); }" />
      <div border="1px solid gray-300 dark:gray-600" flex="~ col" mt-1rem p4 rounded-md>
        <div>
          <Tooltip v-for="(bit, index) in pteInfo.binaryStr" :key="index">
            <span
              :key="index" :class="getBitInfo(63 - index)?.class"
              class="border-2 border-transparent transition box-border hover:border-gray-500 hover:dark:border-gray-300"
            >{{
              bit }}</span>
            <template #content>
              <div text-sm>
                <div>
                  {{ getBitInfo(63 - index)?.label }}
                </div>
              </div>
            </template>
          </Tooltip>
        </div>
        <div class="gap-x-2 gap-y-1 grid grid-cols-[max-content_auto]" mt1rem>
          <div class="text-right" text="gray-500 dark:gray-400">
            Physical Page Number:
          </div>
          <div class="text-left inline-flex gap-x-2 items-center">
            {{ `0x${pteInfo.ppn.toString(16)}` }}
            <CopyButton
              :text="`0x${pteInfo.ppn.toString(16)}`"
              :timeout="2000"
            />
          </div>
          <div class="text-right" text="gray-500 dark:gray-400">
            Physical Address:
          </div>
          <div class="text-left inline-flex gap-x-2 items-center">
            {{ `0x${pteInfo.pa.toString(16)}` }}
            <CopyButton
              :text="`0x${pteInfo.pa.toString(16)}`"
              :timeout="2000"
            />
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
