export interface LoginReq {
	username: string
	password: string
}

export interface LoginRes {
	token: string
}

export interface UserPageQuery {
	username?: string
	pageSize: number
	pageNumber: number
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

export interface PageInfo<T> {
	total: number
	pageSize: number
	currentPage: number
	dataList: Array<T>
}
