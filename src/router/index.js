/*
 * @Description: 路由表
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-04 12:35:47
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-10 14:42:10
 */
import Vue from 'vue'
import Router from 'vue-router'

//异步路由
const login = () => import('@/pages/login/login');
const error_404 = () => import('@/pages/common/404');
const error_403 = () => import('@/pages/common/404');
const user = () => import('@/pages/user/user');
const role = () => import('@/pages/role/role');
const home = () => import('@/pages/home/home');
const chart = () => import('@/pages/chart/chart');

Vue.use(Router)

//不需要权限的路由
export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: login,
  hidden: true
},
{ path: '/404', component: error_404, hidden: true },
{ path: '/403', component: error_403, hidden: true }]

//需要权限的页面（异步路由）
export const asyncRouterMap = [{
  path: '/chart',
  name: '首页页面',
  component: home,
  iconCls: 'fa fa-pie-chart',
  menu: "首页管理",
  hide: true,
  children: [{
    path: '/chart',
    component: chart,
    name: '首页',
  }]
}, {
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
},]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})