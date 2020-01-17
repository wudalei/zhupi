

import { get, post, put, del } from '@/utils/http';

export const user = {
  login: params => post('/user/login', params),//登陆方法
  edit: params => put('/user/edit', params),
}

export const permission = {
  getRolesList: params => get('/user/getUserByJwt', params)
}

//模拟数据
export const mock = {
  login: params => get('/user/loginMock', params),
  getRolesList: params => get('/user/getUserMock', params)
}

//上传方法
export const upload = {
  baseUrl: "https://shop.dyqxss.com",    //服务器基本路径，上传图片需要的参数传往后台
  uploadUrl: 'https://shop.dyqxss.com/adminapi/admin/upload/file', //上传文件接口地址
  customizeUpload: params => post('/upload/file', params), //上传文件接口（测试）
}
export default { user, permission, mock, upload };