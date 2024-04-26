export interface LoginReq {
	username: string
	password: string
}

export interface LoginRes {
	token: string
}

export interface User {
	id: number
	username: string
}
