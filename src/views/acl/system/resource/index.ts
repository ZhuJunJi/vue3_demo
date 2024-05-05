import { FormType } from '@/types'

export interface ResourceFormData {
	id?: number
	// 父级编号
	parentId: number
	// 中文名称
	nameZh?: string
	// 英文名称
	nameEn?: string
	// 排序
	sort?: number
	// 路由 path
	path?: string
	// 重定向
	redirect?: string
	// 资源类型
	type?: string
	// 图标
	icon?: string
	// 是否在菜单中显示
	showEnable?: boolean
	// 权限标识
	permissionCode?: string
	// 备注信息
	remarks?: string
	// 表单类型
	formType: FormType
}
