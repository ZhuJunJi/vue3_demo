import serviceAxios from '@/utils/request'
import type { LoginReq, UserCreate, User, UserPageQuery } from './type'
import type { ApiResult, PageInfo } from '@/types'
import type { AxiosRequestConfig } from 'axios'

enum API {
	LOGIN_URL = '/user/login',
	USERINFO_URL = '/user/info',
	BASE_USER = '/user',
	USER_PAGE_QUERY_URL = '/user/page/list',
}

export const loginApi = (data: LoginReq) => serviceAxios.post<any, ApiResult<string>>(API.LOGIN_URL, data)

export const getUserInfoApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<User>>(API.USERINFO_URL, config)

export const pageQueryApi = (data: UserPageQuery) =>
	serviceAxios.post<any, ApiResult<PageInfo<User>>>(API.USER_PAGE_QUERY_URL, data)

export const deleteUserApi = (config?: AxiosRequestConfig) =>
	serviceAxios.delete<ApiResult<boolean>>(API.BASE_USER, config)

export const createUserApi = (data: UserCreate) => serviceAxios.post<any, ApiResult<User>>(API.BASE_USER, data)

export const updateUserApi = (data: UserCreate) => serviceAxios.put<any, ApiResult<User>>(API.BASE_USER, data)

export const getUserByIdApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<User>>(API.BASE_USER, config)
