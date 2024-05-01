<template>
	<el-card style="width: 100%; min-width: 1000px">
		<template #header>
			<div class="card-header">
				<el-button type="primary" :icon="Plus" @click="openForm({ type: FormType.CREATE })">创建用户</el-button>
			</div>
		</template>
		<el-table class="userTable" max-height="1000" stripe :data="userList">
			<el-table-column prop="username" label="用户名称" min-width="150" fixed />
			<el-table-column prop="nickname" label="昵称" min-width="120" />
			<el-table-column prop="email" label="邮箱" min-width="220" />
			<el-table-column prop="loginIp" label="登录 IP" min-width="120" />
			<el-table-column prop="loginTime" label="登录时间" min-width="180" />
			<el-table-column label="允许登录" min-width="200">
				<template #="{ row }">
					{{ flagToLabel(row.loginFlag) }}
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
						:title="`确定删除用户:` + row.username"
						min-width="200"
						:icon="WarnTriangleFilled"
						@confirm="deleteUser(row.id)"
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

		<FormDrawer ref="formRef" @submitSuccess="pageQuery"></FormDrawer>
	</el-card>
</template>

<script lang="ts" setup name="User">
	import { ref, onMounted, reactive } from 'vue'
	import { Delete, Edit, Plus, Tickets, WarnTriangleFilled } from '@element-plus/icons-vue'
	import { pageQueryApi, deleteUserApi, getUserByIdApi } from '@/api/user'
	import type { User } from '@/api/user/type'
	import { ElNotification } from 'element-plus'
	import { useDebouncedRef } from '@/utils/useDebouncedRef'
	import FormDrawer from './UserForm.vue'
	import { FormType } from '@/types'
	import type { UserFromData } from './index'

	onMounted(async () => {
		pageQuery()
	})

	let currentPage = ref(1)
	let pageSize = ref(10)
	let total = ref(0)

	const disabled = useDebouncedRef(false, 500)

	const userList: Array<User> = reactive([])

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

	// 删除用户
	const deleteUser = (id: number) => {
		loadingWarpper(async () => {
			try {
				await deleteUserApi({ data: { id: id } })
				ElNotification({
					title: 'Success',
					type: 'success',
					message: '删除成功',
				})
				if (userList.length == 1 && currentPage.value > 1) {
					currentPage.value -= 1
				}
				pageQuery()
			} catch (error) {}
		})
	}

	const showDetail = (id: number, type: FormType) => {
		loadingWarpper(async () => {
			try {
				const { data } = await getUserByIdApi({ params: { id: id } })
				if (data) {
					openForm({ type: type, ...data })
				} else {
					ElNotification({
						title: 'Error',
						message: '获取用户详情失败, 用户可能已被删除',
						type: 'error',
					})
					pageQuery()
				}
			} catch (error) {}
		})
	}

	const formRef = ref()
	// 打开表单抽屉
	const openForm = (data: UserFromData) => {
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
			userList.splice(0, userList.length)
			res.data.dataList.forEach((user) => userList.push(user))
		})
	}
</script>

<style scoped lang="scss"></style>
