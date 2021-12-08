<template>
  <transition name="fade" mode="in-out">
    <main v-if="isAuthenticated">
      <section class="px-4">
        <div class="text-2xl">
          <p>
            Hello
          </p>
          <p><span class="font-bold text-indigo-500">{{ user.nickName }}</span> 😊</p>
          <p>{{ clock }}</p>
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
          <template v-for="item in todoList" :key="item.id">
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
    </main>
  </transition>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue'
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
const isAuthenticated = computed(() => authStore.isAuthenticated)

const todoList = computed<Todo[]>(() => checked.value ? todoStore.getAllList : todoStore.getNotDoneList)
const notDoneList = computed<Todo[]>(() => todoStore.getNotDoneList)
const haveNoItem = computed<boolean>(() => todoStore.getAllList.length === 0)
const todayMessage = computed<string>(() => {
  if (haveNoItem.value) return `you haven't registered the <span class="font-bold">any task</span> yet.`
  if (notDoneList.value.length > 0) return `${notDoneList.value.length} more <span class="font-bold text-indigo-500">task</span> are left.`
  return `You're having a <span class="text-indigo-500 font-bold">great</span> day 🥰`
})

watch(isAuthenticated, authenticated => {
  if (authenticated) {
    todoStore.fetchTodo(user.value.userId)
  }
})

const events = {
  onClickSave (text: string) {
    if (text.length === 0) {
      window.alert('Please enter something 🥲')
      return
    }
    todoStore.addTodo({ text, level: 0 }, user.value.userId)
  },
  onClickDelete (todo: Todo) {
    const confirmed = window.confirm('Do you want to delete this todo? 🧐')

    if (!confirmed) {
      return
    }

    todoStore.removeTodo(todo, user.value.userId)
  },
  onClickToggle (todo: Todo) {
    todoStore.modifyTodo({ ...todo, done: !todo.done }, user.value.userId)
  }
}
</script>

<style scoped lang="scss">
</style>
