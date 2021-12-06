import useStorage from "@/hooks/useStorage"
import delay from "@/utils/delay"
import { nanoid } from "nanoid"
import { defineStore } from "pinia"
import { useLoading } from '@/store/useLoading'

export interface Todo {
  text: string;
  level: number;
  done?: boolean;
  createdAt?: Date;
  id?: string;
}

interface State {
  todoList: Todo[]
}

const localStorage = useStorage().localStorage

async function fetchData () {
  const { setLoading } = useLoading()

  setLoading(true)
  await delay(250)
  setLoading(false)
  return localStorage.getItem<Todo[]>('todo')
}

async function saveData (todoList: Todo[]) {
  const { setLoading } = useLoading()

  setLoading(true)
  await delay(250)
  setLoading(false)
  localStorage.setItem('todo', todoList)
}

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    todoList: []
  }),
  actions: {
    async addTodo (params: Todo) {
      const id = nanoid()
      const createdAt = new Date()
      const done = false
      const todo: Todo = { ...params, id, createdAt, done }
      this.todoList.push(todo)
      await saveData([...this.todoList, todo])
    },
    async removeTodo (params: Todo) {
      const targetData = this.todoList.filter(x => x.id !== params.id)
      await saveData(targetData)
      this.todoList.splice(0, this.todoList.length, ...targetData)
    },
    async modifyTodo (params: Todo) {
      const index = this.todoList.findIndex(x => x.id === params.id)

      if (index < 0) {
        throw new Error(`Can't find todo item [${params.id}]`)
      }

      const targetData = this.todoList.splice(index, 1, params)
      await saveData(targetData)
    },
    async fetchTodo () {
      const targetData = await fetchData()

      if (!targetData) {
        return
      }

      this.todoList.splice(0, this.todoList.length, ...targetData)
    }
  },
  getters: {
    getDoneList: (state): Todo[] => state.todoList.filter(x => x.done),
    getNotDoneList: (state): Todo[] => state.todoList.filter(x => !x.done),
    getAllList: (state): Todo[] => state.todoList
  }
})
