<template>
  <div
    v-if="todo"
    class="w-full group px-4 py-4 hover:shadow hover:bg-blue-900 hover:text-white rounded transition-colors transition-shadow"
  >
    <p class="text-xl">
      {{ todo.text }}
    </p>
    <div class="text-sm text-right text-gray-500 group-hover:text-white">
      {{ createdAt }}
    </div>
    <div class="flex justify-end mt-4">
      <Button
        class="bg-red-500 mr-2"
        @click="emits('delete', todo)"
      >
        Delete
      </Button>
      <Button
        class="bg-green-500">
        {{ todo.done ? 'Revert' : 'Done' }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { Todo } from '@/store/todo'
import { Nullable } from '@/types/base'
import { dateString } from '@/utils/stringFormat'
import Button from '@/components/atoms/Button.vue'

const props = defineProps({
  todo: {
    type: Object as PropType<Nullable<Todo>>,
    default: null
  }
})

const emits = defineEmits(['delete', 'toggle'])

const createdAt = computed(() => dateString(props.todo?.createdAt ?? ''))
</script>

<style scoped>

</style>
