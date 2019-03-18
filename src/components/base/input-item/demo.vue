<template>
  <div>
    <h2>适合金融业务场景的输入框组件</h2>
    <jb-input-item title="普通文本" placeholder="普通文本(最大长度5)" :maxlength="5"></jb-input-item>
    <jb-input-item title="禁用表单" value="禁用表单" disabled></jb-input-item>
    <jb-input-item title="只读表单" value="只读表单" readonly></jb-input-item>
    <jb-input-item title="银行卡" type="bankCard" placeholder="bankCard xxxx xxxx xxxx xxxx"></jb-input-item>
    <jb-input-item title="手机号" type="phone" v-model="phone" placeholder="phone xxx xxxx xxxx"></jb-input-item>
    <jb-input-item title="金额" type="money" v-model="money" @keydown="onInputKeydown" @change="onInputChange" placeholder="money xx, xxx.xxxx"></jb-input-item>
    <jb-input-item title="数字" type="digit" v-model="digit" placeholder="digit 0123456789"></jb-input-item>
    <jb-input-item title="密码" type="password" placeholder="password *********"></jb-input-item>
    <jb-input-item title="邮箱" type="email" placeholder="其他标准 html input 类型"></jb-input-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '18866669999',
      money: '',
      digit: ''
    }
  },
  methods: {
    onInputKeydown(event) {
      console.log(`[InputItem keydown] ${event.keyCode}`)
    },
    onInputChange(name, value) {
      console.log(`[InputItem change] ${value}`)
    }
  }
}
</script>
