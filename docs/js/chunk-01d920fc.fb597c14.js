(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01d920fc"],{"25cd":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("base-page",{attrs:{type:"about-view",title:"Input-item"}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("h2",[t._v("适合金融业务场景的输入框组件")]),n("div",{staticClass:"input-item-wrapper"},[n("base-input-item",{staticClass:"input-item",attrs:{title:"普通文本",placeholder:"普通文本(最大长度5)",maxlength:5}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"禁用表单",value:"禁用表单",disabled:""}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"只读表单",value:"只读表单",readonly:""}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"银行卡",type:"bankCard",placeholder:"bankCard xxxx xxxx xxxx xxxx"}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"手机号",type:"phone",placeholder:"phone xxx xxxx xxxx"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"金额",type:"money",placeholder:"money xx, xxx.xxxx"},on:{keydown:t.onInputKeydown,change:t.onInputChange},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"数字",type:"digit",placeholder:"digit 0123456789"},model:{value:t.digit,callback:function(e){t.digit=e},expression:"digit"}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"密码",type:"password",placeholder:"password *********"}}),n("base-input-item",{staticClass:"input-item",attrs:{title:"邮箱",type:"email",placeholder:"其他标准 html input 类型"}}),n("cube-button",{attrs:{primary:!0},on:{click:function(e){return t.$router.back()}}},[t._v("back")])],1)])])},a=[],s={name:"App",data:function(){return{inputValue:"",phone:"18866669999",money:"",digit:""}},methods:{onInputKeydown:function(t){console.log("[InputItem keydown] ".concat(t.keyCode))},onInputChange:function(t,e){console.log("[InputItem change] ".concat(e))}}},o=s,l=(n("e91f"),n("17cc")),p=Object(l["a"])(o,i,a,!1,null,"62b161f2",null);e["default"]=p.exports},"5a82":function(t,e,n){},e91f:function(t,e,n){"use strict";var i=n("5a82"),a=n.n(i);a.a}}]);