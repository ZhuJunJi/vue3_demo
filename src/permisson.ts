import { router } from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { pinia } from './store'
import { useUserStore } from './store/modules/user'
import setting from './setting'

nprogress.configure({ showSpinner: false })

const userStore = useUserStore(pinia)

nprogress.start()
router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
	// 用户未登录进入非登录界面
	if (to.path != '/login' && userStore.store.token === '') {
		next({ path: '/login', query: { redirect: to.path } })
		return
	}
	// 用户已经登录访问登录界面跳转到 home 界面
	if (to.path === '/login' && userStore.store.token != '') {
		next({ path: '/home' })
		return
	}
	// 用户未登录没有用户信息时获取用户信息
	if (to.path != '/login' && userStore.store.username === '') {
		try {
			await userStore.getUserInfo()
			next()
		} catch (error) {
			// 获取用户信息失败跳转到登录界面
			next({ path: '/login', query: { redirect: to.path } })
		}
		return
	}
	next()
})

router.afterEach((to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
	document.title = `${setting.title}-${String(to.name)}`
	nprogress.done()
})
