import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/button',
            name: 'button',
            component: () => import('./views/Button.vue')
        }
    ]
})