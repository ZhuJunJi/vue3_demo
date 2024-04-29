<template>
	<el-card class="userCard">
		<template #header>
			<div class="card-header">
				<el-button type="primary" :icon="Plus">创建用户</el-button>
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
				<template #default>
					<el-button link type="primary" size="small"> 详情 </el-button>
					<el-button link type="primary" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<template #footer>
			<div class="demo-pagination-block">
				<el-pagination
					v-model:current-page="currentPage"
					v-model:page-size="pageSize"
					:page-sizes="[1, 10, 50, 100]"
					:small="small"
					:disabled="disabled"
					:background="background"
					layout="prev, pager, next, jumper, ->, sizes, total"
					v-model:total="total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</template>
	</el-card>
</template>

<script lang="ts" setup name="User">
	import { ref, onMounted, reactive } from 'vue'
	import { Plus } from '@element-plus/icons-vue'
	import { pageQueryApi } from '@/api/user'
	import type { User } from '@/api/user/type'
	import FormDrawer from './FormDrawer.vue'

	let currentPage = ref(1)
	let pageSize = ref(10)
	let total = ref(0)
	const small = ref(false)
	const background = ref(false)
	const disabled = ref(false)
	const userList: Array<User> = reactive([])

	const handleSizeChange = (val: number) => {
		pageSize.value = val
		pageQuery()
	}
	const handleCurrentChange = (val: number) => {
		currentPage.value = val
		pageQuery()
	}

	const flagToLabel = (value: boolean) => (value ? '是' : '否')

	onMounted(async () => {
		pageQuery()
	})

	async function pageQuery() {
		const res = await pageQueryApi({ pageSize: pageSize.value, pageNumber: currentPage.value })
		currentPage.value = res.data.currentPage
		total.value = res.data.total
		userList.splice(0, userList.length)
		res.data.dataList.forEach((user) => userList.push(user))
	}
</script>

<style scoped lang="scss"></style>
