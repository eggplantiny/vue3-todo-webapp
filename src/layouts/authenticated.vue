<template>
  <div class="relative w-full h-full">
    <AppBar :isScrolled="isScrolledY" />
    <main class="mx-auto max-w-xl w-full h-full">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import AppBar from '@/components/organisms/AppBar.vue'
import useScrollObserver from '@/hooks/useScrollObserver'

const { isScrolledY } = useScrollObserver({
  threshold: 10,
  callback (x, y) {
    console.log('hello authenticated layout!', { x, y })
  }
})
</script>

<style scoped lang="scss">

</style>
