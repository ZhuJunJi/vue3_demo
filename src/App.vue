<template>
	<div>
		<h3>Hello Vue3</h3>
		<el-button type="primary" :icon="Plus">新增</el-button>
		<el-button type="primary" :icon="Edit">编辑</el-button>
		<SvgIcon name="time" width="100px" height="100px" />
	</div>
</template>

<script setup lang="ts">
	import { Plus, Edit } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss"></style>
