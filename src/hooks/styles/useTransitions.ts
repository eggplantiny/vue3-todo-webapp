import { onMounted, Ref, watch, ref } from 'vue'
import { Nullable } from '@/types/base'
import { watchOnce } from '@vueuse/core'
import delay from '@/utils/delay'

function * classNameChangeTrigger (refs: Ref<HTMLElement | undefined>[], beforeClassNameList: string[], toBeClassNameList: string[]) {
  for (const ref of refs) {
    if (!ref || !ref.value) {
      continue
    }

    ref.value.classList.remove(...beforeClassNameList)
    ref.value.classList.add(...toBeClassNameList)
    yield ref
  }
  return null
}

function initializeClassName (
  refs: Ref<HTMLElement | undefined>[],
  classNameList: string[],
  beforeClassNameList: string[],
  toBeClassNameList: string[]
) {
  for (const ref of refs) {
    if (!ref || !ref.value) {
      continue
    }
    ref.value.classList.remove(...beforeClassNameList)
    ref.value.classList.remove(...toBeClassNameList)
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
  elements: Ref<HTMLElement | undefined>[],
  initialClassNameList: string[],
  beforeClassNameList: string[],
  toBeClassNameList: string[],
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
    initializeClassName(elements, initialClassNameList, beforeClassNameList, toBeClassNameList)
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
      trigger = classNameChangeTrigger(elements, beforeClassNameList, toBeClassNameList)
    }
    init()
  })

  return {
    initiated,
    start,
    reset
  }
}

export function useFadeInOut (elements: Ref<HTMLElement | undefined>[], options: Partial<Options> = {}) {
  return useClassNameTransition(
    elements,
    ['transition-all', 'opacity-0'],
    ['opacity-0'],
    ['opacity-100'],
    options
  )
}
