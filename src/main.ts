import { createApp } from 'vue'
import { router } from '@/routes'
import { createPinia } from 'pinia'
import { createVueKakaoSdk } from 'vue3-kakao-sdk'
import { createRippleDirective } from 'vue-create-ripple'

import App from './App.vue'

import '@/assets/styles/tailwind.scss'
import '@/assets/styles/main.scss'

createApp(App)
  .directive('ripple',
    createRippleDirective({
      class: 'bg-black opacity-30'
    })
  )
  .use(createPinia())
  .use(createVueKakaoSdk('318af20a7053527c45e06cc36e01aac2'))
  .use(router)
  .mount('#app')
