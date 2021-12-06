<template>
  <label class="block text-gray-700 text-sm font-bold mb-2">
    {{ label }}
    <input
      class="shadow appearance-none border rounded w-full py-4 px-4 text-2xl font-bold leading-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="type"
      :placeholder="placeholder"
      v-model="value"
    />
  </label>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { PropType } from 'vue'

const props = withDefaults(defineProps<{
  label?: string,
  type?: string,
  modelValue?: string | number,
  placeholder?: string
}>(), {
  label: '',
  type: 'text',
  modelValue: '',
  placeholder: '입력해주세요 🙂'
})

const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
</script>

<style scoped lang="scss">
</style>
