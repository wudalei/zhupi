import Vue from 'vue'
import Router from 'vue-router'

//异步路由
const Login = () => import('@/pages/login/login');

Vue.use(Router)

//不需要权限的路由
export const constantRouterMap = [{
  path: '/login',
  name: 'Login',
  component: Login,
  hidden: true
}]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})