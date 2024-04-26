<template>
	<div class="tabbar">
		<div class="left">
			<Breadcrumb />
		</div>
		<div class="right">
			<Setting />
		</div>
	</div>
</template>

<script setup lang="ts" name="Tabbar">
	import Breadcrumb from './breadcrumb/index.vue'
	import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
	.tabbar {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;
			margin-left: 10px;
		}

		.right {
			display: flex;
			align-items: center;
		}
	}
</style>
