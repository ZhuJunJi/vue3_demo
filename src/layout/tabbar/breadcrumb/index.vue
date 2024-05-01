<template>
	<el-icon style="margin-right: 10px" @click="menuCollapse">
		<component :is="settingStore.isCollapse ? 'Expand' : 'Fold'" />
	</el-icon>
	<el-breadcrumb separator-icon="ArrowRight" style="min-width: 200px">
		<el-breadcrumb-item v-for="route in $route.matched" :key="route.path">{{ route.name }}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
	import { useRoute } from 'vue-router'
	import { useSettingStore } from '@/store/modules/setting'

	const $route = useRoute()

	const settingStore = useSettingStore()

	const menuCollapse = () => {
		settingStore.isCollapse = !settingStore.isCollapse
	}
</script>

<style scoped></style>
