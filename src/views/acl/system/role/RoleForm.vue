<template>
	<el-drawer v-model="drawer" :direction="direction" size="25%">
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
				<el-form-item label="角色编码" prop="code" :rules="[{ required: true, message: 'code is required' }]">
					<el-input v-model="formData.code" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item
					label="角色名称（中文）"
					prop="nameZh"
					:rules="[{ required: true, message: 'role name is required' }]"
				>
					<el-input v-model="formData.nameZh" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item
					label="角色名称（英文）"
					prop="nameEn"
					:rules="[{ required: true, message: 'role name is required' }]"
				>
					<el-input v-model="formData.nameEn" autocomplete="off" />
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
	import { createRoleApi, updateRoleApi } from '@/api/role'
	import type { RoleCreate, RoleUpdate } from '@/api/role/type'
	import { FormType } from '@/types'
	import type { RoleFormData } from './index'

	const drawer = ref(false)

	const direction = ref<DrawerProps['direction']>('rtl')

	const title = computed(() => computeFormTitle(formData.type))

	const isShowSubmitBtn = computed(() => formData.type != FormType.DETAIL)

	const isDisabled = computed(() => formData.type === FormType.DETAIL)

	function computeFormTitle(op: FormType) {
		switch (op) {
			case FormType.CREATE:
				return '创建角色'
			case FormType.UPDATE:
				return '编辑角色'
			case FormType.DETAIL:
				return '角色详情'
			default:
				throw new Error('wrong form type')
		}
	}

	const formRef = ref<FormInstance>()

	const formData: RoleFormData = reactive({
		type: FormType.CREATE,
		id: undefined,
		code: '',
		nameZh: '',
		nameEn: '',
		usable: undefined,
		remarks: '',
	})

	defineProps(['formData'])

	let loginBtnLoading = useDebouncedRef(false, 1000)

	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return
		formEl.resetFields()
	}

	const emits = defineEmits(['submitSuccess'])

	const submit = () => {
		formRef.value?.validate().then(() => {
			if (formData.type === FormType.CREATE) {
				createRole()
			}
			if (formData.type === FormType.UPDATE) {
				editRole()
			}
		})
	}

	const createRole = () => {
		loginBtnLoading.value = true
		createRoleApi(formData as RoleCreate)
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

	const editRole = () => {
		loginBtnLoading.value = true
		updateRoleApi(formData as RoleUpdate)
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

	const open = (data: RoleFormData) => {
		resetForm(formRef.value)
		Object.assign(formData, data)
		drawer.value = true
	}

	defineExpose({ open })
</script>

<style scoped></style>
