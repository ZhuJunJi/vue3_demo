<template>
	<div class="layout_container">
		<div class="layout_slider">
			<el-menu class="layout_slider" background-color="#001529" text-color="white" :collapse="settingStore.isCollapse">
				<Logo />
				<Menu :menuList="menuStore.getMenuList()"></Menu>
			</el-menu>
		</div>

		<div class="layout_tabbar" :class="{ collapse: settingStore.isCollapse }">
			<Tabbar></Tabbar>
		</div>
		<div class="layout_main" :class="{ collapse: settingStore.isCollapse }">
			<Main></Main>
		</div>
	</div>
</template>

<script setup lang="ts" name="Layout">
	import Logo from './logo/index.vue'
	import Menu from './menu/index.vue'
	import Main from './main/index.vue'
	import Tabbar from './tabbar/index.vue'
	import { useMenuStore } from '@/store/modules/menu'
	import { useSettingStore } from '@/store/modules/setting'

	const settingStore = useSettingStore()

	const menuStore = useMenuStore()
</script>

<style scoped lang="scss">
	.layout_container {
		width: 100%;
		height: 100vh;
		background-color: white;

		.layout_slider:not(.el-menu--collapse) {
			width: $base-menu-width;
			height: 100vh;
		}

		.el-menu--collapse {
			min-height: 100vh;
			min-width: $base-menu-min-width;
		}

		.layout_tabbar {
			position: fixed;
			top: 0px;
			left: $base-menu-width;
			width: calc(100% - $base-menu-width);
			height: $base-tabbar-height;
			background-color: rgb(216, 202, 190);
			transition-duration: 0.55s;

			&.collapse {
				left: $base-menu-min-width;
				width: calc(100% - $base-menu-min-width);
			}
		}

		.layout_main {
			position: absolute;
			top: $base-tabbar-height;
			left: $base-menu-width;
			width: calc(100% - $base-menu-width);
			height: calc(100vh - $base-tabbar-height);
			background-color: rgb(157, 145, 145);
			padding: 20px;
			overflow: auto;
			transition-duration: 0.55s;

			&.collapse {
				left: $base-menu-min-width;
				width: calc(100% - $base-menu-min-width);
			}
		}
	}
</style>
