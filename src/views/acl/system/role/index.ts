import { FormType } from '@/types'

export interface RoleFormData {
	id?: number
	code?: string
	nameZh?: string
	nameEn?: string
	usable?: boolean
	remarks?: string
	type: FormType
}
