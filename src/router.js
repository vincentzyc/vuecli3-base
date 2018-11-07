import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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