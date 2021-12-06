import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Pausable, useIntervalFn } from '@vueuse/core'
import { Nullable } from '@/types/base'
import { dateString } from '@/utils/stringFormat'

function getCurrentTime (format: string) {
  return dateString(new Date(),format)
}

export function useClock (format: string = 'MM월 DD일 hh시 mm분') {
  const value = ref<string>(getCurrentTime(format))
  let pausable: Nullable<Pausable> = null

  onMounted(() => {
    useIntervalFn(() => {
      value.value = getCurrentTime(format)
    }, 1000)
  })

  onBeforeUnmount(() => {
    pausable?.pause()
  })

  return {
    value
  }
}
