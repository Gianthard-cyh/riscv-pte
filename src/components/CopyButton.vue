<script setup lang="ts">
import { useClipboard, useTimeoutFn } from '@vueuse/core'

const props = defineProps<{
  text: string
  timeout?: number
}>()

const copied = ref(false)
const { copy } = useClipboard()

const { start } = useTimeoutFn(() => {
  copied.value = false
}, props.timeout ?? 2000)

async function copyText() {
  await copy(props.text)
  copied.value = true
  start()
}
</script>

<template>
  <button
    type="button"
    opacity-75 inline-flex cursor-pointer transition-opacity items-center justify-center hover:opacity-100
    class="text-inherit"
    @click="copyText"
  >
    <div v-if="copied" class="i-carbon-checkmark text-green-500" />
    <div v-else class="i-material-symbols:content-copy" />
  </button>
</template>
