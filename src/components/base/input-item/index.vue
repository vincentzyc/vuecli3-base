<template>
  <input
    class="md-input-item-input"
    :type="inputType"
    :name="name"
    v-model="inputBindValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="isFormative ? '' : maxlength"
    autocomplete="off"
    @focus="$_onFocus"
    @blur="$_onBlur"
    @keyup="$_onKeyup"
    @keydown="$_onKeydown"
    @input="$_onInput"
  >
</template>

<script>
import Util from './util'

export default {
  name: 'base-input-item',

  props: {
    type: {
      // text, bankCard, password, phone, money, digit
      type: String,
      default: 'text',
    },
    name: {
      type: [String, Number],
      default() {
        return Util.randomId('input-item')
      },
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isFormative: {
      type: Boolean,
      default() {
        const type = this.type
        return type === 'bankCard' || type === 'phone' || type === 'money' || type === 'digit'
      },
    },
    formation: {
      type: Function,
      default: Util.noop,
    },
  },

  data() {
    return {
      inputValue: '',
      inputBindValue: '',
      isInputFocus: false,
    }
  },

  computed: {
    inputType() {
      let inputType = this.type || 'text'
      if (inputType === 'bankCard' || inputType === 'phone' || inputType === 'digit') {
        inputType = 'tel'
      }
      return inputType
    },
    inputMaxLength() {
      if (this.type === 'phone') {
        return 11
      } else {
        return this.maxlength
      }
    }
  },

  watch: {
    value(val) {
      // Filter out two-way binding
      if (val !== this.$_trimValue(this.inputValue)) {
        this.inputValue = this.$_formateValue(this.$_subValue(val + '')).value
      }
    },
    inputValue(val) {
      this.inputBindValue = val
      val = this.isFormative ? this.$_trimValue(val) : val
      this.$emit('input', val)
      this.$emit('change', this.name, val)
    },
    isInputFocus(val) {
      if (val) {
        this.$emit('focus', this.name)
      } else {
        this.$emit('blur', this.name)
      }
    },
  },

  created() {
    this.inputValue = this.$_formateValue(this.$_subValue(this.value + '')).value
  },

  methods: {
    // MARK: private methods
    $_formateValue(curValue, curPos = 0) {
      const type = this.type
      const name = this.name
      const oldValue = this.inputValue
      const isAdd = oldValue.length > curValue.length ? -1 : 1

      let formateValue = { value: curValue, range: curPos }

      // no format
      if (!this.isFormative || curValue === '') {
        return formateValue
      }

      // custom format by user
      const customValue = this.formation(name, curValue, curPos)

      if (customValue) {
        return customValue
      }

      // default format by component
      let gap = ' '
      switch (type) {
        case 'bankCard':
          curValue = this.$_subValue(Util.trimValue(curValue.replace(/\D/g, '')))
          formateValue = Util.formatValueByGapStep(4, curValue, gap, 'left', curPos, isAdd, oldValue)
          break
        case 'phone':
          curValue = this.$_subValue(Util.trimValue(curValue.replace(/\D/g, '')))
          formateValue = Util.formatValueByGapRule('3|4|4', curValue, gap, curPos, isAdd)
          break
        case 'money': {
          gap = ','
          curValue = this.$_subValue(Util.trimValue(curValue.replace(/[^\d.]/g, '')))
          // curValue = curValue.replace(/\D/g, '')
          const dotPos = curValue.indexOf('.')
          // format if no dot or new add dot or insert befor dot
          const moneyCurValue = curValue.split('.')[0]
          const moneyCurDecimal = ~dotPos ? `.${curValue.split('.')[1]}` : ''

          formateValue = Util.formatValueByGapStep(
            3,
            Util.trimValue(moneyCurValue, gap),
            gap,
            'right',
            curPos,
            isAdd,
            oldValue.split('.')[0],
          )
          formateValue.value += moneyCurDecimal
          break
        }
        case 'digit':
          curValue = this.$_subValue(Util.trimValue(curValue.replace(/\D/g, '')))
          formateValue.value = curValue
          break
        default:
          break
      }

      return formateValue
    },
    $_trimValue(val) {
      return Util.trimValue(val, '\\s|,')
    },
    $_subValue(val) {
      const len = this.inputMaxLength
      if (len !== '') {
        return val.substring(0, len)
      } else {
        return val
      }
    },
    $_focusFakeInput() {
      this.isInputFocus = true

      this.$nextTick(() => {
        this.$_addBlurListener()
      })
    },
    $_blurFakeInput() {
      this.isInputFocus = false
      this.$_removeBlurListener()
    },
    $_addBlurListener() {
      document.addEventListener('click', this.$_blurFakeInput, false)
    },
    $_removeBlurListener() {
      document.removeEventListener('click', this.$_blurFakeInput, false)
    },

    // MARK: events handler
    $_onInput(event) {
      const formateValue = this.$_formateValue(
        event.target.value,
        this.isFormative ? Util.getCursorsPosition(event.target) : 0,
      )

      this.inputValue = formateValue.value
      this.inputBindValue = formateValue.value

      if (this.isFormative) {
        this.$nextTick(() => {
          Util.setCursorsPosition(event.target, formateValue.range)
        })
      }
    },
    $_onKeyup(event) {
      this.$emit('keyup', this.name, event)
      if (+event.keyCode === 13 || +event.keyCode === 108) {
        this.$emit('confirm', this.name, this.inputValue)
      }
    },
    $_onKeydown(event) {
      this.$emit('keydown', this.name, event)
    },
    $_onFocus() {
      this.isInputFocus = true
      this.$emit('focus', this.name)
    },
    $_onBlur() {
      this.isInputFocus = false
      this.$emit('blur', this.name)
    },
    $_onFakeInputClick(event) {
      if (this.disabled || this.readonly) {
        return
      }

      this.$_blurFakeInput()

      if (!this.isInputFocus) {
        this.$_focusFakeInput(event)
      }
    },

    // MARK: public methods
    focus() {
      this.$el.querySelector('.md-input-item-input').focus()
    },
    blur() {
      this.$el.querySelector('.md-input-item-input').blur()
    },
    getValue() {
      return this.inputValue
    },
  },
}

</script>
