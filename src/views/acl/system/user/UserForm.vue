<template>
	<el-drawer v-model="drawer" :direction="direction" size="25%" @close="formRef?.resetFields()">
		<template #header>
			<h4>{{ title }}</h4>
		</template>
		<!-- 表单 -->
		<template #default>
			<el-form
				ref="formRef"
				label-position="left"
				label-width="auto"
				style="max-width: 600px"
				:model="formData"
				:disabled="isDisabled"
				class="demo-ruleForm"
			>
				<el-form-item hidden v-if="formData.type === FormType.UPDATE" label="id" prop="id">
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
	import type { UserCreate, UserUpdate } from '@/api/user/type'
	import { FormType } from '@/types'
	import type { UserFromData } from './index'

	const drawer = ref(false)

	const direction = ref<DrawerProps['direction']>('rtl')

	const title = computed(() => computeFormTitle(formData.type))

	const isShowSubmitBtn = computed(() => formData.type != FormType.DETAIL)

	const isDisabled = computed(() => formData.type === FormType.DETAIL)

	function computeFormTitle(op: FormType) {
		switch (op) {
			case FormType.CREATE:
				return '创建用户'
			case FormType.UPDATE:
				return '编辑用户'
			case FormType.DETAIL:
				return '用户详情'
			default:
				throw new Error('wrong form type')
		}
	}

	const formRef = ref<FormInstance>()

	const formData: UserFromData = reactive({
		type: FormType.CREATE,
	})

	defineProps(['formData'])

	let loginBtnLoading = useDebouncedRef(false, 1000)

	const emits = defineEmits(['submitSuccess'])

	const submit = () => {
		formRef.value?.validate().then(() => {
			if (formData.type === FormType.CREATE) {
				createUser()
			}
			if (formData.type === FormType.UPDATE) {
				editUser()
			}
		})
	}

	const createUser = () => {
		loginBtnLoading.value = true
		createUserApi(formData as UserCreate)
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
		updateUserApi(formData as UserUpdate)
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

	const open = (data: UserFromData) => {
		Object.assign(formData, data)
		drawer.value = true
	}

	defineExpose({ open })
</script>

<style scoped></style>
