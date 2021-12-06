<template>
  <template v-if="show">
    <div class="relative mx-auto max-w-xl">
      <app-bar
        class="sticky top-0 left-0 right-0 bg-white z-10 transition-shadow"
        :class="isScrolled ? 'shadow-lg' : ''"
      />
      <main>
        <router-view />
      </main>
    </div>
  </template>
  <template v-else>
    <div class="w-full h-full flex justify-center items-center">
      <div class="flex items-center justify-center space-x-2 animate-bounce">
        <div class="w-4 h-4 bg-blue-400 rounded-full"></div>
        <div class="w-4 h-4 bg-green-400 rounded-full"></div>
        <div class="w-4 h-4 bg-black rounded-full"></div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import useAuth from '@/hooks/useAuth'
import AppBar from '@/components/organisms/AppBar.vue'
import useScrollObserver from '@/hooks/useScrollObserver'
const { show } = useAuth()
const { isScrolled } = useScrollObserver()
</script>

<style scoped lang="scss">

</style>
