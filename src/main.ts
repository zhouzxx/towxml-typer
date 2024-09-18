import { createSSRApp } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.component('TnIcon', TnIcon)
  app.component('TnNavbar', TnNavbar)
  app.component('TnButton', TnButton)

  return {
    app,
  }
}
