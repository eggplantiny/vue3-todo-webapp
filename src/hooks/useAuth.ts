import { useRouter } from 'vue-router'
import { useKakao } from 'vue3-kakao-sdk'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useLoading } from '@/store/useLoading'
import { Provider } from '@/types/auth'
import useStorage from '@/hooks/useStorage'

const kakaoAccessToken = localStorage.getItem('KAKAO_ACCESS_TOKEN')

export default function useAuth () {
  const router = useRouter()
  const { getPersistenceFirebaseUser, getPersistenceKakaoUser, isAuthenticated } = useAuthStore()
  const { localStorage } = useStorage()
  const { kakao, initialize } = useKakao()
  const { value } = useLoading()

  onBeforeMount(async () => {
    if (isAuthenticated) {
      return
    }

    const providedBy = localStorage.getItem<Provider>('provider')
    let success = false
    try {
      if (providedBy === 'Kakao') {
        await initialize()
        if (kakaoAccessToken && kakaoAccessToken.length > 0) {
          kakao.value.Auth.setAccessToken(kakaoAccessToken)
        }

        success = await getPersistenceKakaoUser()
      } else if (providedBy === 'Google' || providedBy === 'Github') {
        success = await getPersistenceFirebaseUser(providedBy)
      }

      if (!success) {
        router.push('/auth/login')
      }
    } catch {
      await router.push('/auth/login')
    }
  })

  return {
    loading: value
  }
}
