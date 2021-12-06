<template>
  <template v-if="!loading">
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
</template>

<script lang="ts" setup>
import useAuth from '@/hooks/useAuth'
import AppBar from '@/components/organisms/AppBar.vue'
import useScrollObserver from '@/hooks/useScrollObserver'

const { loading } = useAuth()
const { isScrolled } = useScrollObserver()
</script>

<style scoped lang="scss">

</style>
