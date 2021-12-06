<template>
  <div class="card none-card">
    {{ noItem ? '아직 항목이 없어요 🙂' : '모든 항목을 마쳤어요 😄'}}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  noItem: boolean
}>()
</script>

<style scoped>

</style>
