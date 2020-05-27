import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

// import VueBreadcrumbs from 'vue-breadcrumbs'

// Vue.use(VueBreadcrumbs)
Vue.use(Router)
 
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { pageClass: 'home', breadcrumb: 'Covid19' }
    },
  ]

})
