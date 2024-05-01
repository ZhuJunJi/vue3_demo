<template>
	<el-card style="width: 100%; min-width: 1000px">
		<template #header>
			<div class="card-header">
				<el-button type="primary" :icon="Plus" @click="openForm({ type: FormType.CREATE })">创建角色</el-button>
			</div>
		</template>
		<el-table class="roleTable" max-height="1000" stripe :data="roleList">
			<el-table-column prop="code" label="角色编码" min-width="120" fixed />
			<el-table-column prop="nameZh" label="角色名称（中文）" min-width="180" fixed />
			<el-table-column prop="nameEn" label="角色名称（英文）" min-width="180" fixed />
			<el-table-column label="是否启用" width="100">
				<template #="{ row }">
					{{ flagToLabel(row.usable) }}
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="修改时间" min-width="180" />
			<el-table-column prop="createTime" label="创建时间" min-width="180" />
			<el-table-column label="操作" fixed="right" min-width="180">
				<template #="{ row }">
					<el-button
						link
						type="success"
						:disabled="disabled"
						:icon="Tickets"
						@click="showDetail(row.id, FormType.DETAIL)"
					/>
					<el-button
						link
						type="primary"
						:disabled="disabled"
						:icon="Edit"
						@click="showDetail(row.id, FormType.UPDATE)"
					/>

					<el-popconfirm
						:title="`确定删除角色:` + row.username"
						:icon="WarnTriangleFilled"
						@confirm="deleteRole(row.id)"
					>
						<template #reference>
							<el-button link type="danger" :disabled="disabled" :icon="Delete" @click="visible = true" />
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<template #footer>
			<div class="demo-pagination-block">
				<el-pagination
					v-model:current-page="currentPage"
					v-model:page-size="pageSize"
					:page-sizes="[10, 50, 100]"
					:disabled="disabled"
					layout="prev, pager, next, jumper, ->, sizes, total"
					v-model:total="total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</template>

		<RoleForm ref="formRef" @submitSuccess="pageQuery"></RoleForm>
	</el-card>
</template>

<script lang="ts" setup name="User">
	import { ref, onMounted, reactive } from 'vue'
	import { Delete, Edit, Plus, Tickets, WarnTriangleFilled } from '@element-plus/icons-vue'
	import { pageQueryApi, deleteRoleApi, getRoleByIdApi } from '@/api/role'
	import type { Role } from '@/api/role/type'
	import { ElNotification } from 'element-plus'
	import { useDebouncedRef } from '@/utils/useDebouncedRef'
	import RoleForm from './RoleForm.vue'
	import { FormType } from '@/types'
	import type { RoleFormData } from './index'

	onMounted(async () => {
		pageQuery()
	})

	let currentPage = ref(1)
	let pageSize = ref(10)
	let total = ref(0)

	const disabled = useDebouncedRef(false, 500)

	const roleList: Array<Role> = reactive([])

	const visible = ref(false)

	// pageSize 变更
	const handleSizeChange = (val: number) => {
		pageSize.value = val
		pageQuery()
	}
	// currentPage 变更
	const handleCurrentChange = (val: number) => {
		currentPage.value = val
		pageQuery()
	}

	const flagToLabel = (value: boolean) => (value ? '是' : '否')

	// 删除角色
	const deleteRole = (id: number) => {
		loadingWarpper(async () => {
			try {
				await deleteRoleApi({ data: { id: id } })
				ElNotification({
					title: 'Success',
					type: 'success',
					message: '删除成功',
				})
				if (roleList.length == 1 && currentPage.value > 1) {
					currentPage.value -= 1
				}
				pageQuery()
			} catch (error) {}
		})
	}

	const showDetail = (id: number, type: FormType) => {
		loadingWarpper(async () => {
			try {
				const { data } = await getRoleByIdApi({ params: { id: id } })
				if (data) {
					openForm({ type: type, ...data })
				} else {
					ElNotification({
						title: 'Error',
						message: '获取角色详情失败, 角色可能已被删除',
						type: 'error',
					})
					pageQuery()
				}
			} catch (error) {}
		})
	}

	const formRef = ref()
	// 打开表单抽屉
	const openForm = (data: RoleFormData) => {
		formRef.value.open(data)
	}

	// 列表页面 loading 装饰
	const loadingWarpper = async (fun: Function) => {
		disabled.value = true
		await fun()
		disabled.value = false
	}

	// 分页查询
	const pageQuery = () => {
		loadingWarpper(async () => {
			const res = await pageQueryApi({ pageSize: pageSize.value, pageNumber: currentPage.value })
			currentPage.value = res.data.currentPage
			total.value = res.data.total
			roleList.splice(0, roleList.length)
			res.data.dataList.forEach((role) => roleList.push(role))
		})
	}
</script>

<style scoped lang="scss"></style>
