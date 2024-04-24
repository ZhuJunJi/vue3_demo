<template>
	<div class="container">
		<h1>
			<el-link type="success" target="_blank" class="_link">测试vite-plugin-mock（TS版本）</el-link>
		</h1>
		<el-space wrap>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>Create User Test</span>
						<el-button class="button" size="small" type="primary" plain @click="createUser()">Send</el-button>
					</div>
				</template>
				<div v-loading="user.show">{{ user }}</div>
			</el-card>
		</el-space>
	</div>
</template>

<script setup lang="ts" name="App">
	import { reactive } from 'vue'
	import axios from 'axios'

	let user = reactive({
		show: false,
	})

	const createUser = () => {
		user.show = true
		axios
			.post('/api/createUser', {
				name: 'vben',
				gender: 'man',
			})
			.then(({ data }) => {
				Object.assign(user, { ...data })
				user.show = false
			})
	}
</script>

<style scoped>
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	._link {
		font-size: 30px;
	}

	.box-card {
		width: 360px;
	}

	.el-space {
		align-items: flex-start !important;
	}
</style>
