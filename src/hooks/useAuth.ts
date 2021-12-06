import { useRouter } from 'vue-router'
import { useKakao } from 'vue3-kakao-sdk'
import { onBeforeMount, ref } from 'vue'
import {useAuthStore} from '@/store/auth'

const kakaoAccessToken = localStorage.getItem('KAKAO_ACCESS_TOKEN')

export default function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { kakao, initialize } = useKakao()
  const show = ref(false)

  onBeforeMount(async () => {
    if (authStore.isAuthenticated) {
      show.value = true
      return
    }

    await initialize()

    if (kakaoAccessToken && kakaoAccessToken.length > 0) {
      kakao.value.Auth.setAccessToken(kakaoAccessToken)
    }

    try {
      await authStore.fetchKakaoUser()
      show.value = true
    } catch (e) {
      router.push('/auth/login')
    }
  })

  return {
    show
  }
}
