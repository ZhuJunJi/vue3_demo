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
				<el-form-item hidden v-if="formData.formType === FormType.UPDATE" label="id" prop="id">
					<el-input v-model="formData.id" autocomplete="off" />
				</el-form-item>
				<el-form-item
					label="资源名称"
					prop="nameZh"
					:rules="[{ required: true, message: 'resource name is required' }]"
				>
					<el-input v-model="formData.nameZh" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item
					label="Resource Name"
					prop="nameEn"
					:rules="[{ required: true, message: 'resource name is required' }]"
				>
					<el-input v-model="formData.nameEn" autocomplete="off" />
				</el-form-item>
				<el-form-item
					label="权限标识"
					prop="permissionCode"
					:rules="[{ required: true, message: 'Permission code is required' }]"
				>
					<el-input v-model="formData.permissionCode" autocomplete="off" />
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="formData.type" placeholder="Select Resource Type" filterable style="width: 240px">
						<el-option
							v-for="resourceType in resourceTypes"
							:key="resourceType.value"
							:label="resourceType.label"
							:value="resourceType.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="序号" prop="sort">
					<el-input v-model="formData.sort" type="number" autocomplete="off" />
				</el-form-item>
				<el-form-item label="路由" prop="path">
					<el-input v-model="formData.path" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item label="重定向" prop="redirect">
					<el-input v-model="formData.redirect" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item label="Icon" prop="icon">
					<IconSelect v-model="formData.icon" />
				</el-form-item>
				<el-form-item label="是否展示" prop="showEnable">
					<el-radio-group v-model="formData.showEnable" class="ml-4">
						<el-radio :value="true" size="large">展示</el-radio>
						<el-radio :value="false" size="large">隐藏</el-radio>
					</el-radio-group>
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
	import { createResourceApi, updateResourceApi } from '@/api/resource'
	import { ResourceType, type ResourceCreate, type ResourceUpdate } from '@/api/resource/type'
	import { FormType } from '@/types'
	import type { ResourceFormData } from './index'
	import IconSelect from './IconSelect.vue'

	const resourceTypes: { value: ResourceType; label: string }[] = [
		{ value: ResourceType.MENU, label: '菜单' },
		{ value: ResourceType.BUTTON, label: '按钮' },
		{ value: ResourceType.API, label: 'API' },
		{ value: ResourceType.DATA, label: '数据' },
	]

	const drawer = ref(false)

	const direction = ref<DrawerProps['direction']>('rtl')

	const title = computed(() => computeFormTitle(formData.formType))

	const isShowSubmitBtn = computed(() => formData.formType != FormType.DETAIL)

	const isDisabled = computed(() => formData.formType === FormType.DETAIL)

	function computeFormTitle(op: FormType) {
		switch (op) {
			case FormType.CREATE:
				return '创建资源'
			case FormType.UPDATE:
				return '编辑资源'
			case FormType.DETAIL:
				return '资源详情'
			default:
				throw new Error('wrong form type')
		}
	}

	const formRef = ref<FormInstance>()

	const formData: ResourceFormData = reactive({
		formType: FormType.CREATE,
		parentId: 0,
		nameZh: '',
		nameEn: '',
		sort: 0,
		path: '',
		redirect: '',
		type: ResourceType.MENU,
		icon: '',
		showEnable: true,
		permissionCode: '',
		remarks: '',
	})

	defineProps(['formData'])

	let loginBtnLoading = useDebouncedRef(false, 1000)

	const emits = defineEmits(['submitSuccess'])

	const submit = () => {
		formRef.value?.validate().then(() => {
			if (formData.formType === FormType.CREATE) {
				createRole()
			}
			if (formData.formType === FormType.UPDATE) {
				editRole()
			}
		})
	}

	const createRole = () => {
		loginBtnLoading.value = true
		createResourceApi(formData as ResourceCreate)
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
		updateResourceApi(formData as ResourceUpdate)
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

	const open = (data: ResourceFormData) => {
		Object.assign(formData, data)
		drawer.value = true
	}

	defineExpose({ open })
</script>

<style scoped></style>
