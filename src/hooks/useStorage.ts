const getItemClosure = (storage: Storage) => {
  return function getItem<T>(key: string): T {
    let temp
    try {
      temp = storage.getItem(key) || ''
      return JSON.parse(temp) as T
    } catch (e) {
      console.error(e)
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
