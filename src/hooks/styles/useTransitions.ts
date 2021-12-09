import { onMounted, ref, Ref, watch } from 'vue'
import { Nullable } from '@/types/base'
import delay from '@/utils/delay'
import { watchOnce } from '@vueuse/core'

function * classNameChangeTrigger (refs: Ref<HTMLElement>[], deleteClassNameList: string[], appendClassNameList: string[]) {
  for (const ref of refs) {
    if (!ref || !ref.value) {
      continue
    }

    ref.value.classList.remove(...deleteClassNameList)
    ref.value.classList.add(...appendClassNameList)
    yield ref
  }
  return null
}

function initializeClassName (
  refs: Ref<HTMLElement>[],
  classNameList: string[],
  deleteClassNameList: string[],
  appendClassNameList: string[]
) {
  for (const ref of refs) {
    if (!ref || !ref.value) {
      continue
    }
    ref.value.classList.remove(...deleteClassNameList)
    ref.value.classList.remove(...appendClassNameList)
    ref.value.classList.remove(...classNameList)
    ref.value.classList.add(...classNameList)
  }
}

interface Options {
  milliseconds: number;
  once: boolean;
  useStartDelay: boolean;
}

const defaultOptions: Options = {
  milliseconds: 500,
  once: false,
  useStartDelay: false
}

function useClassNameTransition (
  elements: Ref<HTMLElement>[],
  initialClassNameList: string[],
  appendClassNameList: string[],
  deleteClassNameList: string[],
  options: Partial<Options> = {}
) {
  const { milliseconds, once, useStartDelay }: Options = { ...defaultOptions, ...options }
  let trigger: Nullable<Generator> = null
  const isStartedRef = ref(false)
  const initiated = ref(false)

  async function watchFunction (isStarted: boolean) {
    if (isStarted && trigger) {
      useStartDelay && await delay(milliseconds)

      for await (const x of trigger) {
        await delay(milliseconds)
      }
    }
  }

  if (once) {
    watchOnce(isStartedRef, watchFunction)
  } else {
    watch(isStartedRef, watchFunction)
  }

  function init () {
    initializeClassName(elements, initialClassNameList, deleteClassNameList, appendClassNameList)
  }

  function start () {
    initiated.value = true
    isStartedRef.value = true
  }

  function reset () {
    isStartedRef.value = false
    init()
  }

  onMounted(() => {
    if (!trigger) {
      trigger = classNameChangeTrigger(elements, deleteClassNameList, appendClassNameList)
    }
    init()
  })

  return {
    initiated,
    start,
    reset
  }
}

export function useFadeInOut(elements: Ref<HTMLElement>[], options: Partial<Options> = {}) {
  return useClassNameTransition(elements,['transition-all', 'opacity-0'], ['opacity-100'], ['opacity-0'], options)
}
