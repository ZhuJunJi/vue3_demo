<template>
	<el-select
		v-model="value"
		placeholder="Select icon"
		filterable
		style="width: 240px"
		clearable
		:change="iconChange(value)"
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

		<template #tag>
			<div v-for="icon in value" :key="icon">
				<el-tag style="margin-right: 8px" size="small">
					<el-icon>
						<component :is="icon" v-if="icon"></component>
					</el-icon>
				</el-tag>
				<span>{{ icon }}</span>
			</div>
		</template>
	</el-select>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import * as ElementPlusIconsVue from '@element-plus/icons-vue'

	const props = defineProps(['value'])

	let value = ref(props.value)

	const icons: string[] = []

	for (const [key] of Object.entries(ElementPlusIconsVue)) {
		icons.push(key)
	}

	const emits = defineEmits(['iconChange'])

	const iconChange = (icon: string) => {
		emits('iconChange', icon)
	}
</script>

<style scoped></style>
