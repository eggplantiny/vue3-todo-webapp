<template>
  <section class="px-4">
    <div class="text-2xl">
      <p>
        <span class="font-bold text-indigo-500">{{ user.nickName }}</span>님
      </p>
      <p>
        안녕하세요 😊
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const user = authStore.user

</script>

<style scoped lang="scss">
</style>
