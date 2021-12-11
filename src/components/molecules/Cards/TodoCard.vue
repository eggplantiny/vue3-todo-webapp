<template>
  <div
    class="card todo-card"
    :class="todo.done ? 'done' : ''"
  >
    <p
      class="text-xl"
      :class="todo.done ? 'line-through' : ''"
    >
      {{ todo.text }}
    </p>
    <p class="text-sm text-right text-gray-500 mt-2">
      {{ createdAt }}
    </p>
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
import { computed, PropType, SetupContext, defineComponent } from 'vue'
import { Todo } from '@/types/todo'
import { dateString } from '@/utils/stringFormat'
import Button from '@/components/atoms/Button.vue'

// // use defineComponent
// export default defineComponent({
//   components: {
//     Button
//   },
//   props: {
//     todo: {
//       type: Object as PropType<Nullable<Todo>>,
//       default: () => null
//     }
//   },
//   emits: ['delete', 'toggle'],
//   setup (props) {
//     const createdAt = computed(() => dateString(props.todo?.createdAt ?? ''))
//
//     return {
//       createdAt
//     }
//   }
// })
const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    default: null
  }
})

const emits = defineEmits(['delete', 'toggle'])

const createdAt = computed(() => dateString(props.todo?.createdAt ?? ''))
</script>

<style scoped>

</style>
