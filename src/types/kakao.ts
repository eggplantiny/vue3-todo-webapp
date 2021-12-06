import { Kakao } from 'vue3-kakao-sdk'
import ApiResponse = Kakao.API.ApiResponse

export interface KakaoUser {
  nickname: string;
  profile_image: string;
  thumbnail_image: string
}

export interface KakaoResponse<T> extends ApiResponse {
  connected_at: string;
  id: number;
  kakao_account?: object;
  properties: T
}
