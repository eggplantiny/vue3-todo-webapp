import { useRouter } from 'vue-router'
import { useKakao } from 'vue3-kakao-sdk'
import { onBeforeMount, ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from '@/store/auth'
import { useLoading } from '@/store/useLoading'
import { Provider } from '@/types/auth'
import delay from '@/utils/delay'
import useStorage from '@/hooks/useStorage'
import useAsync from '@/hooks/useAsync'

const kakaoAccessToken = localStorage.getItem('KAKAO_ACCESS_TOKEN')

export default function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { localStorage } = useStorage()
  const { kakao, initialize } = useKakao()
  const { value } = useLoading()

  function getPersistenceFirebaseUser (providedBy: Provider): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          authStore.saveUserToStore(user, providedBy)
          resolve(true)
        }
        resolve(false)
      })
    })
  }

  async function loginWithKakao () {
    await initialize()
    if (kakaoAccessToken && kakaoAccessToken.length > 0) {
      kakao.value.Auth.setAccessToken(kakaoAccessToken)
    }

    await authStore.fetchKakaoUser()
    await delay(1200)
  }

  onBeforeMount(async () => {
    if (authStore.isAuthenticated) {
      return
    }

    const providedBy = localStorage.getItem<Provider>('provider')
    let success = false
    try {
      if (providedBy === 'Kakao') {
        await useAsync(() => loginWithKakao(), { useAlert: false })
        success = true
      } else if (providedBy === 'Google' || providedBy === 'Github') {
        success = await useAsync(() => getPersistenceFirebaseUser(providedBy))
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
