<template>
	<el-select
		v-model="value"
		placeholder="Select icon"
		filterable
		style="width: 240px"
		clearable
		:change="emits('update:modelValue', value)"
	>
		<el-option v-for="icon in icons" :key="icon" :label="icon" :value="icon">
			<div class="flex items-center">
				<el-tag style="margin-right: 8px" size="small">
					<el-icon>
						<component :is="icon" v-if="icon"></component>
					</el-icon>
				</el-tag>
				<span>{{ icon }}</span>
			</div>
		</el-option>
	</el-select>
</template>

<script lang="ts" setup name="IconSelect">
	import { ref } from 'vue'
	import * as ElementPlusIconsVue from '@element-plus/icons-vue'

	const props = defineProps(['modelValue'])

	let value = ref(props.modelValue)

	const emits = defineEmits(['update:modelValue'])

	const icons: string[] = []

	for (const [iconName] of Object.entries(ElementPlusIconsVue)) {
		icons.push(iconName)
	}
</script>

<style scoped></style>
