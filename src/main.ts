import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import globalComonet from './components'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import { router } from './router'
import { pinia } from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permisson'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(ElementPlus)

app.use(globalComonet)

app.use(router)

app.use(pinia)

app.mount('#app')
