import axios from 'axios'
import { useUserStore } from '@/store/modules/user'
import { router } from '@/router'
import { ElNotification } from 'element-plus'

const serviceAxios = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 2000,
})

serviceAxios.interceptors.request.use(
	(config) => {
		const userStore = useUserStore()
		config.headers.set('Accept-Language', 'zh-CN')
		if (config.url != '/user/login' && userStore.store.token) {
			config.headers.set('Authorization', userStore.store.token)
		}
		return config
	},
	(error) => Promise.reject(error),
)

serviceAxios.interceptors.response.use(
	(response) => {
		const res = response.data
		if (res.code === '0' && res.data) {
			return { ...res }
		}
		return Promise.reject(res.message)
	},
	(error) => {
		if (error.response.status === 401) {
			const userStore = useUserStore()
			userStore.storeClear()
			router.replace({ path: '/login' })
			ElNotification({
				type: 'error',
				message: '登录失效!',
			})
		} else {
			return Promise.reject(error)
		}
	},
)

export default serviceAxios
