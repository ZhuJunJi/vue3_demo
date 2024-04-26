<template>
	<div class="login_container">
		<el-row>
			<el-col :span="12" :xs="0"> </el-col>
			<el-col :span="12" :xs="24">
				<el-form
					ref="loginFormRef"
					style="max-width: 600px"
					:model="loginForm"
					:rules="rules"
					class="login_form"
					status-icon
				>
					<el-form-item>
						<h1>Hello Vue3</h1>
					</el-form-item>
					<el-form-item prop="username">
						<el-input :prefix-icon="User" placeholder="admin" v-model="loginForm.username" />
					</el-form-item>
					<el-form-item prop="password">
						<el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password" />
					</el-form-item>
					<el-form-item>
						<el-button class="login_btn" :loading="loginBtnLoading" type="primary" size="default" @click="login"
							>登录</el-button
						>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
	import { User, Lock } from '@element-plus/icons-vue'
	import { ref, reactive } from 'vue'
	import type { LoginReq } from '@/api/user/type'
	import { useUserStore } from '@/store/modules/user'
	import { useRouter, useRoute } from 'vue-router'
	import { ElNotification } from 'element-plus'
	import { useDebouncedRef } from '@/utils/useDebouncedRef'
	import type { FormRules } from 'element-plus'

	const $router = useRouter()
	const $route = useRoute()

	const userStore = useUserStore()

	let loginBtnLoading = useDebouncedRef(false, 1000)

	// 登录表单 ref
	const loginFormRef = ref()

	const loginForm = reactive<LoginReq>({
		username: '',
		password: '',
	})

	const validateUsername = (_rule: any, value: string, callback: Function) => {
		if (value === '') {
			callback(new Error('Please input the Username'))
		} else if (value.length < 3 || value.length > 10) {
			callback(new Error('Length should be 3 to 10'))
		} else {
			callback()
		}
	}

	const rules = reactive<FormRules<LoginReq>>({
		username: [{ validator: validateUsername, trigger: ['change', 'blur'] }],
		password: [
			{ required: true, message: 'Please input Password', trigger: 'blur' },
			{ min: 6, max: 12, message: 'Length should be 6 to 12', trigger: ['change', 'blur'] },
		],
	})

	const login = () => {
		loginFormRef.value
			.validate()
			// 表单校验成功执行登录
			.then(() => {
				loginBtnLoading.value = true
				userStore
					.login(loginForm)
					.then(() => {
						ElNotification({
							type: 'success',
							message: '登录成功',
						})

						$router.push({ path: ($route.query.redirect as string) || '/' })
						loginBtnLoading.value = false
					})
					.catch((error) => {
						ElNotification({
							type: 'error',
							message: error,
						})
						loginBtnLoading.value = false
					})
			})
	}
</script>

<style scoped>
	.login_container {
		width: 100%;
		height: 100vh;
		background: url('@/assets/images/background.jpg');
		background-size: cover;
	}

	.login_form {
		position: relative;
		width: 50%;
		top: 30vh;
		background: url('@/assets/images/login_form.png');
		background-size: cover;
		margin: 0px auto;

		h1 {
			color: white;
			font-size: 20px;
			margin: 20px 0px;
		}

		.login_btn {
			width: 100%;
		}
	}
</style>
