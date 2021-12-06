import moment from 'moment'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Pausable, useIntervalFn } from '@vueuse/core'
import { Nullable } from '@/types/base'
import { dateString } from '@/utils/stringFormat'

function getCurrentTime () {
  return dateString(new Date(), 'YYYY년 MM월 DD일 hh시 mm분 ss초')
}

export function useClock () {
  const value = ref<string>(getCurrentTime())
  let pausable: Nullable<Pausable> = null

  onMounted(() => {
    useIntervalFn(() => {
      value.value = getCurrentTime()
    }, 1000)
  })

  onBeforeUnmount(() => {
    pausable?.pause()
  })

  return {
    value
  }
}
