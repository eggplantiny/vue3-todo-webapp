<template>
  <div class="container h-screen flex justify-center items-center">
    <div class="p-8 bg-white rounded-lg max-w-6xl">
      <h1 class="font-bold text-indigo-800 text-3xl text-center mb-8">로그인</h1>
      <h2 class="font-bold text-2xl text-center mb-8">Vue3 Todo App</h2>
      <button type="button" ref="btnRef" />
      <Button
        class="bg-indigo-500 hover:bg-indigo-700"
        @click="login.withGithub()"
      >
        Login with Github
      </Button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import useKakaoLoginBtn from '@/hooks/components/useKakaoLoginBtn'
import { ref } from 'vue'
import { Nullable } from '@/types/base'
import { GoogleAuthProvider, GithubAuthProvider, AuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useLoading } from '@/store/useLoading'
import useAsync from '@/hooks/useAsync'
import Button from '@/components/atoms/Button.vue'

const auth = getAuth()
const { setLoading } = useLoading()

const btnRef = ref<Nullable<HTMLElement>>(null)
useKakaoLoginBtn(btnRef)

const loginHandler = async (provider: AuthProvider) => {
  const userCredentials = await useAsync(() => signInWithPopup(auth, provider))
  console.log(userCredentials)
}

const login = {
  withGoogle () {
    loginHandler(new GoogleAuthProvider())
  },
  withGithub () {
    loginHandler(new GithubAuthProvider())
  }
}

</script>

<style scoped lang="scss">

</style>
