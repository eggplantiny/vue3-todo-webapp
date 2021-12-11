import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

interface Options {
  threshold: number;
  callback?: (scrollX: number, scrollY: number) => void;
}

const defaultOptions: Options = {
  threshold: 20
}

export default function useScrollObserver (options: Partial<Options> = {}) {
  const { threshold, callback } = { ...defaultOptions, ...options }
  const scrollXRef = ref<number>(0)
  const scrollYRef = ref<number>(0)

  const isScrolledX = computed<boolean>(() => scrollXRef.value > threshold)
  const isScrolledY = computed<boolean>(() => scrollYRef.value > threshold)

  function listener (ev: Event) {
    const { scrollX, scrollY } = window
    scrollXRef.value = scrollX
    scrollYRef.value = scrollY

    callback && callback(scrollY, scrollY)
  }

  onBeforeMount(() => {
    window.addEventListener('scroll', listener)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', listener)
  })

  return {
    scrollX: scrollXRef,
    scrollY: scrollYRef,
    isScrolledX,
    isScrolledY
  }
}
