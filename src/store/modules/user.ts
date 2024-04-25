import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import type { LoginReq } from '@/api/user/type'
import { reactive } from 'vue'

export const useUserStore = defineStore('User', () => {
	let store = reactive({
		token: localStorage.getItem('TOKEN') || '',
	})

	const login = async (data: LoginReq) => {
		const res = await loginApi(data)

		if (res.code === 0 && res.data) {
			const { token } = res.data
			store.token = token
			localStorage.setItem('TOKEN', token)
			return res.data
		}

		return Promise.reject(res.message)
	}

	const getToken = () => store.token

	return { store, login, getToken }
})
