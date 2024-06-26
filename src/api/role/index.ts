import serviceAxios from '@/utils/request'
import type { RoleCreate, RoleUpdate, RolePageQuery, Role, RoleResource, RoleResourcesBind } from './type'
import type { ApiResult, PageInfo } from '@/types'
import type { AxiosRequestConfig } from 'axios'

enum API {
	BASE_ROLE = '/role',
	ROLE_PAGE_QUERY_URL = '/role/page/list',
	ROLE_RESOURCES = 'role/resources',
}

export const createRoleApi = (data: RoleCreate) => serviceAxios.post<any, ApiResult<boolean>>(API.BASE_ROLE, data)

export const updateRoleApi = (data: RoleUpdate) => serviceAxios.put<any, ApiResult<boolean>>(API.BASE_ROLE, data)

export const deleteRoleApi = (config?: AxiosRequestConfig) =>
	serviceAxios.delete<ApiResult<boolean>>(API.BASE_ROLE, config)

export const getRoleByIdApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<Role>>(API.BASE_ROLE, config)

export const pageQueryApi = (data: RolePageQuery) =>
	serviceAxios.post<any, ApiResult<PageInfo<Role>>>(API.ROLE_PAGE_QUERY_URL, data)

export const getRoleResourcesApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<RoleResource>>(API.ROLE_RESOURCES, config)

export const roleResourceBindApi = (data: RoleResourcesBind) =>
	serviceAxios.post<any, ApiResult<boolean>>(API.ROLE_RESOURCES, data)
