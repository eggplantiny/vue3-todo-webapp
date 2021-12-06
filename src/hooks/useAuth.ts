import { useRouter } from 'vue-router'
import { useKakao } from 'vue3-kakao-sdk'
import { onBeforeMount, ref } from 'vue'
import {useAuthStore} from '@/store/auth'
import delay from '@/utils/delay'
import { useLoading } from '@/store/useLoading'

const kakaoAccessToken = localStorage.getItem('KAKAO_ACCESS_TOKEN')

export default function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { kakao, initialize } = useKakao()
  const { setLoading, value } = useLoading()

  onBeforeMount(async () => {
    if (authStore.isAuthenticated) {
      return
    }

    await initialize()
    if (kakaoAccessToken && kakaoAccessToken.length > 0) {
      kakao.value.Auth.setAccessToken(kakaoAccessToken)
    }

    try {
      setLoading(true, false)
      await authStore.fetchKakaoUser()
      await delay(1200)
      setLoading(false, false)
    } catch (e) {
      await router.push('/auth/login')
      setLoading(false, false)
    }
  })

  return {
    loading: value
  }
}
