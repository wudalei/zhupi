
import { get, post, put, del } from '@/utils/http';

export const baseUrl = ""
export const uploadImg = ''

export const user = {
  login: params => post('/user/login', params),
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
export const upload = {
  customizeUpload: params => get('', params),
}
export default { user, permission, mock, baseUrl };