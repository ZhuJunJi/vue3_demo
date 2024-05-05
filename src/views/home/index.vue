<template>
	<el-card style="width: 100%; min-width: 800px">
		<div class="box">
			<el-avatar :size="100" :min-size="100" src="src/assets/images/pom.png" />

			<div style="display: flex">
				<div class="user-info">你好: {{ userStore.store.username }}</div>
			</div>
		</div>
	</el-card>
	<div class="bottom">
		<svg-icon name="welcome" width="100%" height="100%"></svg-icon>
	</div>
</template>

<script setup lang="ts" name="Home">
	import { useUserStore } from '@/store/modules/user'

	const userStore = useUserStore()
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		.user-info {
			margin: auto;
			margin-left: 10px;
		}
	}
	.bottom {
		display: flex;
		justify-content: center;
		height: 80vh;
	}
</style>
