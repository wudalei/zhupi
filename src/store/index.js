
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permission from './permission'

Vue.use(Vuex)


const state = {
  app: {
    sidebar: 0,
  },
  Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',     // 存储token
}

const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  //user
  nickname: state => state.user.nickname,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  role: state => state.user.role,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,
  //权限
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}


const mutations = {
  // 修改token，并将token存入sessionStorage
  changeLogin (state, user) {
    state.Authorization = user.Authorization;
    sessionStorage.setItem('Authorization', user.Authorization);
  },
}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    user,
    permission
  },
  actions,
  getters
})