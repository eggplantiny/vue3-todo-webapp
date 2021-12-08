<template>
  <div class="card none-card">
    {{ noItem ? `There's no todo yet 🙂` : `You done all todo! 😄`}}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  noItem: boolean
}>()
</script>

<style scoped>

</style>
