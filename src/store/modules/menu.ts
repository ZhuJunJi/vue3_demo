import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface Menu {
	id: number
	name: string
	childrenList: Array<Menu>
	path: string
	icon?: string
}

export const useMenuStore = defineStore('Menu', () => {
	const menuList: Array<Menu> = [
		{ id: 1, name: '首页', path: '/home', icon: 'HomeFilled', childrenList: [] },
		{
			id: 2,
			name: '系统管理',
			path: '/system',
			icon: 'Setting',
			childrenList: [
				{ id: 3, name: '用户管理', path: '/system/user', icon: '', childrenList: [] },
				{ id: 4, name: '角色管理', path: '/system/role', icon: '', childrenList: [] },
				{ id: 5, name: '权限管理', path: '/system/permisson', icon: '', childrenList: [] },
			],
		},
		{
			id: 6,
			name: '商品管理',
			path: '/product',
			icon: 'Shop',
			childrenList: [{ id: 7, name: '商品管理', path: '/product/management', icon: '', childrenList: [] }],
		},
	]

	let store = reactive({
		menuList: menuList,
	})

	const getMenuList = () => store.menuList

	return { store, getMenuList }
})
