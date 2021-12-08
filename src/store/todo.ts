import { nanoid } from "nanoid"
import { defineStore } from "pinia"
import { fetchData, saveData } from '@/utils/api'

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

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    todoList: []
  }),
  actions: {
    async addTodo (params: Todo, userId?: string) {
      const id = nanoid()
      const createdAt = new Date()
      const done = false
      const todo: Todo = { ...params, id, createdAt, done }

      this.todoList.push(todo)
      await saveData(this.todoList, userId)
    },
    async removeTodo (todo: Todo, userId?: string) {
      const index = this.todoList.findIndex(x => x.id === todo.id)

      if (index < 0) {
        throw new Error(`Can't find todo item [${todo.id}]`)
      }

      this.todoList.splice(index, 1)
      await saveData(this.todoList, userId)
    },
    async modifyTodo (todo: Todo, userId?: string) {
      const index = this.todoList.findIndex(x => x.id === todo.id)

      if (index < 0) {
        throw new Error(`Can't find todo item [${todo.id}]`)
      }

      this.todoList.splice(index, 1, todo)
      await saveData(this.todoList, userId)
    },
    async fetchTodo (userId?: string) {
      const targetData = await fetchData(userId)
      this.todoList = targetData
    }
  },
  getters: {
    getDoneList: (state): Todo[] => state.todoList.filter(x => x.done),
    getNotDoneList: (state): Todo[] => state.todoList.filter(x => !x.done),
    getAllList: (state): Todo[] => state.todoList
  }
})
