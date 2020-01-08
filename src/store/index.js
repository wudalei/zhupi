import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',     // 存储token
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
  actions
})