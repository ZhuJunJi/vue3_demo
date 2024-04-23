import SvgIcon from './SvgIcon.vue'
import { type App } from 'vue'

const globalComponents = { SvgIcon }
export default {
	install(Vue: App) {
		Object.entries(globalComponents).forEach(([componetName, globalComponent]) => {
			Vue.component(componetName, globalComponent)
		})
	},
}
