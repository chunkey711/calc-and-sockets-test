import Vue from 'vue'
import Router from 'vue-router'
import Calc from './views/Calc.vue'
import Comments from './views/Comments.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/calc'
    },
    {
      path: '/calc',
      name: 'calc',
      component: Calc
    },
    {
      path: '/comments',
      name: 'comments',
      component: Comments
    }
  ]
})
