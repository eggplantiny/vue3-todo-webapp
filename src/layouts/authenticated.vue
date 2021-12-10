<template>
  <template v-if="!loading">
    <div class="relative w-full h-full">
      <AppBar :isScrolled="isScrolled" />
      <main class="mx-auto max-w-xl w-full h-full">
        <router-view />
      </main>
    </div>
  </template>
</template>

<script lang="ts" setup>
import AppBar from '@/components/organisms/AppBar.vue'
import useAuth from '@/hooks/useAuth'
import useScrollObserver from '@/hooks/useScrollObserver'

const { loading } = useAuth()
const { isScrolled } = useScrollObserver(10)
</script>

<style scoped lang="scss">

</style>
