import Vue from 'vue'
import './cube-ui'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/css/base.css';
// import './assets/css/main.css';
import Api from './assets/js/api';
import BaseComponents from "./components/base"; //导入组件库

Vue.config.productionTip = false

Vue.use(Api)
Vue.use(BaseComponents)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')