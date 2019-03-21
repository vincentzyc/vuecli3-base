import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about.vue")
    },
    {
      path: "/button",
      name: "button",
      component: () => import("./views/button.vue")
    },
    {
      path: "/inputitem",
      name: "inputitem",
      component: () => import("./views/input-item-demo.vue")
    },
    {
			path: '/horizontalpicker',
			name: 'horizontalpicker',
			component: () => import('./views/horizontal-picker')
    }
  ]
});
