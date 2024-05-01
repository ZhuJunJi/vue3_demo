export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'Login',
	},
	{
		path: '/',
		redirect: '/home',
		component: () => import('@/layout/index.vue'),
		name: 'Layout',
		children: [
			{
				path: '/home',
				component: () => import('@/views/home/index.vue'),
				name: 'Home',
			},
		],
	},
	{
		path: '/404',
		component: () => import('@/views/404/index.vue'),
		name: '404',
	},
	{
		path: '/screen',
		component: () => import('@/views/screen/index.vue'),
		name: 'Screen',
	},
	{
		path: '/system',
		component: () => import('@/layout/index.vue'),
		name: 'System',
		children: [
			{
				path: '/system/user',
				component: () => import('@/views/acl/system/user/index.vue'),
				name: 'User',
			},
			{
				path: '/system/role',
				component: () => import('@/views/acl/system/role/index.vue'),
				name: 'Role',
			},
			{
				path: '/system/resource',
				component: () => import('@/views/acl/system/resource/index.vue'),
				name: 'Resource',
			},
		],
	},
	{
		path: '/product',
		component: () => import('@/layout/index.vue'),
		name: 'Product',
		children: [
			{
				path: '/product/management',
				component: () => import('@/views/acl/product/index.vue'),
				name: 'ProductManagement',
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'Unknow',
	},
]
