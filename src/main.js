import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import store from './store/index'
import axios from 'axios';
import Cookies from 'js-cookie'

Vue.use(ElementUI);
//关闭生产环境消息
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
