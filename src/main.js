import Vue from "vue";
import "./cube-ui";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import "./assets/css/base.css";
import "./assets/js";
import BaseComponents from "./components/base"; //导入组件库

Vue.config.productionTip = false;

Vue.use(BaseComponents);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");