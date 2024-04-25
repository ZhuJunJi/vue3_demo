import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import globalComonet from './components'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import { router } from './router'
import { pinia } from './store'

const app = createApp(App)

app.use(ElementPlus)

app.use(globalComonet)

app.use(router)

app.use(pinia)

app.mount('#app')
