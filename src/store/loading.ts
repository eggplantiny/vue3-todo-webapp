import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoading = defineStore('loading', () => {
  const value = ref(false)
  const transparent = ref(false)

  function setLoading (v: boolean, useTransparent: boolean = true) {
    value.value = v
    transparent.value = useTransparent
  }

  return {
    value,
    transparent,
    setLoading
  }
})
