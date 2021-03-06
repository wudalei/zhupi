/*
 * @Description: mock文件
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-08 15:01:08
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-10 16:17:04
 */
import josn from './josn/userPermission'
import Mock from 'mockjs'

//示例格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/user/loginMock', josn.token);
Mock.mock('/user/getUserMock', josn.getUser);
