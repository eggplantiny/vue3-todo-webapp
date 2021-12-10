<template>
  <div class="card none-card">
    {{ noItem ? `There's no todo yet 🙂` : `You done all todo! 😄`}}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  noItem: boolean
}>()
// import { defineComponent } from 'vue'
//
// export default defineComponent({
//   props: {
//     noItem: {
//       type: Boolean,
//       required: true;
//     }
//   }
// })
</script>

<style scoped>

</style>
