import { get, post, put, del } from '@/utils/http';

const user = {
  Login: params => post('/user/login', params),
  edit: params => put('/user/edit', params)
}
//示例
// const goods = {
//   List: params => get('/goods/list', params),
//   add: params => post('/goods/add', params),
//   edit: params => put('/goods/edit', params),
// }

export default { user };