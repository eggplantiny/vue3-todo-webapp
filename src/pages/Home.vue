<template>
  <section class="px-4">
    <div class="text-2xl">
      <p>
        <span class="font-bold text-indigo-500">{{ user.nickName }}</span>님
      </p>
      <p>안녕하세요 😊</p>
      <p>{{ clock }} 현재</p>
      <p v-html="todayMessage" />
    </div>
  </section>
  <section class="px-4 mt-4">
    <InputCard
      v-model:show-all="checked"
      @save="events.onClickSave"
    />
  </section>
  <section class="px-4 mt-4">
    <List>
      <template v-for="(item, index) in todoList" :key="index">
        <ListItem>
          <TodoCard
            :todo="item"
            @delete="events.onClickDelete"
            @toggle="events.onClickToggle"
          />
        </ListItem>
      </template>
      <template v-if="todoList.length === 0">
        <ListItem>
          <NoneCard :no-item="haveNoItem" />
        </ListItem>
      </template>
    </List>
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTodoStore, Todo } from '@/store/todo'
import { useClock } from '@/hooks/useClock'

import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'
import TodoCard from '@/components/molecules/Cards/TodoCard.vue'
import InputCard from '@/components/molecules/Cards/InputCard.vue'
import NoneCard from '@/components/molecules/Cards/NoneCard.vue'

const authStore = useAuthStore()
const todoStore = useTodoStore()
const { value: clock } = useClock()

const checked = ref(false)

const user = computed(() => authStore.user)

const todoList = computed<Todo[]>(() => checked.value ? todoStore.getAllList : todoStore.getNotDoneList)
const notDoneList = computed<Todo[]>(() => todoStore.getNotDoneList)
const haveNoItem = computed<boolean>(() => todoStore.getAllList.length === 0)
const todayMessage = computed<string>(() => {
  if (haveNoItem.value) return `아직 <span class="font-bold">작업</span>을 등록하지 않았어요.`
  if (notDoneList.value.length > 0) return `${notDoneList.value.length} 개 의 <span class="font-bold text-gray-700">작업</span>이 남았어요!`
  return `아주 훌륭한 <span class="text-indigo-500 font-bold">하루</span>를 보내시군요 🥰`
})

onBeforeMount(() => {
  todoStore.fetchTodo()
})

const events = {
  onClickSave (text: string) {
    if (text.length === 0) {
      window.alert('메시지를 입력 해 주세요 🥲')
      return
    }
    todoStore.addTodo({ text, level: 0 })
  },
  onClickDelete (todo: Todo) {
    const confirmed = window.confirm('정말로 항목을 지우실건가요? 🧐')

    if (!confirmed) {
      return
    }

    todoStore.removeTodo(todo)
  },
  onClickToggle (todo: Todo) {
    todoStore.modifyTodo({ ...todo, done: !todo.done })
  }
}
</script>

<style scoped lang="scss">
</style>
