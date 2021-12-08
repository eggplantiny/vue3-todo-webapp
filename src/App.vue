<template>
  <Dialog />
  <Loading />
  <router-view />
</template>

<script setup lang="ts">
import Loading from '@/components/organisms/Loading.vue'
import Dialog from '@/components/organisms/Dialog.vue'
</script>

<style lang="scss">
</style>
