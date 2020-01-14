
import { get, post, put, del } from '@/utils/http';

const user = {
  login: params => post('/user/login', params),
  edit: params => put('/user/edit', params),
}

const permission = {
  getRolesList: params => get('/user/getUserByJwt', params)
}

//模拟数据
const mock = {
  login: params => get('/user/loginMock', params),
  getRolesList: params => get('/user/getUserMock', params)
}

export default { user, permission, mock };