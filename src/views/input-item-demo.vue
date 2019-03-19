<template>
  <base-page type="about-view" title="Input-item">
    <div slot="content">
      <h2>适合金融业务场景的输入框组件</h2>
      <div class="input-item-wrapper">
        <base-input-item class="input-item" title="普通文本" placeholder="普通文本(最大长度5)" :maxlength="5"></base-input-item>
        <base-input-item class="input-item" title="禁用表单" value="禁用表单" disabled></base-input-item>
        <base-input-item class="input-item" title="只读表单" value="只读表单" readonly></base-input-item>
        <base-input-item class="input-item" title="银行卡" type="bankCard" placeholder="bankCard xxxx xxxx xxxx xxxx"></base-input-item>
        <base-input-item class="input-item" title="手机号" type="phone" v-model="phone" placeholder="phone xxx xxxx xxxx"></base-input-item>
        <base-input-item
          class="input-item"
          title="金额"
          type="money"
          v-model="money"
          @keydown="onInputKeydown"
          @change="onInputChange"
          placeholder="money xx, xxx.xxxx"
        ></base-input-item>
        <base-input-item class="input-item" title="数字" type="digit" v-model="digit" placeholder="digit 0123456789"></base-input-item>
        <base-input-item class="input-item" title="密码" type="password" placeholder="password *********"></base-input-item>
        <base-input-item class="input-item" title="邮箱" type="email" placeholder="其他标准 html input 类型"></base-input-item>
        <cube-button :primary="true" @click="$router.back()">back</cube-button>
      </div>
    </div>
  </base-page>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      inputValue: "",
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
<style scoped>
.input-item-wrapper {
  margin-top: 15px;
}
.input-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #333;
}
</style>
