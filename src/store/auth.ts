import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useKakao } from 'vue3-kakao-sdk'
import { Nullable } from '@/types/base'
import { KakaoUser } from '@/types/kakao'

export interface User {
  nickName?: string;
  profileImage?: string;
  thumbnailImage?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({
    nickName: '',
    profileImage: '',
    thumbnailImage: ''
  })

  const isAuthenticated = ref(false)

  function saveUserToStore (_user: KakaoUser) {
    user.value.nickName = _user.nickname
    user.value.profileImage = _user.profile_image
    user.value.thumbnailImage = _user.thumbnail_image
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
    isAuthenticated,
    fetchKakaoUser
  }
})
