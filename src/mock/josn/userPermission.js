/*
 * @Description: 
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-08 15:00:34
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-10 16:24:26
 */
export default {
  getUser: () => ({
    createTime: "2019-12-13 10:41:32",
    id: 9,
    loginName: "大隐总管理",
    menuList: ["商城管理", "文化管理", "首页管理", "订单管理", "用户权限", "会员管理", "轮播管理", "店铺管理", "提现管理"],
    password: "$2a$10$G78qmnqpg.Gl7CC1Xb25YuY03x/9Tv6XA.qt3wOITvQn3zpcIhO/e",
    permissionList: (9)["commodity:list", "article:list", "index:list", "order:list", "user:list", "member:list", "carousel:list", "vipShop:list", "withdrawal:list"],
    roleId: 1,
    roleName: "总管理员",
    errorCode: 0,
  }),
  token: () => ({
    code: 0,
    msg: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NzkyNDk0MTIsInN1YiI6IuWkp-makOaAu-euoeeQhiIsImNyZWF0ZWQiOjE1Nzg2NDQ2MTIyMjl9.yn4mnADGQvBKPDlphWjgN-ianGjQ4nsvrGBMNmQNvmwCtEXz-s6Z0YHcpZEmNxJRT_wmaSO34OnGWt8rOCfCrQ",
    userId: "9",
    errorCode: 0,
  })
}