/*
 * @Description: 路由表
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-04 12:35:47
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-08 15:31:29
 */
import Vue from 'vue'
import Router from 'vue-router'

//异步路由
const login = () => import('@/pages/login/login');
const error = () => import('@/pages/common/404');
const user = () => import('@/pages/user/user');
const role = () => import('@/pages/role/role');
const home = () => import('@/pages/home/home');

Vue.use(Router)

//不需要权限的路由
export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: login,
  hidden: true
},
{ path: '/404', component: error, hidden: true },]

//需要权限的页面（异步路由）
export const asyncRouterMap = [{
  path: '/',
  name: '用户权限',
  component: home,
  iconCls: 'fa fa-user',
  menu: "用户权限",
  children: [{
    path: '/user',
    component: user,
    name: '用户管理'
  },
  {
    path: '/role',
    component: role,
    name: '角色管理'
  }
  ]
}]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})