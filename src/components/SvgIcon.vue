<template>
	<svg aria-hidden="true" :width="width" :height="height">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script setup lang="ts" name="SvgIcon">
	import { computed } from 'vue'

	const props = defineProps({
		prefix: {
			type: String,
			default: 'icon',
		},
		name: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			default: '#333',
		},
		width: {
			type: String,
			default: '25px',
		},
		height: {
			type: String,
			default: '25px',
		},
	})

	const { prefix, name } = props

	const symbolId = computed(() => `#${prefix}-${name}`)
</script>
