import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useKakao } from 'vue3-kakao-sdk'
import { KakaoUser } from '@/types/kakao'
import { Provider } from '@/types/auth'
import { Nullable } from '@/types/base'
import { AuthProvider, browserSessionPersistence, User, getAuth, signInWithPopup } from 'firebase/auth'
import useAsync from '@/hooks/useAsync'
import { useRouter } from 'vue-router'

export interface IUser {
  nickName?: string;
  profileImage?: string;
  thumbnailImage?: string;
  userId?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser>({
    nickName: '',
    profileImage: '',
    thumbnailImage: '',
    userId: ''
  })

  const isAuthenticated = ref(false)
  const provider = ref<Nullable<Provider>>(null)

  function saveUserToStore (_user: KakaoUser | User, providedBy: Provider) {
    if (providedBy === 'Kakao') {
      _user = _user as KakaoUser
      user.value.nickName = _user.nickname ?? ''
      user.value.profileImage = _user.profile_image ?? ''
      user.value.thumbnailImage = _user.thumbnail_image ?? ''
    } else {
      _user = _user as User
      user.value.userId = _user.uid
      user.value.profileImage = _user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU'
      user.value.thumbnailImage = _user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU'
      user.value.nickName = _user.displayName ?? 'Anonymous'
    }

    isAuthenticated.value = true
    provider.value = providedBy
  }

  async function loginWithFirebase (provider: AuthProvider, providedBy: Provider) {
    const auth = getAuth()
    const userCredential = await useAsync(async () => {
      await auth.setPersistence(browserSessionPersistence)
      return await signInWithPopup(auth, provider)
    })

    saveUserToStore(userCredential.user, providedBy)
  }

  function fetchKakaoUser () {
    const { kakao } = useKakao()

    return new Promise((resolve, reject) => {
      kakao.value.API.request({
        url: '/v2/user/me',
        success (success) {
          saveUserToStore(success.properties, 'Kakao')
          resolve(success.properties)
        },
        fail (error) {
          reject(error)
        }
      })
    })
  }

  async function logout () {
    saveUserToStore({} as KakaoUser, 'Kakao')
    await getAuth().signOut()
    localStorage.clear()
  }

  return {
    user,
    provider,
    isAuthenticated,
    logout,
    saveUserToStore,
    fetchKakaoUser,
    loginWithFirebase
  }
})
