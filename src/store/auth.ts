import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useKakao } from 'vue3-kakao-sdk'
import { KakaoUser } from '@/types/kakao'
import { Provider } from '@/types/auth'
import { Nullable } from '@/types/base'
import {
  AuthProvider,
  browserSessionPersistence,
  User,
  getAuth,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth'
import useAsync from '@/hooks/useAsync'
import delay from '@/utils/delay'

export interface IUser {
  nickName?: string;
  profileImage?: string;
  thumbnailImage?: string;
  userId?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const userRef = ref<Nullable<IUser>>(null)
  const provider = ref<Nullable<Provider>>(null)
  const isAuthenticated = computed<boolean>(() => userRef.value !== null)

  function saveUserToStore (user: Nullable<KakaoUser | User>, providedBy: Provider) {
    if (!user) {
      userRef.value = null
    }

    if (providedBy === 'Kakao') {
      user = user as KakaoUser

      userRef.value = {
        nickName: user.nickname,
        profileImage: user.profile_image,
        thumbnailImage: user.thumbnail_image,
      }

    } else {
      user = user as User

      userRef.value = {
        userId: user.uid,
        profileImage: user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU',
        thumbnailImage: user.photoURL ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbADKB5OER8mK9MCrkCBFJeXc2pZCGucLNxA&usqp=CAU',
        nickName: user.displayName ?? 'Anonymous',
      }
    }

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
    saveUserToStore(null, 'Kakao')
    await getAuth().signOut()
    localStorage.clear()
  }

  function getPersistenceFirebaseUser (providedBy: Provider): Promise<boolean> {
    return useAsync(() => new Promise(resolve => {
      const auth = getAuth()

      onAuthStateChanged(auth, (user) => {
        if (user) saveUserToStore(user, providedBy)
        resolve(!!user)
      })
    }))
  }

  async function getPersistenceKakaoUser () {
    return useAsync(async () => {
      await fetchKakaoUser()
      await delay(1200)
      return true
    } , {
      useAlert: false
    })
  }

  return {
    user: userRef,
    provider,
    isAuthenticated,
    getPersistenceFirebaseUser,
    getPersistenceKakaoUser,
    logout,
    fetchKakaoUser,
    loginWithFirebase
  }
})
