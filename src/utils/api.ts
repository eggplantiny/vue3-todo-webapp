import { Todo } from '@/types/todo'
import { collection, doc, getDoc, getFirestore, setDoc, Timestamp } from 'firebase/firestore'
import useStorage from '@/hooks/useStorage'
import delay from '@/utils/delay'

const localStorage = useStorage().localStorage

async function fetchDataOnFirestore (userId: string): Promise<Todo[]> {
  const db = getFirestore()
  const docRef = doc(collection(db, 'todos'), userId)
  const snapshot = await getDoc(docRef)
  const data = snapshot.data()

  return (data?.items ?? []).map((x: { createdAt: Timestamp }) => ({
    ...x,
    createdAt: x.createdAt.toDate()
  })) as Todo[]
}

async function saveDataOnFirestore (todoList: Todo[], userId: string): Promise<void> {
  const db = getFirestore()
  const docRef = doc(collection(db, 'todos'), userId)
  await setDoc(docRef, { items: todoList })
}

async function fetchDataOnLocalStorage () {
  await delay(250)
  return localStorage.getItem<Todo[]>('todo') ?? []
}

async function saveDataOnLocalStorage (todoList: Todo[]) {
  await delay(250)
  localStorage.setItem('todo', todoList)
}

export function fetchData (userId?: string): Promise<Todo[]> {
  let fetchFunction: Promise<Todo[]>

  if (userId) {
    fetchFunction = fetchDataOnFirestore(userId)
  } else {
    fetchFunction = fetchDataOnLocalStorage()
  }

  return fetchFunction
}

export function saveData (todoList: Todo[], userId?: string): Promise<void> {
  let saveFunction: Promise<void>

  if (userId) {
    saveFunction = saveDataOnFirestore(todoList, userId)
  } else {
    saveFunction = saveDataOnLocalStorage(todoList)
  }

  return saveFunction
}
