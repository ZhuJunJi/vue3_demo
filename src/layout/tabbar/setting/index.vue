<template>
	<el-button size="small" :icon="Refresh" circle @click="refresh"></el-button>
	<el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
	<el-button size="small" :icon="Setting" circle></el-button>
	<img src="@/assets/images/pom.png" />
	<el-dropdown>
		<span class="el-dropdown-link">
			{{ userStore.store.username }}
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts" name="Setting">
	import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue'
	import { useSettingStore } from '@/store/modules/setting'
	import { useUserStore } from '@/store/modules/user'
	import { useRouter, useRoute } from 'vue-router'

	const settingStore = useSettingStore()

	const userStore = useUserStore()

	const $router = useRouter()

	const $route = useRoute()

	const fullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			document.documentElement.requestFullscreen()
		}
	}

	const refresh = () => {
		settingStore.refresh = !settingStore.refresh
	}

	const loginOut = () => {
		userStore.storeClear()
		$router.replace({ path: '/login', query: { redirect: $route.path } })
	}
</script>

<style scoped>
	img {
		margin: 0 10px;
		width: 48px;
		height: 48px;
	}
</style>
