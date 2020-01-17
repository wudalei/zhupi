var dataConfig = {
  fields: [{
    "label": "用户ID",
    "prop": "id",
    "sortable": false,
    "type": "text",
  }, {
    "label": "登录名",
    "prop": "loginName",
    "sortable": false,
    "type": "text",
  },
  {
    "label": "角色名",
    "prop": "roleName",
    "sortable": false,
    "type": "text",
  },
  {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "创建时间",
    "prop": "createTime",
    "sortable": false,
    "type": "text",
  }, {
    "label": "更新时间",
    "prop": "updateTime",
    "sortable": false,
    "type": "text",
  },],
  showColumn: ["用户ID", "登录名", '角色名', "创建时间", "更新时间"],
  addForm: {
    loginName: "",
    password: "",
    roleId: '',
    user: '',
    imgList: [],
  },
  addFormRules: {
    loginName: [{
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }, {
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: '请输入用户密码',
      trigger: 'blur'
    },
    {
      trigger: 'blur'
    }
    ],
    roleId: [{
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }]
  },
  addFields: [{
    "label": "单图",
    "prop": "loginName",
    "type": "uploadImg",
  }, {
    "label": "用户选择",
    "prop": "user",
    "type": "select",
    "key": 'name',
    "value": 'id',
  }, {
    "label": "富文本",
    "prop": "loginName",
    "type": "editor",
  }, {
    "label": "批量图片",
    "prop": "imgList",
    "type": "uploadImgBatch",
  }, {
    "label": "用户名",
    "prop": "loginName",
    "type": "text",
  }, {
    "label": "密码",
    "prop": "password",
    "type": "password",
  },
  {
    "label": "角色",
    "prop": "roleId",
    "type": "text",
  },],
  filtersFile: {
    loginName: '',
  },
  filters: [{
    type: 'input',
    value: 'loginName',
    labal: '请输入用户名',
    placeholder: '请输入用户名',

  }, {
    type: 'dateTime',
    value: 'loginName',
    labal: '请输入用户名',
    placeholder: '请输入用户名',

  }, {
    type: 'input',
    value: 'name',
    labal: '请输入用户名',
    placeholder: '请输入用户名',

  }, {
    type: 'input',
    value: 'loginName',
    labal: '请输入用户名',
    placeholder: '请输入用户名',

  },],

}

export default dataConfig;
