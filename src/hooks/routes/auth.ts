import { useAuthStore } from '@/store/auth'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Provider } from '@/types/auth'
import useStorage from '@/hooks/useStorage'
import { useKakao } from 'vue3-kakao-sdk'

const kakaoAccessToken = localStorage.getItem('KAKAO_ACCESS_TOKEN')

export function useAuthentication () {
  return {
    async beforeEnter (before: RouteLocationNormalized, after: RouteLocationNormalized, next: NavigationGuardNext) {
      const authStore = useAuthStore()
      const { getPersistenceFirebaseUser, getPersistenceKakaoUser } = useAuthStore()
      const { localStorage } = useStorage()
      const { kakao, initialize } = useKakao()
      const { isAuthenticated } = storeToRefs(authStore)

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
      } catch {
        next('/auth/login')
      }


      if (isAuthenticated.value) {
        next()
      } else {
        next('/auth/login')
      }
    }
  }
}
