import serviceAxios from '@/utils/request'
import type { LoginReq, LoginRes, User } from './type'
import type { ApiResult } from '../ApiResult'
import type { AxiosRequestConfig } from 'axios'

enum API {
	LOGIN_URL = '/user/login',
	USERINFO_URL = '/user/info',
}

export const loginApi = (data: LoginReq) => serviceAxios.post<any, ApiResult<LoginRes>>(API.LOGIN_URL, data)

export const getUserInfoApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<User>>(API.USERINFO_URL, config)
