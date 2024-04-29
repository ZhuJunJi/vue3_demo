import serviceAxios from '@/utils/request'
import type { LoginReq, User, UserPageQuery, PageInfo } from './type'
import type { ApiResult } from '../ApiResult'
import type { AxiosRequestConfig } from 'axios'

enum API {
	LOGIN_URL = '/user/login',
	USERINFO_URL = '/user/info',
	USER_PAGE_QUERY_URL = '/user/page/list',
}

export const loginApi = (data: LoginReq) => serviceAxios.post<any, ApiResult<string>>(API.LOGIN_URL, data)

export const getUserInfoApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<User>>(API.USERINFO_URL, config)

export const pageQueryApi = (data: UserPageQuery) =>
	serviceAxios.post<any, ApiResult<PageInfo<User>>>(API.USER_PAGE_QUERY_URL, data)
