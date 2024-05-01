<template>
	<router-view v-slot="{ Component }">
		<component :is="Component" v-if="isShow"> </component>
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

<style scoped></style>
