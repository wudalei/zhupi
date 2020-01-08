/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import store from '../store/index';
import { Message } from 'element-ui';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://localhost:8108/admin';  //线下
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://shop.dyqxss.com/adminapi/admin'; //线上，大隐后台（测试权限）
}

// 请求超时时间
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('Authorization');
    //请求头加上token
    token && (config.headers.Authorization = token)
    config.params = {
      ...config.params,
      // userId:sessionStorage.getItem("userId"),
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.errorCode == 0) {
        return Promise.resolve(response);
      }
      if (response.data.data.errorCode != 0) {
        Message({
          message: response.data.errorMessage,
          duration: 1500,
          type: 'error'
        })
        return
      }
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录                
        // 未登录则跳转登录页面，并携带当前页面的路径                
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        // 403 token过期                
        // 登录过期对用户进行提示                
        // 清除本地token和清空vuex中token对象                
        // 跳转登录页面                
        case 403:
          console.log("403了")
          Message({
            message: '登录过期，请重新登录',
            duration: 1500,
          });
          // 清除token                    
          localStorage.removeItem('Authorization');
          //store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在                
        case 404:
          Message({
            message: '网络请求不存在',
            duration: 1500,
          });
          break;
        // 其他错误，直接抛出错误提示                
        default:
          Message({
            message: error.response.data.Message,
            duration: 1500,
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/** 
 * delete方法，对应delete请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function del (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
