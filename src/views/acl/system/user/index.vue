<template>
	<el-card class="userCard">
		<template #header>
			<div class="card-header">
				<el-button type="primary" :icon="Plus" @click="openForm({ type: UserFromType.CREATE })">创建用户</el-button>
			</div>
		</template>
		<el-table class="userTable" max-height="1000" stripe :data="userList">
			<el-table-column prop="username" label="用户名称" width="150" fixed />
			<el-table-column prop="nickname" label="昵称" width="120" />
			<el-table-column prop="email" label="邮箱" width="220" />
			<el-table-column prop="loginIp" label="登录 IP" width="120" />
			<el-table-column prop="loginTime" label="登录时间" width="200" />
			<el-table-column label="允许登录" width="200">
				<template #="{ row }">
					{{ flagToLabel(row.loginFlag) }}
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" label="修改时间" width="200" />
			<el-table-column prop="createTime" label="创建时间" width="150" />
			<el-table-column label="操作" width="200" fixed="right">
				<template #="{ row }">
					<el-button
						link
						type="success"
						:disabled="disabled"
						:icon="Tickets"
						@click="showDetail(row.id, UserFromType.DETAIL)"
					/>
					<el-button
						link
						type="primary"
						:disabled="disabled"
						:icon="Edit"
						@click="showDetail(row.id, UserFromType.UPDATE)"
					/>

					<el-popconfirm
						:title="`确定删除用户:` + row.username"
						width="200"
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
	import { UserFromType } from './index'
	import type { UserFromInterface } from './index'

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
			} catch (error) {
				ElNotification({
					title: 'Error',
					message: error as string,
					type: 'error',
				})
			}
		})
	}

	const showDetail = (id: number, type: UserFromType) => {
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
			} catch (error) {
				ElNotification({
					title: 'Error',
					message: error as string,
					type: 'error',
				})
			}
		})
	}

	const formRef = ref()
	// 打开用户表单抽屉
	const openForm = (data: UserFromInterface) => {
		formRef.value.open(data)
	}

	// 用户列表页面 loading 装饰
	const loadingWarpper = async (fun: Function) => {
		disabled.value = true
		await fun()
		disabled.value = false
	}

	// 分页查询用户列表
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
