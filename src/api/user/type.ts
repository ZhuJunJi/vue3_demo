import type { PageQuery } from '@/types'

export interface LoginReq {
	username: string
	password: string
}

export interface LoginRes {
	token: string
}

export interface UserCreate {
	username: string
	nickname: string
	email: string
	phone: string
	mobile: string
	photo: string
	remarks: string
}

export interface UserUpdate extends UserCreate {
	id: number
}

export interface UserPageQuery extends PageQuery {
	username?: string
}

export interface User {
	id: number
	username: string
	nickname: string
	email: string
	phone: string
	mobile: string
	photo: string
	loginIp: string
	loginTime: string
	loginFlag: string
	createName: string
	createTime: string
	updateName: string
	updateTime: string
	remarks: string
}
