<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Enter hex value',
  },
  maxlength: {
    type: Number,
    default: 20,
  },
})

const emit = defineEmits<{
  (e: 'submit', value: bigint): void
}>()

const modelValue = defineModel<string>({ default: '' })

function validateHex(value: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(value)
}

const isEmpty = computed(() => modelValue.value.length === 0)
const isValid = computed(() => validateHex(modelValue.value))

function submit() {
  if (isValid.value) {
    emit('submit', BigInt(modelValue.value))
  }
}
</script>

<template>
  <div class="w-fit relative">
    <input
      v-model="modelValue"
      type="text"
      :placeholder="props.placeholder"
      :maxlength="props.maxlength"
      class="outline-none font-mono px-4 py-2 border-1 border-gray-300 rounded-md transition-all dark:border-gray-600 focus:border-blue-500 hover:border-gray-400"
      @input="submit"
    >
    <!-- 嵌入合法性标识 -->
    <div
      v-if="!isValid && !isEmpty"
      class="i-material-symbols:warning-outline text-base text-red-500 translate-y-[-50%] right-2 top-1/2 absolute"
    />
  </div>
</template>
