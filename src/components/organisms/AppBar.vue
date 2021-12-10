<template>
  <header
    v-if="isAuthenticated"
    :class="[props.isScrolled ? 'shadow-lg' : '']"
    v-bind="$attrs"
  >
    <div class="mx-auto max-w-xl w-full flex justify-between">
      <div class="text-2xl font-bold flex items-center dark:text-gray-50 transition-colors">
        {{ title }}
      </div>
      <div class="flex items-center">
        <button
          type="button"
          class="round-btn mr-2 px-1 py-1"
          @click.prevent.stop="events.onClickToggleDarkMode"
        >
          <transition mode="out-in" name="fade">
            <MoonIcon class="dark:text-white bg-transparent transition-colors" v-if="isDarkMode" />
            <SunIcon class="dark:text-white bg-transparent transition-colors" v-else />
          </transition>
        </button>
        <button
          v-ripple
          type="button"
          class="round-btn"
          @click="events.onClickProfile"
        >
          <img
            class="rounded-full shadow-lg"
            alt="profile image"
            :src="user?.thumbnailImage"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useDialog } from '@/store/useDialog'
import { useDark, useToggle } from '@vueuse/core'
import { MoonIcon, SunIcon } from '@heroicons/vue/outline'

const props = defineProps<{
  isScrolled: boolean
}>()

const authStore = useAuthStore()
const { showConfirm } = useDialog()
const route = useRoute()
const router = useRouter()

const title = computed(() => route.meta.title || 'Home')
const user = computed(() => authStore.user)
const isDarkMode = useDark()
const toggleDarkMode = useToggle(isDarkMode)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const events = {
  onClickProfile () {
    showConfirm('Do you want logout?', async confirmed => {
      if (!confirmed) {
        return
      }
      await authStore.logout()
      await router.push('/auth/login')
    }, 'Logout')
  },
  onClickToggleDarkMode () {
    toggleDarkMode()
  }
}
</script>

<style scoped lang="scss">
header {
  @apply px-4 py-4 flex justify-between sticky top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 transition-all
}
.round-btn {
  @apply w-10 h-10 rounded-full;
}
</style>
