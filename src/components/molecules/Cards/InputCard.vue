<template>
  <div class="flex justify-between">
    <span class="font-bold text-2xl">TODO</span>
    <Button
      class="bg-indigo-500 hover:bg-indigo-700"
      @click="save"
    >
      저장
    </Button>
  </div>
  <div class="mt-2 w-full">
    <Input
      v-model="text"
      @keydown.enter.prevent="save"
    />
  </div>
</template>

<script lang="ts" setup>
import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'
import { ref } from 'vue'

const emits = defineEmits(['save'])

const text = ref<string>('')

const save = () => {
  emits('save', text.value)
  text.value = ''
}
</script>

<style scoped>

</style>
