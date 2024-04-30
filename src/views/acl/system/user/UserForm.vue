<template>
	<el-drawer v-model="drawer" :direction="direction" size="25%">
		<template #header>
			<h4>{{ title }}</h4>
		</template>
		<!-- 表单 -->
		<template #default>
			<el-form
				ref="userFormRef"
				label-position="left"
				label-width="auto"
				style="max-width: 600px"
				:model="formData"
				:disabled="isDisabled"
				class="demo-ruleForm"
			>
				<el-form-item hidden v-if="formData.type === UserFromType.UPDATE" label="id" prop="id">
					<el-input v-model="formData.id" autocomplete="off" />
				</el-form-item>
				<el-form-item label="账号" prop="username" :rules="[{ required: true, message: 'username is required' }]">
					<el-input v-model="formData.username" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item label="昵称" prop="nickname" :rules="[{ required: true, message: 'nickname is required' }]">
					<el-input v-model="formData.nickname" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item
					label="邮件"
					prop="email"
					:rules="[
						{
							type: 'email',
							message: 'Please input correct email addres',
						},
					]"
				>
					<el-input v-model="formData.email" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="formData.phone" autocomplete="off" />
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="formData.mobile" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item label="备注" prop="remarks">
					<el-input v-model="formData.remarks" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item v-if="isShowSubmitBtn" style="float: right">
					<el-button type="primary" @click="submit">提交</el-button>
				</el-form-item>
			</el-form>
		</template>
	</el-drawer>
</template>

<script lang="ts" setup name="FormDrawer">
	import { ref, reactive, computed } from 'vue'
	import type { DrawerProps, FormInstance } from 'element-plus'
	import { ElNotification } from 'element-plus'
	import { useDebouncedRef } from '@/utils/useDebouncedRef'
	import { createUserApi, updateUserApi } from '@/api/user'
	import type { CreateUserReq, UpdateUserReq } from '@/api/user/type'
	import { UserFromType } from './index'
	import type { UserFromInterface } from './index'

	const drawer = ref(false)

	const direction = ref<DrawerProps['direction']>('rtl')

	const title = computed(() => computeFormTitle(formData.type))

	const isShowSubmitBtn = computed(() => formData.type != UserFromType.DETAIL)

	const isDisabled = computed(() => formData.type === UserFromType.DETAIL)

	function computeFormTitle(op: UserFromType) {
		switch (op) {
			case UserFromType.CREATE:
				return '创建用户'
			case UserFromType.UPDATE:
				return '编辑用户'
			case UserFromType.DETAIL:
				return '用户详情'
			default:
				throw new Error('wrong form type')
		}
	}

	const userFormRef = ref<FormInstance>()

	const formData: UserFromInterface = reactive({
		type: UserFromType.CREATE,
	})

	defineProps(['formData'])

	let loginBtnLoading = useDebouncedRef(false, 1000)

	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
	}

	const emits = defineEmits(['submitSuccess'])

	const submit = () => {
		userFormRef.value?.validate().then(() => {
			if (formData.type === UserFromType.CREATE) {
				createUser()
			}
			if (formData.type === UserFromType.UPDATE) {
				editUser()
			}
		})
	}

	const createUser = () => {
		loginBtnLoading.value = true
		createUserApi(formData as CreateUserReq)
			.then(() => {
				ElNotification({
					type: 'success',
					message: '创建成功',
				})
				emits('submitSuccess')
				loginBtnLoading.value = false
				drawer.value = false
			})
			.catch((error) => {
				ElNotification({
					type: 'error',
					message: error,
				})
				loginBtnLoading.value = false
			})
	}

	const editUser = () => {
		loginBtnLoading.value = true
		updateUserApi(formData as UpdateUserReq)
			.then(() => {
				ElNotification({
					type: 'success',
					message: '编辑成功',
				})
				emits('submitSuccess')
				loginBtnLoading.value = false
				drawer.value = false
			})
			.catch((error) => {
				ElNotification({
					type: 'error',
					message: error,
				})
				loginBtnLoading.value = false
			})
	}

	const open = (data: UserFromInterface) => {
		resetForm(userFormRef.value)
		Object.assign(formData, data)
		drawer.value = true
	}

	defineExpose({ open, UserFromType })
</script>

<style scoped>
	.avatar-uploader .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 64px;
		height: 64px;
		text-align: center;
	}
</style>
