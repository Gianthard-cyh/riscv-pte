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
  modelValue: {
    type: String,
    default: '0x1000',
  },
})

const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

const modelValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    modelValue.value = value
  },
)

function validateHex(value: string): boolean {
  return /^0x[0-9a-fA-F]+$/.test(value)
}

const isEmpty = computed(() => modelValue.value.length === 0)
const isValid = computed(() => validateHex(modelValue.value))

function submit() {
  if (isValid.value) {
    emit('submit', modelValue.value)
  }
}

watch(
  () => modelValue.value,
  submit,
  { immediate: true },
)
</script>

<template>
  <div class="w-fit relative">
    <input
      v-model="modelValue" type="text" :placeholder="props.placeholder" :maxlength="props.maxlength"
      class="outline-none font-mono px-4 py-2 border-1 border-gray-300 rounded-md transition-all dark:border-gray-600 focus:border-blue-500 hover:border-gray-400"
    >
    <div
      v-if="!isValid && !isEmpty"
      class="i-material-symbols:warning-outline text-base text-red-500 translate-y-[-50%] right-2 top-1/2 absolute"
    />
  </div>
</template>
