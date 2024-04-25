export interface LoginReq {
	username: string
	password: string
}

export interface LoginRes {
	token: string
}

export interface User {
	username: string
	age: number
	address: string
}
