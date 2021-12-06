<template>
  <section class="px-4">
    <div class="text-2xl">
      <p>
        <span class="font-bold text-indigo-500">{{ user.nickName }}</span>님
      </p>
      <p>
        안녕하세요 😊
      </p>
      <p>
        {{ clock }}
      </p>
    </div>
  </section>
  <section class="px-4 mt-4">
    <div class="flex justify-between">
      <span class="font-bold text-2xl">TODO</span>
      <Button @click="events.onClickSave">
        저장
      </Button>
    </div>
    <div class="mt-2 w-full">
      <Input
        v-model="text"
        @keydown.enter.prevent="events.onClickSave"
      />
    </div>
  </section>
  <section class="px-4 mt-4">
    <List>
      <template v-for="(item, index) in todoList" :key="index">
        <ListItem>
          <TodoCard :todo="item" @delete="events.onClickDelete"/>
        </ListItem>
      </template>
    </List>
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTodoStore, Todo } from '@/store/todo'
import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'
import Input from '@/components/atoms/Input.vue'
import { useLoading } from '@/store/useLoading'
import { useClock } from '@/hooks/useClock'
import Button from '@/components/atoms/Button.vue'
import TodoCard from '@/components/molecules/TodoCard.vue'

const authStore = useAuthStore()
const todoStore = useTodoStore()
const { setLoading } = useLoading()
const { value: clock } = useClock()

const user = authStore.user

const todoList = computed<Todo[]>(() => todoStore.getAllList)

const text = ref<string>('')

onBeforeMount(async () => {
  setLoading(true)
  await todoStore.fetchTodo()
  setLoading(false)
})

const events = {
  async onClickSave () {
    const t = text.value
    text.value = ''
    await todoStore.addTodo({ text: t, level: 0 })
  },
  async onClickDelete (todo: Todo) {
    await todoStore.removeTodo(todo)
  }
}
</script>

<style scoped lang="scss">
</style>
