
import { get, post, put, del } from '@/utils/http';

const user = {
  Login: params => post('/user/login', params),
  edit: params => put('/user/edit', params),
}

const permission = {
  getRolesList: params => get('/user/getUserByJwt', params)
}

export default { user, permission };