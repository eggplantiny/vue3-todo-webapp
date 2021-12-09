<template>
  <main>
    <section class="px-4">
      <div class="text-2xl" ref="t1">
        <p>
          Hello
        </p>
        <p><span class="font-bold text-indigo-500">{{ user?.nickName }}</span> 😊</p>
        <p>{{ clock }}</p>
        <p v-html="todayMessage" ref="t2"/>
      </div>
    </section>
    <section class="px-4 mt-4" ref="t3">
      <InputCard
        v-model:show-all="checked"
        @save="events.onClickSave"
      />
    </section>
    <section class="px-4 mt-4" ref="t4">
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
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useClock } from '@/hooks/useClock'
import { useFadeInOut } from '@/hooks/styles/useTransitions'
import { useAuthStore } from '@/store/auth'
import { useTodoStore, Todo } from '@/store/todo'
import { useDialog } from '@/store/useDialog'

import List from '@/components/atoms/List.vue'
import ListItem from '@/components/atoms/ListItem.vue'
import TodoCard from '@/components/molecules/Cards/TodoCard.vue'
import InputCard from '@/components/molecules/Cards/InputCard.vue'
import NoneCard from '@/components/molecules/Cards/NoneCard.vue'

const authStore = useAuthStore()
const todoStore = useTodoStore()
const { showDialog, showConfirm } = useDialog()
const clock = useClock()

const checked = ref(false)

const t1 = ref()
const t2 = ref()
const t3 = ref()
const t4 = ref()

const { start, reset } = useFadeInOut([t1, t2, t3, t4], { milliseconds: 333 })

const { user, isAuthenticated } = storeToRefs(authStore)

const todoList = computed<Todo[]>(() => checked.value ? todoStore.getAllList : todoStore.getNotDoneList)
const notDoneList = computed<Todo[]>(() => todoStore.getNotDoneList)
const haveNoItem = computed<boolean>(() => todoStore.getAllList.length === 0)
const todayMessage = computed<string>(() => {
  if (haveNoItem.value) return `you haven't registered the <span class="font-bold">any task</span> yet.`
  if (notDoneList.value.length > 0) return `${notDoneList.value.length} more <span class="font-bold text-indigo-500">task</span> ${notDoneList.value.length > 1 ? 'are' : 'is'} left.`
  return `You're having a <span class="text-indigo-500 font-bold">great</span> day 🥰`
})

watch(isAuthenticated, async authenticated => {
  if (authenticated) {
    await todoStore.fetchTodo(user.value?.userId)
    await start()
  }
}, {
  immediate: true
})

const events = {
  async onClickSave (text: string) {
    if (text.length === 0) {
      showDialog('Please enter something 🥲')
      reset()
      start()
      return
    }
    todoStore.addTodo({ text, level: 0 }, user.value?.userId)
  },
  onClickDelete (todo: Todo) {
    showConfirm('Do you want to delete this todo? 🧐', (confirmed: boolean) => {
      confirmed && todoStore.removeTodo(todo, user.value?.userId)
    }, 'Delete Todo')
  },
  onClickToggle (todo: Todo) {
    todoStore.modifyTodo({ ...todo, done: !todo.done }, user.value?.userId)
  }
}
</script>

<style scoped lang="scss">
</style>
