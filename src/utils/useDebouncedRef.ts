import { customRef } from 'vue'
import { debounce } from 'throttle-debounce'

/**
 * 通用防抖 customerRef
 * @param value 初始值
 * @param delay 延迟时间
 * @param options
 * @returns
 */
export function useDebouncedRef<T>(value: T, delay = 200, options?: { atBegin?: boolean }) {
	return customRef((track, trigger) => {
		// 定义 set 函数
		const set = (newValue: T) => {
			value = newValue
			trigger()
		}
		// set 函数包装防抖
		debounce(delay, set, options)
		return {
			get() {
				track()
				return value
			},
			set: set,
		}
	})
}
