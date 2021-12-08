
import { onMounted, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useKakao } from 'vue3-kakao-sdk'
import { useAuthStore } from '@/store/auth'
import { Nullable } from '@/types/base'

export default function useKakaoLoginBtn (
  btnRef: Ref<Nullable<HTMLElement>>
) {
  const { kakao, initialize } = useKakao()
  const authStore = useAuthStore()
  const router = useRouter()

  onMounted(async () => {
    await initialize()

    if (!btnRef.value) {
      return
    }

    kakao.value.Auth.createLoginButton({
      container: btnRef.value,
      success (params) {
        const { access_token: accessToken } = params

        kakao.value.Auth.setAccessToken(accessToken)
        localStorage.setItem('KAKAO_ACCESS_TOKEN', accessToken)
        localStorage.setItem('provider', 'Kakao')

        authStore.fetchKakaoUser().then((user) => {
          router.push('/')
        })
      },
      fail (error) {
        console.error(error)
      }
    })
  })
}
