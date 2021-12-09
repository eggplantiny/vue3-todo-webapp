<template>
  <header class="px-4 py-4 flex justify-between">
    <div class="text-2xl font-bold flex items-center">
      {{ title }}
    </div>
    <template v-if="user">
      <button
        v-ripple
        type="button"
        class="w-10 h-10 rounded-full"
        @click="events.onClickProfile"
      >
        <img
          class="rounded-full shadow-lg"
          alt="profile image"
          :src="user?.thumbnailImage"
        />
      </button>
    </template>
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useDialog } from '@/store/useDialog'

const authStore = useAuthStore()
const { showConfirm } = useDialog()
const route = useRoute()
const router = useRouter()

const title = computed(() => route.meta.title || 'Home')
const user = computed(() => authStore.user)
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
  }
}
</script>

<style scoped lang="scss">
</style>
