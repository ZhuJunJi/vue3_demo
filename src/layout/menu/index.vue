<template>
	<template v-for="menu in menuList" :key="menu.id">
		<el-menu-item :index="menu.id.toString()" v-if="menu.childrenList.length < 1" @click="goRout(menu.path)">
			<el-icon>
				<component :is="menu.icon" v-if="menu.icon"></component>
			</el-icon>
			<template #title>{{ menu.name }}</template>
		</el-menu-item>
		<el-sub-menu :index="menu.id.toString()" v-if="menu.childrenList.length >= 1">
			<template #title>
				<el-icon>
					<component :is="menu.icon" v-if="menu.icon"></component>
				</el-icon>
				<span>{{ menu.name }}</span>
			</template>
			<Menu :menuList="menu.childrenList"></Menu>
		</el-sub-menu>
	</template>
</template>

<script setup lang="ts" name="Menu">
	import { useRouter } from 'vue-router'

	const $router = useRouter()
	defineProps(['menuList'])

	const goRout = (path: string) => {
		$router.push(path)
	}
</script>

<style scoped></style>
