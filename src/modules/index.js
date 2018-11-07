import CubePage from './cube-page'; //页面组件
import CubeView from './cube-view'; //路由嵌套组件
import Loading from "./loading"; // loading

const version = '1.0';
const install = function(Vue) {

    if (install.installed) return;

    Vue.component(CubePage.name, CubePage); //注册组件
    Vue.component(CubeView.name, CubeView); //注册组件

    Vue.$loading = Vue.prototype.$loading = Loading; //注册全局方法组件

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    version
};

/**
 * 使用方法：
 * 1：将modules文件夹复制到项目的src文件夹中
 * 2：在mainjs里引入 
 *    import Components from "./modules";
 *    Vue.use(Components)
 * 3：各组件使用方法请查看各组件的.vue文件的注释
 */