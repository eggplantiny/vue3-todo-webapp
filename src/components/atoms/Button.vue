<template>
  <button
    class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    :style="[computedWidth, computedHeight]"
    v-bind:class="$attrs.class"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { generateBoxSize } from '@/utils/cssUtils'
import { Nullable } from '@/types/base'

const props = defineProps({
  width: {
    type: Object as PropType<Nullable<number>>,
    default: null
  },
  height: {
    type: Object as PropType<Nullable<number>>,
    default: null
  }
})

const computedWidth = computed(() => props.width ? generateBoxSize(props.width, 'px', 'width') : '')
const computedHeight = computed(() => props.height ? generateBoxSize(props.height, 'px', 'height') : '')

</script>

<style scoped>

</style>
