<template>
	<div class="home">Home</div>
</template>

<script setup lang="ts" name="Home">
	import { onMounted } from 'vue'
	import { getUserInfoApi } from '@/api/user'
	import { useUserStore } from '@/store/modules/user'

	const userStore = useUserStore()

	onMounted(() => {
		getUserInfoApi().then(({ data }) => {
			userStore.store.username = data.username
		})
	})
</script>

<style scoped></style>
