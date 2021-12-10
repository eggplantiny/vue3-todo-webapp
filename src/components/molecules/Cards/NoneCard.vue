<template>
  <div class="card none-card">
    <p v-html="message" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  noItem: boolean
}>()

const message = computed(() => props.noItem ? `There's no <span class="emphasis">todo</span> yet 🙂` : `You done all <span class="emphasis">todos</span>! 😄`)

// import { defineComponent } from 'vue'
// export default defineComponent({
//   props: {
//     noItem: {
//       type: Boolean,
//       required: true;
//     }
//   },
//   setup () {
//     const message = computed(() => props.noItem ? `There's no <span class="emphasis">todo</span> yet 🙂` : `You done all <span class="emphasis">todos</span>! 😄`)
//     return {
//       message
//     }
//   }
// })
</script>

<style scoped>

</style>
