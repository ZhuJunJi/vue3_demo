<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" v-if="isShow"></component>
		</transition>
	</router-view>
</template>

<script setup lang="ts" name="Main">
	import { ref, watch, nextTick } from 'vue'
	import { useSettingStore } from '@/store/modules/setting'

	let isShow = ref(true)

	const settingStore = useSettingStore()

	watch([() => settingStore.refresh], () => {
		isShow.value = false
		nextTick(() => {
			isShow.value = true
		})
	})
</script>

<style scoped>
	.fade-enter-from {
		opacity: 0;
	}

	.fade-enter-active {
		transition: all 1s;
	}

	.fade-enter-to {
		opacity: 1;
	}
</style>
