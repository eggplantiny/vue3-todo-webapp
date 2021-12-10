<template>
  <button
    class="text-white font-bold py-2 px-4 rounded transition-colors"
    :style="[computedWidth, computedHeight]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { generateBoxSize } from '@/utils/cssUtils'

const props = defineProps<{
  width?: number,
  height?: number
}>()

const computedWidth = computed(() => props.width ? generateBoxSize(props.width, 'px', 'width') : '')
const computedHeight = computed(() => props.height ? generateBoxSize(props.height, 'px', 'height') : '')

</script>

<style scoped>

</style>
