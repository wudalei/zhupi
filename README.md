<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-04 12:35:48
 * @LastEditors: wudalei
 * @LastEditTime: 2020-01-10 17:11:24
 -->
#### y-bbs-admin-web
---
将之前的管理端前端项目进行重构，增加功能，目的为了作为通用模板提升开发效率。
减少冗余代码，组件优化，提高可复用性。规范模块，优化结构。
优化页面样式。

简介
---
使用最新的vue-cli3打包，减少了大量配置文件，全部配置都在vue.config.js文件中。
api封装，拦截器优化，在http.js配置环境。(目前测试的是大隐项目的线上后台，仅供权限测试)，在mock->josn文件或者登录后f12查看权限数据结构。
[线上地址](https://www.ysdevelop.cn/project/web/#/login)
```
if (process.env.NODE_ENV == 'development') {
  //axios.defaults.baseURL = 'http://localhost:8108/admin';  //线下
  axios.defaults.baseURL = 'https://shop.dyqxss.com/adminapi/admin'//线上，大隐后台（测试权限）
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://shop.dyqxss.com/adminapi/admin'; //打包的后，正式后台路径
}
```
线上打包地址配置,vue.config.js
```
let dllPublishPath = '/project/web'
```

搭建步骤
---
启动和打包命令和以前没什么区别。

todo
---
页面设计。
组件重构尚未完成，可用原先组件开发。数据传输并不冲突。
