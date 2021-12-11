import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Nullable } from '@/types/base'

export const useDialog = defineStore('Dialog', () => {
  const value = ref<boolean>(false)
  const titleRef = ref<string>('')
  const textRef = ref<string>('')
  const callbackRef = ref<Nullable<(confirmed: boolean) => void>>(null)
  const isConfirm = ref<boolean>(false)

  async function showDialog (text: string, title?: string) {
    value.value = true
    titleRef.value = title ?? 'Alert'
    textRef.value = text
    isConfirm.value = false
  }

  function showConfirm (text: string, callback: (confirmed: boolean) => void, title?: string) {
    value.value = true
    titleRef.value = title ?? 'Confirm'
    textRef.value = text
    callbackRef.value = callback
    isConfirm.value = true
  }

  function closeDialog () {
    value.value = false
  }

  return {
    value,
    isConfirm,
    title: titleRef,
    text: textRef,
    callback: callbackRef,
    showConfirm,
    showDialog,
    closeDialog
  }
})
