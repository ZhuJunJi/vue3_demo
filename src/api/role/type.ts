import type { PageQuery } from '@/types'

import type { Resource } from '@/api/resource/type'

export interface RoleCreate {
	code: string
	nameZh: string
	nameEn: string
	remarks: string
}

export interface RoleUpdate extends RoleCreate {
	id: number
}

export interface RolePageQuery extends PageQuery {
	code?: string
	nameLike?: string
}

export interface Role {
	// 角色 ID
	id: number
	// 角色编码
	code: string
	// 角色中文名称
	nameZh: string
	// 角色英文名称
	nameEn: string
	// 是否可用
	usable: boolean
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

export interface RoleResource {
	// 角色 ID
	roleId: number
	// 角色中文名称
	roleNameZh: string
	// 角色英文名称
	roleNameEn: string
	// 角色资源列表
	resourceList: Resource[]
}

export interface RoleResourcesBind {
	roleId: number
	resourceIds: number[]
}
