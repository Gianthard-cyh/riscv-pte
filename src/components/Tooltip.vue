<script setup lang="ts">
import { useElementHover, useMouse } from '@vueuse/core'
import { ref } from 'vue'

const triggerRef = ref<HTMLElement | null>(null)
const isHover = useElementHover(triggerRef)
const { x } = useMouse()
const { y } = useElementBounding(triggerRef)
</script>

<template>
  <span ref="triggerRef" class="inline-block relative">
    <slot />

    <div
      v-if="isHover"
      :style="{ left: `${x + 10}px`, top: `${y - 36}px` }"
      class="text-sm text-white px-2 py-1 rounded bg-black bg-opacity-80 pointer-events-none shadow transition-opacity duration-100 fixed z-50"
    >
      <slot name="content" />
    </div>
  </span>
</template>
