import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('Setting', () => {
	let isCollapse = ref(false)

	let refresh = ref(false)

	return { isCollapse, refresh }
})
