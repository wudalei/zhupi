<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-04 12:35:48
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-19 11:02:30
 -->
#### y-bbs-admin-web
---
将之前的管理端前端项目进行重构，增加功能，目的为了作为通用模板提升开发效率。
减少冗余代码，组件优化，提高可复用性。规范模块，优化结构。
优化页面样式。
[线上地址](https://www.ysdevelop.cn/project/web/#/login)

功能简介
---
- 界面及动作权限，动态路由添加
- 多级导航菜单，事件总线
- 基于elementui的二次封装，模板使用简单
- vue-cli3简化配置
- 请求的拦截和封装


搭建步骤
---
```
$npm install
```
```
$npm run dev
```

组件参数
---
#### 详情请参照范例 src/page/user/user.vue 用户模块，配置文件参考 src/page/user/config.js

####FilterBar 头部筛选配置文件
| 参数 | 类型 | 默认值 | 描述 |
| :------------ |:---------------:| -----:| -----:|
| label | String | - | 标题名 |
| prop | String | -| 数据对象的属性名 |
| type | String |-| 所选filter组件中的样式，目前通用有input、dateTime、select，特殊样式在插槽中写 |
| key | String | - | 当样式为select，该字段必须有，为对象属性的名称字段 |
| value | String | - | 当样式为select，该字段必须有，为对象属性的id字段 |

####dataTable 表格组件
####参数
| 参数  | 类型  | 默认值 | 描述 |
| :------------ |:---------------:| -----:| -----:|
| dataSourch     | Arrary | - | 表格数据 |
| dataConfig      | String        | -| 表格配置 |
| total | String        |   -| 条数 |
| btnList | String       |   - | 权限动作集合，目前的权限动作，增加数据，导出表格，批量删除 |
####事件
| 参数  | 描述 |
| :------------ |:---------------:|
| selection     | 表格勾选变化，用于批量操作 |
| handleAdd      | 打开添加数据弹出层 |
| handleRemove | 删除       |
| handleExceed | 导出表单       |
| handleSizeChange | 每页条数变化       |
| handleCurrentChange | 页数变化       |
####注：其他动作按钮在插槽位自由编写
####dataForm 表单组件
####参数
| 参数  | 类型  | 默认值 | 描述 |
| :------------ |:---------------:| -----:| -----:|
| editForm     | Arrary | - | 表单数据 |
| editFormRules      | Josn        | -| 表单校验规则配置 |
| editConfig | Josn        |   -| 表单字段配置 |
| editFormVisible | String       |   - |控制表单打开和关闭|
####配置文件
| 参数  | 类型  | 默认值 | 描述 |
| :------------ |:---------------:| -----:| -----:|
| label     | String | - | 标题名 |
| prop      | String        | -| 数据对象的属性名 |
| type | String        |   -| 所选filter组件中的样式，uploadImgBatch、uploadImg、uploadFile、select、datetime、textarea、editor、input特殊样式在插槽中写 |
| key | String       |   - | 当样式为select，该字段必须有，为对象属性的名称字段 |
| value | String       |  - | 当样式为select，该字段必须有，为对象属性的id字段 |
####事件
| 参数  | 描述 |
| :------------ |:---------------:|
| formSubmit     | 表格提交 |
| formClose      | 关闭。有默认公共方法，一般不用重新写 |
####公共参数和方法
部分参数和方法在mixin中已经定义，请参考utils/mixin.js
