<template>
	<div class="logo">
		<el-menu-item index="logo">
			<el-icon><img :src="logo" alt="" /></el-icon>
			<template #title>{{ title }}</template>
		</el-menu-item>
	</div>
</template>

<script setup lang="ts" name="Logo">
	import setting from '@/setting'
	const { title, logo } = setting
</script>

<style scoped lang="scss">
	.logo {
		width: 100%;
		height: $base-logo-height;
		display: flex;
		align-items: center;
		color: white;
		overflow: hidden;
	}
</style>
