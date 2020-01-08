/*
 * @Description: token处理
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-08 11:20:52
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-08 11:21:39
 */

import Cookies from 'js-cookie'

const LoginKey = 'hasLogin'

export function getToken () {
  return Cookies.get(LoginKey);
}

export function setToken (token) {
  return Cookies.set(LoginKey, token)
}

export function removeToken () {
  return Cookies.remove(LoginKey)
}
