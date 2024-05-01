<template>
	<div style="width: 100%; min-width: 1000px">
		<el-row :gutter="20">
			<el-col :span="4">
				<el-card style="min-height: 94.5vh">
					<el-tree :node-click="clikeNode" :props="props" :data="treeNodeList">
						<template #default="{ node, data }">
							<span class="custom-tree-node">
								<span @click="clikeNode(node, data)">{{ node.label }}</span>
							</span>
						</template>
					</el-tree>
				</el-card>
			</el-col>
			<el-col :span="20">
				<el-card style="min-height: 94.5vh">
					<el-table :data="resourceList">
						<el-table-column prop="nameZh" label="资源名称" min-width="120" />
						<el-table-column prop="type" label="资源类型" min-width="120" />
						<el-table-column prop="path" label="Path" min-width="180" />
						<el-table-column prop="sort" label="Sort" min-width="60" />
						<el-table-column prop="icon" label="Icon" min-width="80" />
						<el-table-column prop="showEnable" label="是否展示" min-width="100" />
						<el-table-column prop="permissonCode" label="权限编号" min-width="180" />
						<el-table-column label="操作" fixed="right" min-width="180">
							<template #="{ row }">
								<el-button link type="success" :disabled="disabled" :icon="Tickets" />
								<el-button link type="primary" :disabled="disabled" :icon="Edit" />

								<el-popconfirm :title="`确定删除资源:` + row.nameZh" min-width="180" :icon="WarnTriangleFilled">
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
</template>

<script setup lang="ts" name="Resource">
	import { Delete, Edit, Plus, Tickets, WarnTriangleFilled } from '@element-plus/icons-vue'
	import { ref, onMounted, onUnmounted, reactive } from 'vue'
	import type Node from 'element-plus/es/components/tree/src/model/node'
	import type { Resource, ResourcePageQuery } from '@/api/resource/type'
	import { getTreeListApi, pageQueryApi } from '@/api/resource'
	import { TreeNode } from '@/types'
	import { ElTree } from 'element-plus'
	import { useDebouncedRef } from '@/utils/useDebouncedRef'

	const resourceList = reactive<Resource[]>([])
	const props = {
		id: 'id',
		value: 'value',
		label: 'label',
		children: 'childrenList',
		isLeaf: 'leaf',
	}

	let treeNodeList = ref<TreeNode<number, string>[]>([])

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
			const res = await pageQueryApi(resourcePageQuery)
			resourcePageQuery.pageNumber = res.data.currentPage
			total.value = res.data.total
			resourceList.splice(0, resourceList.length)
			res.data.dataList.forEach((resource) => resourceList.push(resource))
		})
	}

	const clikeNode = (node: Node, data: TreeNode<number, string>) => {
		resourcePageQuery.parentId = data.id
		pageQuery(resourcePageQuery)
	}
</script>

<style scoped>
	.content-card {
		position: static;
		width: 100%;
		min-width: 1000px;
	}
</style>
