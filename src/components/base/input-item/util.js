/* eslint-disable */

export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()

export default {
	// Development environment
	isProd: process.env.NODE_ENV === 'production',

	// Browser environment sniffing

	isAndroid: UA && UA.indexOf('android') > 0,
	isIOS: UA && /iphone|ipad|ipod|ios/.test(UA),

	/* istanbul ignore file */
	noop() {},

	/**
	 * generate random id
	 */
	randomId(prefix = '', length = 8) {
		return `${prefix}-${parseInt(Math.pow(Math.random() * 10, length))}`
	},


	trimValue(value, gap = ' ') {
		value = typeof value === 'undefined' ? '' : value
		const reg = new RegExp(gap, 'g')
		value = value.toString().replace(reg, '')
		return value
	},

	/**
	 * get position of input cursor
	 */
	getCursorsPosition(ctrl) {
		/* istanbul ignore if */
		if (!ctrl) {
			return 0
		}
		let CaretPos = 0 // IE Support
		/* istanbul ignore next */
		if (document.selection) {
			ctrl.focus()
			const Sel = document.selection.createRange()
			Sel.moveStart('character', -ctrl.value.length)
			CaretPos = Sel.text.length
		} else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
			// Firefox support
			CaretPos = ctrl.selectionStart
		}
		return CaretPos
	},

	/**
	 * set position of input cursor
	 */
	setCursorsPosition(ctrl, pos) {
		/* istanbul ignore if */
		if (!ctrl) {
			return
		}
		setTimeout(() => {
			/* istanbul ignore next */
			if (ctrl.setSelectionRange) {
				ctrl.focus()
				ctrl.setSelectionRange(pos, pos)
			} else if (ctrl.createTextRange) {
				const range = ctrl.createTextRange()
				range.collapse(true)
				range.moveEnd('character', pos)
				range.moveStart('character', pos)
				range.select()
			}
		}, 0)
	},


	/**
	 * formate-value
	 */

	formatValueByGapRule(gapRule, value, gap = ' ', range, isAdd = 1) {
		const arr = value ? value.split('') : []
		let showValue = ''
		const rule = []
		gapRule.split('|').some((n, j) => {
			rule[j] = +n + (rule[j - 1] ? +rule[j - 1] : 0)
		})
		let j = 0
		arr.some((n, i) => {
			// Remove the excess part
			if (i > rule[rule.length - 1] - 1) {
				return
			}
			if (i > 0 && i === rule[j]) {
				showValue = showValue + gap + n
				j++
			} else {
				showValue = showValue + '' + n
			}
		})
		let adapt = 0
		rule.some((n, j) => {
			if (range === +n + 1 + j) {
				adapt = 1 * isAdd
			}
		})
		range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
		return { value: showValue, range: range }
	},

	formatValueByGapStep(step, value, gap = ' ', direction = 'right', range, isAdd = 1, oldValue = '') {
		if (value.length === 0) {
			return { value, range }
		}

		const arr = value && value.split('')
		let _range = range
		let showValue = ''

		if (direction === 'right') {
			for (let j = arr.length - 1, k = 0; j >= 0; j--, k++) {
				const m = arr[j]
				showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue
			}
			if (isAdd === 1) {
				// 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
				if (oldValue.length - showValue.length === -2) {
					_range = range + 1
				}
			} else {
				// 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
				if (oldValue.length - showValue.length === 2) {
					_range = range - 1
				}
				// 删除到最开始，range 保持 0
				if (_range <= 0) {
					_range = 0
				}
			}
		} else {
			arr.some((n, i) => {
				showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n
			})
			const adapt = range % (step + 1) === 0 ? 1 * isAdd : 0
			_range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
		}

		return { value: showValue, range: _range }
	}
}