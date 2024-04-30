export enum UserFromType {
	CREATE,
	UPDATE,
	DETAIL,
}

export interface UserFromInterface {
	id?: number
	photo?: string
	username?: string
	nickname?: string
	email?: string
	phone?: string
	mobile?: string
	remarks?: string
	type: UserFromType
}
