<template>
	<div style="width: 100%; min-width: 960px">
		<el-row :gutter="20">
			<el-col :span="4">
				<el-card style="min-height: 92vh">
					<el-tree :node-click="clikeNode" :props="props" :data="treeNodeList">
						<template #default="{ node, data }">
							<el-icon v-if="data.value.icon">
								<component :is="data.value.icon"></component>
							</el-icon>
							<span class="custom-tree-node">
								<span @click="clikeNode(node, data)">{{ node.label }}</span>
							</span>
						</template>
					</el-tree>
				</el-card>
			</el-col>
			<el-col :span="20">
				<el-card style="min-height: 92vh">
					<template #header>
						<div class="card-header">
							<el-button
								type="primary"
								:icon="Plus"
								@click="openForm({ formType: FormType.CREATE, parentId: selectTreeNode?.id || 0 })"
								>创建资源</el-button
							>
						</div>
					</template>
					<el-table :data="resourceList">
						<el-table-column prop="nameZh" label="资源名称" min-width="120" />
						<el-table-column prop="nameEn" label="Resource Name" min-width="200" />
						<el-table-column prop="type" label="资源类型" min-width="120" />
						<el-table-column prop="path" label="Path" min-width="180" />
						<el-table-column prop="sort" label="Sort" min-width="60" />
						<el-table-column prop="icon" label="Icon" min-width="80" />
						<el-table-column prop="showEnable" label="是否展示" min-width="100" />
						<el-table-column prop="permissonCode" label="权限编号" min-width="180" />
						<el-table-column label="操作" fixed="right" min-width="180">
							<template #="{ row }">
								<el-button
									link
									type="success"
									:disabled="disabled"
									@click="showDetail(row.id, FormType.DETAIL)"
									:icon="Tickets"
								/>
								<el-button
									link
									type="primary"
									:disabled="disabled"
									@click="showDetail(row.id, FormType.UPDATE)"
									:icon="Edit"
								/>

								<el-popconfirm
									:title="`确定删除资源:` + row.nameZh"
									width="200"
									:icon="WarnTriangleFilled"
									@confirm="deleteResource(row.id)"
								>
									<template #reference>
										<el-button link type="danger" :disabled="disabled" :icon="Delete" />
									</template>
								</el-popconfirm>
							</template>
						</el-table-column>
					</el-table>
					<template #footer>
						<div class="demo-pagination-block">
							<el-pagination
								v-model:current-page="resourcePageQuery.pageNumber"
								v-model:page-size="resourcePageQuery.pageSize"
								:page-sizes="[10, 50, 100]"
								:disabled="disabled"
								layout="prev, pager, next, jumper, ->, sizes, total"
								v-model:total="total"
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
							/>
						</div>
					</template>
				</el-card>
			</el-col>
		</el-row>
	</div>
	<ResourceForm ref="formRef" @submitSuccess="pageQuery(resourcePageQuery)"></ResourceForm>
</template>

<script setup lang="ts" name="Resource">
	import { Plus, Delete, Edit, Tickets, WarnTriangleFilled } from '@element-plus/icons-vue'
	import { ref, onMounted, reactive } from 'vue'
	import type Node from 'element-plus/es/components/tree/src/model/node'
	import type { Resource, ResourcePageQuery } from '@/api/resource/type'
	import { getTreeListApi, pageQueryApi, getResourceByIdApi, deleteResourceApi } from '@/api/resource'
	import { TreeNode } from '@/types'
	import { ElTree } from 'element-plus'
	import { useDebouncedRef } from '@/utils/useDebouncedRef'
	import ResourceForm from './ResourceFrom.vue'
	import { FormType } from '@/types'
	import { ElNotification } from 'element-plus'
	import { ResourceFormData } from '.'

	const resourceList = reactive<Resource[]>([])
	const props = {
		id: 'id',
		value: 'value',
		label: 'label',
		children: 'childrenList',
		isLeaf: 'leaf',
	}

	let selectTreeNode = ref<Resource | null>()

	let treeNodeList = ref<TreeNode<number, Resource>[]>([])

	onMounted(async () => {
		const { data } = await getTreeListApi()
		data.forEach((treeNode) => {
			treeNodeList.value.push(treeNode)
		})
		pageQuery(resourcePageQuery)
	})

	let total = ref(0)

	const disabled = useDebouncedRef(false, 500)

	// 列表页面 loading 装饰
	const loadingWarpper = async (fun: Function) => {
		disabled.value = true
		await fun()
		disabled.value = false
	}

	// pageSize 变更
	const handleSizeChange = (val: number) => {
		resourcePageQuery.pageSize = val
		pageQuery(resourcePageQuery)
	}
	// currentPage 变更
	const handleCurrentChange = (val: number) => {
		resourcePageQuery.pageNumber = val
		pageQuery(resourcePageQuery)
	}

	const resourcePageQuery = reactive<ResourcePageQuery>({
		pageNumber: 1,
		pageSize: 10,
		parentId: 0,
	})

	// 分页查询
	const pageQuery = (resourcePageQuery: ResourcePageQuery) => {
		loadingWarpper(async () => {
			try {
				const res = await pageQueryApi(resourcePageQuery)
				resourcePageQuery.pageNumber = res.data.currentPage
				total.value = res.data.total
				resourceList.splice(0, resourceList.length)
				res.data.dataList.forEach((resource) => resourceList.push(resource))
			} catch (error) {
				ElNotification({
					title: 'Error',
					message: '分页查询资源列表失败!',
					type: 'error',
				})
			}
		})
	}

	const clikeNode = (_node: Node, data: TreeNode<number, Resource>) => {
		Object.assign(selectTreeNode, data)
		resourcePageQuery.parentId = data.id
		pageQuery(resourcePageQuery)
	}

	// 删除资源
	const deleteResource = (id: number) => {
		loadingWarpper(async () => {
			try {
				await deleteResourceApi({ data: { id: id } })
				ElNotification({
					title: 'Success',
					type: 'success',
					message: '删除成功',
				})
				if (resourceList.length == 1 && resourcePageQuery.pageNumber > 1) {
					resourcePageQuery.pageNumber -= 1
				}
				pageQuery(resourcePageQuery)
			} catch (error) {
				ElNotification({
					title: 'Error',
					type: 'error',
					message: error as string,
				})
			}
		})
	}

	const showDetail = (id: number, formType: FormType) => {
		loadingWarpper(async () => {
			try {
				const { data } = await getResourceByIdApi({ params: { id: id } })
				if (data) {
					openForm({ formType: formType, ...data })
				} else {
					ElNotification({
						title: 'Error',
						message: '获取资源详情失败!',
						type: 'error',
					})
				}
			} catch (error) {
				ElNotification({
					title: 'Error',
					message: '获取资源详情失败!',
					type: 'error',
				})
			}
		})
	}

	const formRef = ref()
	// 打开表单抽屉
	const openForm = (data: ResourceFormData) => {
		formRef.value.open(data)
	}
</script>

<style scoped>
	.content-card {
		position: static;
		width: 100%;
		min-width: 1000px;
	}
</style>
