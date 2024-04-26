import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const serviceAxios = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 2000,
})

serviceAxios.interceptors.request.use(
	(config) => {
		const userStore = useUserStore()
		config.headers.set('Accept-Language', 'zh-CN')
		if (config.url != '/user/login' && userStore.store.token) {
			config.headers.set('Accept-Token', userStore.store.token)
		}
		return config
	},
	(error) => Promise.reject(error),
)

serviceAxios.interceptors.response.use(
	(response) => {
		const data = response.data
		return { ...data }
	},
	(error) => {
		let message = '请求失败'

		ElMessage({
			type: 'error',
			message,
		})

		return Promise.reject(error)
	},
)

export default serviceAxios
