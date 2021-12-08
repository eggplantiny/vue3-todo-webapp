import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useKakao } from 'vue3-kakao-sdk'
import { KakaoUser } from '@/types/kakao'
import { Provider } from '@/types/auth'
import { Nullable } from '@/types/base'
import { AuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import useAsync from '@/hooks/useAsync'

export interface User {
  nickName?: string;
  profileImage?: string;
  thumbnailImage?: string;
  userId?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({
    nickName: '',
    profileImage: '',
    thumbnailImage: '',
    userId: ''
  })

  const isAuthenticated = ref(false)
  const provider = ref<Nullable<Provider>>(null)

  function saveUserToStore (_user: KakaoUser) {
    user.value.nickName = _user.nickname
    user.value.profileImage = _user.profile_image
    user.value.thumbnailImage = _user.thumbnail_image
    isAuthenticated.value = true
    provider.value = 'Kakao'
  }

  async function loginWithFirebase (provider: AuthProvider) {
    const auth = getAuth()

    const userCredential = await useAsync(() => signInWithPopup(auth, provider))

    user.value.userId = userCredential.user.uid
    user.value.profileImage = userCredential.user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU'
    user.value.thumbnailImage = userCredential.user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU'
    user.value.nickName = userCredential.user.displayName ?? 'Anonymous'
    isAuthenticated.value = true
  }

  function fetchKakaoUser () {
    const { kakao } = useKakao()

    return new Promise((resolve, reject) => {
      kakao.value.API.request({
        url: '/v2/user/me',
        success (success) {
          saveUserToStore(success.properties)
          resolve(success.properties)
        },
        fail (error) {
          reject(error)
        }
      })
    })
  }

  return {
    user,
    provider,
    isAuthenticated,
    fetchKakaoUser,
    loginWithFirebase
  }
})
