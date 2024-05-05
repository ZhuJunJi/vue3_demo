import type { PageQuery } from '@/types'

export enum ResourceType {
	MENU = 'MENU',
	BUTTON = 'BUTTON',
	API = 'API',
	DATA = 'DATA',
}

export interface ResourceCreate {
	// 父级编号
	parentId: number
	// 中文名称
	nameZh: string
	// 英文名称
	nameEn: string
	// 排序
	sort: number
	// 路由 path
	path: string
	// 重定向
	redirect: string
	// 资源类型
	type: ResourceType
	// 图标
	icon: string
	// 是否在菜单中显示
	showEnable: boolean
	// 权限标识
	permissionCode: string
	// 备注信息
	remarks: string
}

export interface ResourceUpdate extends ResourceCreate {
	id: number
}

export interface ResourcePageQuery extends PageQuery {
	parentId: number
	permissionCode?: string
	nameLike?: string
}

export interface Resource {
	// 编号
	id: number
	// 父级编号
	parentId: number
	// 中文名称
	nameZh: string
	// 英文名称
	nameEn: string
	// 排序
	sort: number
	// 路由 path
	path: string
	// 重定向
	redirect: string
	// 资源类型
	type: string
	// 图标
	icon: string
	// 是否在菜单中显示
	showEnable: boolean
	// 权限标识
	permissionCode: string
	// 创建者
	createName: string
	// 创建时间
	createTime: string
	// 更新者
	updateName: string
	// 更新时间
	updateTime: string
	// 备注信息
	remarks: string
}
