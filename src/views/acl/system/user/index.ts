import { FormType } from '@/types'

export interface UserFromData {
	id?: number
	photo?: string
	username?: string
	nickname?: string
	email?: string
	phone?: string
	mobile?: string
	remarks?: string
	type: FormType
}
