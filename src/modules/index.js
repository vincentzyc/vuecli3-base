import jbPage from './jb-page'; //页面组件
import loading from "./loading"; // loading

const version = '1.0';
const install = function(Vue) {

    if (install.installed) return;

    Vue.component(jbPage.name, jbPage); //注册组件

    Vue.$loading = Vue.prototype.$loading = loading;  //注册全局方法组件

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