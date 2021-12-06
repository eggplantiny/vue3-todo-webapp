<template>
  <div class="container h-screen flex justify-center items-center">
    <div class="p-8 bg-white rounded-lg max-w-6xl">
      <h1 class="font-bold text-indigo-800 text-3xl text-center mb-8">로그인</h1>
      <h2 class="font-bold text-2xl text-center mb-8">Vue3 Todo App</h2>
      <button type="button" ref="btnRef" />
    </div>
  </div>
</template>


<script lang="ts">
import useKakaoLoginBtn from '@/hooks/components/useKakaoLoginBtn'
import { ref } from "vue";

export default {
  setup () {
    const btnRef = ref<HTMLElement>()

    useKakaoLoginBtn(btnRef)

    return {
      btnRef
    }
  }
}

</script>

<style scoped lang="scss">

</style>
