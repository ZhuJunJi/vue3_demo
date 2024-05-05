<template>
	<el-button size="small" :icon="Refresh" circle @click="refresh"></el-button>
	<el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>

	<el-popover
		placement="bottom"
		title="主题设置"
		:width="200"
		trigger="click"
		content="this is content, this is content, this is content"
	>
		<el-form>
			<el-form-item label="主题颜色">
				<el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
			</el-form-item>
			<el-form-item label="暗黑模式">
				<el-switch
					v-model="dark"
					class="mt-2"
					style="margin-left: 24px"
					inline-prompt
					:active-icon="Moon"
					:inactive-icon="Sunny"
					@change="darkSwitch"
				/>
			</el-form-item>
		</el-form>
		<template #reference>
			<el-button size="small" :icon="Setting" circle></el-button>
		</template>
	</el-popover>
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
	import { ref } from 'vue'
	import { FullScreen, Refresh, Setting, Moon, Sunny } from '@element-plus/icons-vue'
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

	const color = ref('rgba(255, 69, 0, 0.68)')
	const predefineColors = ref([
		'#ff4500',
		'#ff8c00',
		'#ffd700',
		'#90ee90',
		'#00ced1',
		'#1e90ff',
		'#c71585',
		'rgba(255, 69, 0, 0.68)',
		'rgb(255, 120, 0)',
		'hsv(51, 100, 98)',
		'hsva(120, 40, 94, 0.5)',
		'hsl(181, 100%, 37%)',
		'hsla(209, 100%, 56%, 0.73)',
		'#c7158577',
	])

	const dark = ref(false)

	const darkSwitch = () => {
		let html = document.documentElement
		html.className = dark.value ? 'dark' : ''
	}
</script>

<style scoped>
	img {
		margin: 0 10px;
		width: 48px;
		height: 48px;
	}
</style>
