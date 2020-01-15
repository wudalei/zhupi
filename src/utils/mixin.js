
let mixin = {
  data () {
    "use strict";
    return {
      tableContent: [], // 获取的表格内容
      total: 0,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面
      editLoading: false,
      addFormVisible: false, // 新增界面
      addLoading: false,
      detailFormVisible: false, // 详情界面
      detailLoading: false,
      pagination: {
        page: 1,
        page_size: 20,
      },
      para: {
        page_size: 999999
      },
      errorMessage: '系统出错',
      current: 1,
    }
  },
  methods: {
    //打开新增页面
    handleAdd () {
      console.log("走了我");
      this.addFormVisible = true;
    },
    //关闭弹出层
    formClose () {
      this.addFormVisible = this.detailFormVisible = this.editFormVisible = false;
    },
    //打开编辑
    handleEdit () {
      this.editFormVisible = true;
    },
    //打开详情
    handleDetail () {
      this.detailFormVisible = true;
    },
  }
}
const validate = {

}



export default mixin
