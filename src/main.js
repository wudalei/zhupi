
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'hover.css/css/hover.css'
import store from './store/index'
import axios from 'axios';
import Cookies from 'js-cookie';
import '@style/common.scss';
import api from '@/api/api' // 导入api接口
//require('./mock'); //模拟数据

Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.$api = api;

//关闭生产环境消息
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/login');
    return;
  }
  if (to.path === '/login') {
    next();
    return;
  }

  //如果前往的路径是白名单内的,就可以直接前往
  let whiteList = ['/login', '/404']
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    return
  }

  //判断是否登录
  let token = sessionStorage.getItem('Authorization');
  if (token === 'null' || token === '') {
    next('/login');
    return;
  }

  //若缓存没有权限，再次获取权限
  if (!store.getters.role) {
    store.dispatch('GetInfo').then(() => {
      next({ ...to })
    })
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
