单行文本输入框，支持特殊场景文本格式化

### 代码演示
<!-- 详见demo.vue -->

### API

#### InputItem Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|type|表单类型，特殊类型自带文本格式化|String|`text`|`text(文本)`,`bankCard(银行卡号)`,`phone(手机号)`,<br/>`money(金额)`,`digit(数字)`,`password(密码)`,<br/>以及其他的标准`Html Input`类型|
|name|表单名称|String|-|事件入参之一，可用于区分表单组件|
|v-model|表单值|String|-|-|
|placeholder|表单占位符|String|-|-|
|maxlength|表单最大字符数|String/Number|-|`phone`类型固定为11|
|readonly|表单是否只读|Boolean|`false`|-|
|disabled|表单是否禁用|Boolean|`false`|-|
|is-formative|表单文本是否根据类型自动格式化|Boolean|`type`为`bankCard`,`phone`, `money`默认为`true`，否则为`false`|-|
|formation|表单文本格式化回调方法|Function(name, curValue, curPos): {value: curValue, range: curPos}|-|传入参数`name`为表单名称，`curValue`为表单值，`curPos`为表单光标当前所在位置<br/>返回参数`value`格式化值, `range`表单光标格式化后所在位置|

#### InputItem Methods

##### focus()
表单获得焦点

##### blur()
表单失去焦点

##### getValue()
获取表单值

#### InputItem Events

##### @focus(name)
表单获得焦点事件

##### @blur(name)
表单失去焦点事件

##### @change(name, value)
表单值变化事件

##### @confirm(name, value)
表单值确认事件， 仅使用金融数字键盘或组件在`form`元素内时有效

##### @keyup(name, event)
表单按键按下事件，仅`is-virtual-keyboard`为`false`时触发

##### @keydown(name, event)
表单按键释放事件，仅`is-virtual-keyboard`为`false`时触发