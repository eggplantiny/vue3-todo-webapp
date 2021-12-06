import { Nullable } from '@/types/base'

const getItemClosure = (storage: Storage) => {
  return function getItem<T>(key: string): Nullable<T> {
    let temp
    try {
      temp = storage.getItem(key)
      if (!temp) {
        return null
      }

      return JSON.parse(temp) as T
    } catch {
      return temp as unknown as T
    }
  }
}

const setItemClosure = (storage: Storage) => {
  return function setItem(key: string, item: any): void {
    storage.setItem(key, JSON.stringify(item))
  }
}

export default function useStorage() {
  return {
    localStorage: {
      setItem: setItemClosure(localStorage),
      getItem: getItemClosure(localStorage),
    },
    sessionStorage: {
      setItem: setItemClosure(sessionStorage),
      getItem: getItemClosure(sessionStorage),
    },
  }
}
