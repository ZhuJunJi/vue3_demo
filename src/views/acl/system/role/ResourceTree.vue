<template>
	<el-drawer v-model="drawer" :direction="direction" size="25%" @close="close">
		<el-form
			ref="formRef"
			label-position="left"
			label-width="auto"
			style="max-width: 600px"
			:model="formData"
			class="demo-ruleForm"
		>
			<el-form-item :disabled="true" :label="roleName" prop="roleId"> </el-form-item>
			<el-form-item label="角色资源" prop="resourceIds">
				<el-tree
					ref="treeRef"
					:props="props"
					:data="treeNodeList"
					show-checkbox
					node-key="id"
					:default-checked-keys="checkedKeys"
					:check-strictly="true"
				>
					<template #default="{ node }">
						<span class="custom-tree-node">
							<span>{{ node.label }}</span>
						</span>
					</template>
				</el-tree>
			</el-form-item>
			<el-form-item style="float: right">
				<el-button type="primary" @click="submit">提交</el-button>
			</el-form-item>
		</el-form>
	</el-drawer>
</template>

<script setup lang="ts" name="ResourceTree">
	import { ref, reactive, onMounted } from 'vue'
	import type { DrawerProps, FormInstance } from 'element-plus'
	import { ElNotification, ElTree } from 'element-plus'
	import { TreeNode } from '@/types'
	import { Resource } from '@/api/resource/type'
	import { getTreeListApi } from '@/api/resource'
	import { getRoleResourcesApi, roleResourceBindApi } from '@/api/role'
	import { RoleResourcesBind } from '@/api/role/type'

	const drawer = ref(false)

	const formRef = ref<FormInstance>()

	const treeRef = ref<InstanceType<typeof ElTree>>()

	let roleName = ref('')

	let checkedKeys = ref<number[]>([])

	const direction = ref<DrawerProps['direction']>('rtl')

	const props = {
		label: 'label',
		children: 'childrenList',
		isLeaf: 'leaf',
	}

	let treeNodeList = ref<TreeNode<number, Resource>[]>([])

	const formData = reactive<RoleResourcesBind>({
		roleId: 0,
		resourceIds: [],
	})

	onMounted(async () => {
		const { data } = await getTreeListApi()
		data.forEach((treeNode) => {
			treeNodeList.value.push(treeNode)
		})
	})

	const open = async (roleId: number) => {
		try {
			const { data } = await getRoleResourcesApi({ params: { roleId: roleId } })
			formData.roleId = data.roleId
			roleName.value = data.roleNameEn

			data.resourceList.forEach((resource) => checkedKeys.value.push(resource.id))

			treeRef.value?.setCheckedKeys(checkedKeys.value)
			drawer.value = true
		} catch (error) {
			ElNotification({
				type: 'error',
				message: '获取角色资源列表失败!',
			})
		}
	}

	const close = () => {
		formRef.value?.resetFields()
		roleName.value = ''
		checkedKeys.value.length = 0
		drawer.value = false
	}

	const submit = async () => {
		const checkedNodes = treeRef.value?.getCheckedNodes()

		checkedNodes?.forEach((treeNode) => {
			formData.resourceIds.push(treeNode.value?.id)
		})

		try {
			await roleResourceBindApi(formData)
			// 关闭抽屉
			close()
		} catch (error) {
			ElNotification({
				type: 'error',
				message: error as string,
			})
		}
	}

	defineExpose({ open })
</script>

<style scoped></style>
