<template>
  <div class="flex justify-end">
    <label class="inline-flex items-center mr-2">
      <input
        v-model="checked"
        type="checkbox"
        class=""
        checked
      />
      <span class="ml-2">Show All</span>
    </label>
    <Button
      class="bg-indigo-500 hover:bg-indigo-700"
      @click="save"
    >
      Save
    </Button>
  </div>
  <div class="mt-2 w-full">
    <Input
      v-model="text"
      placeholder="Enter somethings..."
      @keydown.enter.prevent="save"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { useDialog } from '@/store/dialog'

import Input from '@/components/atoms/Input.vue'
import Button from '@/components/atoms/Button.vue'

const props = defineProps<{ showAll: boolean }>()
const dialog = useDialog()

const emits = defineEmits(['save', 'update:showAll'])
const checked = useVModel(props, 'showAll', emits)

const text = ref<string>('')

const save = () => {
  emits('save', text.value)
  text.value = ''
}

const helloWorld = () => {
  dialog.alert('Hello World 🙂\nI\'m on InputCard Component!')
}

defineExpose<{ helloWorld: () => void }>({ helloWorld })
</script>

<style scoped>

</style>
