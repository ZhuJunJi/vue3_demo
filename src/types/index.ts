export interface ApiResult<T> {
	code: number
	data: T
	message?: string
}

export interface PageInfo<T> {
	total: number
	pageSize: number
	currentPage: number
	dataList: Array<T>
}

export interface PageQuery {
	pageSize: number
	pageNumber: number
}

export enum FormType {
	CREATE,
	UPDATE,
	DETAIL,
}

export interface TreeNode<I, V> {
	id: I
	pid: I
	label: string
	value: V
	childrenList: Array<TreeNode<I, V>>
	leaf: boolean
}
