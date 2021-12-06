<template>
  <div
    v-if="todo"
    class="card todo-card"
    :class="todo.done ? 'done' : ''"
  >
    <p
      class="text-xl"
      :class="todo.done ? 'line-through' : ''"
    >
      {{ todo.text }}
    </p>
    <div class="text-sm text-right text-gray-500 group-hover:text-white">
      {{ createdAt }}
    </div>
    <div class="flex justify-end mt-4">
      <Button
        class="btn-error mr-2"
        @click="emits('delete', todo)"
      >
        Delete
      </Button>
      <Button
        :class="todo.done ? 'btn-warning' : 'btn-success'"
        @click="emits('toggle', todo)"
      >
        {{ todo.done ? 'Revert' : 'Done' }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/atoms/Button.vue'
import { computed, PropType } from 'vue'
import { Todo } from '@/store/todo'
import { Nullable } from '@/types/base'
import { dateString } from '@/utils/stringFormat'

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
