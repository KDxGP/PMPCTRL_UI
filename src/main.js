import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/main.scss'

import App from './App.vue'

const kdxgpTheme = {
  dark: true,
  colors: {
    background: '#FFFFFF'
  }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'kdxgpTheme',
        themes: {
          kdxgpTheme,
        },
    },
  })

const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')
