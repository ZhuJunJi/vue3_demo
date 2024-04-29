import { defineStore } from 'pinia'
import { loginApi, getUserInfoApi } from '@/api/user'
import type { LoginReq } from '@/api/user/type'
import { reactive } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'

export const useUserStore = defineStore('User', () => {
	let store = reactive({
		token: localStorage.getItem('TOKEN') || '',
		username: '',
	})

	const login = async (data: LoginReq) => {
		try {
			const res = await loginApi(data)
			const token = res.data
			store.token = token
			localStorage.setItem('TOKEN', token)
			try {
				await getUserInfo()
				return res.data
			} catch (error) {
				// do nothing
			}
		} catch (error) {
			storeClear()
			return Promise.reject(error)
		}
	}

	const getUserInfo = async (config?: AxiosRequestConfig) => {
		try {
			const res = await getUserInfoApi(config)
			store.username = res.data.username
			return res.data
		} catch (error: any) {
			storeClear()
			ElNotification({
				type: 'error',
				message: error,
			})
			return Promise.reject(error)
		}
	}

	const storeClear = () => {
		store.token = ''
		store.username = ''
		localStorage.removeItem('TOKEN')
	}

	const getToken = () => store.token

	return { store, login, getToken, getUserInfo, storeClear }
})
