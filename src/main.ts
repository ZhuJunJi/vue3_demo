import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import globalComonet from './components'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(ElementPlus)

app.use(globalComonet)

app.mount('#app')
