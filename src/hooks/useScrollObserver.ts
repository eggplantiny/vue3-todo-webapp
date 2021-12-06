import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

export default function useScrollObserver (threshold: number = 40) {
  const offset = ref<number>(0)
  const isScrolled = computed<boolean>(() => offset.value > threshold)

  onBeforeMount(() => {
    window.addEventListener('scroll', ev => {
      offset.value = window.scrollY
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', ev => {
      offset.value = window.scrollY
    })
  })

  return {
    offset,
    isScrolled
  }
}
