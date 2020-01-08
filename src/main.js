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
import api from '@/api/api' // 导入api接口

Vue.prototype.$axios = axios
Vue.prototype.$api = api; // 将api挂载到vue上

Vue.use(ElementUI);
//关闭生产环境消息
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  next();
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
