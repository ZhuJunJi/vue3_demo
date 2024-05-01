import serviceAxios from '@/utils/request'
import type { ResourceCreate, ResourceUpdate, ResourcePageQuery, Resource } from './type'
import type { ApiResult, PageInfo, TreeNode } from '@/types'
import type { AxiosRequestConfig } from 'axios'

enum API {
	BASE_RESOURCE = '/resource',
	RESOURCE_PAGE_QUERY_URL = '/resource/page/list',
	RESOURCE_CHILDREN_LIST = '/resource/children/list',
	RESOURCE_TREE_LIST = '/resource/tree/list',
}

export const createResourceApi = (data: ResourceCreate) =>
	serviceAxios.post<any, ApiResult<boolean>>(API.BASE_RESOURCE, data)

export const updateResourceApi = (data: ResourceUpdate) =>
	serviceAxios.put<any, ApiResult<boolean>>(API.BASE_RESOURCE, data)

export const deleteResourceApi = (config?: AxiosRequestConfig) =>
	serviceAxios.delete<ApiResult<boolean>>(API.BASE_RESOURCE, config)

export const getResourceByIdApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<Resource>>(API.BASE_RESOURCE, config)

export const pageQueryApi = (data: ResourcePageQuery) =>
	serviceAxios.post<any, ApiResult<PageInfo<Resource>>>(API.RESOURCE_PAGE_QUERY_URL, data)

export const getTreeListApi = (config?: AxiosRequestConfig) =>
	serviceAxios.get<any, ApiResult<Array<TreeNode<number, string>>>>(API.RESOURCE_TREE_LIST, config)
