/*
 * @Description: user单独的状态管理
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-08 11:13:32
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-08 16:10:39
 */

import { getToken, removeToken, setToken } from '../utils/auth'
import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'

const user = {
  state: {
    nickname: "",
    userId: "",
    avatar: 'https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028',
    role: '',
    menus: [],
    permissions: [],
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.nickname = userInfo.nickname;
      state.userId = userInfo.userId;
      state.role = userInfo.roleName;
      state.menus = userInfo.menuList;
      state.permissions = userInfo.permissionList;
    },
    RESET_USER: (state) => {
      state.nickname = "";
      state.userId = "";
      state.role = '';
      state.menus = [];
      state.permissions = [];
    }
  },
  actions: {
    // 获取用户信息
    GetInfo ({ commit, state }, that) {
      return new Promise((resolve, reject) => {
        that.$api.permission.getRolesList().then(data => {
          //储存用户信息
          let userPermission = data.data;
          Cookies.set('user', userPermission);
          commit('SET_USER', userPermission);
          //生成新路由
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            router.addRoutes(store.getters.addRouters);
          })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    // LogOut({commit}) {
    //   return new Promise((resolve) => {
    //     api({
    //       url: "login/logout",
    //       method: "post"
    //     }).then(data => {
    //       commit('RESET_USER')
    //       removeToken()
    //       resolve(data);
    //     }).catch(() => {
    //       commit('RESET_USER')
    //       removeToken()
    //     })
    //   })
    // },
    // FedLogOut({commit}) {
    //   return new Promise(resolve => {
    //     commit('RESET_USER')
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}
export default user
