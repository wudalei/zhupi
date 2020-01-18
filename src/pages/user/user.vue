<template>
  <section>
    <!--头部筛选工具条-->
    <filterBar :model="filtersFile"
               :dataConfig="dataConfig"
               :config="filters"
               @handleRefresh="handleRefresh">
      <!--默认时间选择和文本样式，自定义样式如下拉框-->
      <template v-slot:freeSlot="scope">
        <el-select v-model="value"
                   placeholder="请选择食物">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
    </filterBar>

    <!--列表数据-->
    <dataTable :dataSourch="tableContent"
               :dataConfig="dataConfig"
               @selection="selection"
               @handleAdd="handleAdd"
               @handleRemove="handleRemove"
               @handleExceed="handleExceed"
               :btnList="btnList">
      <!--自定义操作按钮-->
      <template v-slot:btn="scope">
        <el-button size="mini"
                   type="primary"
                   @click="handleEdit(scope)"
                   icon="el-icon-edit">修改</el-button>
        <el-button size="mini"
                   icon="el-icon-edit">删除</el-button>
      </template>
    </dataTable>

    <!--底部工具条-->
    <pagination @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
                :total="total"
                :current.sync="current"
                :sels="sels"></pagination>

    <!--编辑界面-->
    <dataForm title="编辑"
              :dataForm="editForm"
              :dataFormRules="editFormRules"
              :formConfig="editConfig"
              :formVisible.sync="editFormVisible"
              @formSubmit="editSubmit"
              @formClose="formClose"></dataForm>

    <!--新增界面-->
    <dataForm title="新增"
              :dataForm="addForm"
              :dataFormRules="addFormRules"
              :formConfig="addConfig"
              :formVisible.sync="addFormVisible"
              @formSubmit="addSubmit"
              :selectData="selectData"
              @formClose="formClose"></dataForm>

  </section>
</template>
<script>
import mixin from '../../utils/mixin'
import dataConfig from './config'
import { export_json_to_excel } from '../../assets/js/Export2Excel'
export default {
  mixins: [mixin],
  data () {
    return {
      btnList: [{ edit: '修改' }, { del: "删除" }, { get: '查看' }],  // 按钮权限
      filtersFile: dataConfig.filtersFile, // 筛选工具条配置
      filters: dataConfig.filters,
      dataConfig: dataConfig.fields, // 数据列表配置
      editFormRules: dataConfig.addFormRules, // 编辑页面配置
      editForm: dataConfig.addForm,
      editConfig: dataConfig.addFields,
      addFormRules: dataConfig.addFormRules, // 新增页面配置  注：新增和编辑字段相同可用一种配置，减少冗余配置。
      addForm: dataConfig.addForm,
      addConfig: dataConfig.addFields,
      options: [{    // 测试下拉框数据
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      },],
      value: '',
      selectData: '',  // 表单中下拉数据
      ids: '',  //批量操作
      datas: ''
    }
  },
  watch: {

  },
  methods: {
    //获取列表数据
    getTableList (page) {
      let para = {
        page: page ? page : this.pagination.page,
        size: this.pagination.page_size,
        loginName: this.filtersFile.loginName
      };
      this.$store.dispatch('tableLoading');
      getUserList(para).then((res) => {
        this.total = res.data.total;
        res.data.records.map(item => {
          item.roleName = item.role.name
        })
        this.tableContent = res.data.records;
        this.$store.dispatch('tableLoading');
      })
    },

    //表单添加
    handleAdd () {
      this.addFormVisible = true; //弹出层
      this.selectData = {
        user: [
          { id: 1, name: '小明' },
          { id: 2, name: '小方' }
        ]
      }  //下拉框数据在弹出层打开之后添加
    },
    addSubmit: function (para) {
      this.$store.dispatch("tableLoading");
      register(para).then(res => {
        this.$store.dispatch("tableLoading");
        if (res.errorCode == 0) {
          this.$message({
            message: res.data,
            type: "success"
          });
          this.addFormVisible = false;
          this.getTableList();
        }
      }).catch(err => {

      })
    },

    //表单数据编辑
    handleEdit (val) {
      this.editForm = val.scope; //获取id后去后台查询这条数据，此为测试示例
      this.editFormVisible = true; //弹出层
    },
    editSubmit: function (para) {
      editUser(para).then(res => {
        if (res.errorCode == 0) {
          this.$message({
            message: res.data,
            type: "success"
          });
          this.editFormVisible = false;
          this.getTableList();
        }
      }).catch(err => { })
    },

    //数据删除
    handleDel: function (index, row) {
      this.$confirm("确认删除该用户吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.id };
        deleteUser(para).then(res => {
          if (res.errorCode == 0) {
            this.$message({
              message: res.data,
              type: "success"
            });
          }
          this.getTableList();
        }).catch(err => { })
      });
    },

    //刷新结果
    handleRefresh () {
      this.getTableList();
    },

    //条数变化
    handleCurrentChange (val) {
      this.pagination.page = val;
      this.getTableList();
    },
    //页数变化
    handleSizeChange (val) {
      this.pagination.page = 1;
      this.pagination.page_size = val;
      setTimeout(() => {
        this.getTableList(1);
      }, 0);
    },

    //批量操作
    selection (val) {
      let list = [];
      this.datas = list.concat(val); //勾选中的数据ids，供批量操作
      this.ids = [];
      val.map(item => {
        this.ids.push(item.id);
      })
    },
    //批量删除
    handleRemove () {
      //todo 上面有批量删除的ids
    },
    //批量导出
    handleExceed () {
      //以下为示例写法
      let para = {
        page: 1,
        size: 9999999,
        orderNo: this.filtersFile.orderNo,
        nicknameStr: this.filtersFile.nicknameStr,
        status: this.filtersFile.status,
        beginTime: this.filtersFile.datetime ? this.filtersFile.datetime[0] : '',
        endTime: this.filtersFile.datetime ? this.filtersFile.datetime[1] : ''
      };
      getOrderList(para).then(res => {
        console.log("res-->", res);
        let titleMap = ["订单号", "会员名", "收货人", "手机号", "详细地址", "订单总价", "订单状态", "创建时间", "支付时间", "确认时间", "发货时间", "完成时间", "取消时间"];
        let keyMap = ["orderNo", "memberName", "name", "mobile", "address", "orderTotal", "status", "createTime", "payTime", "confirmTime", "deliverTime",
          "completeTime", "cancelTime"];
        let dataArray = [];
        res.data.records.map((data, index) => {
          if (index > 0) {
            dataArray.push(titleMap);
          }
          let valueMap = [];
          keyMap.map(item => {
            if (item == "orderStatus") {
              valueMap.push(this.dealStatus(data[item]));
              return;
            }
            valueMap.push(data[item]);
          })
          dataArray.push(valueMap);
          let orderItemList = data.orderItemList;
          dataArray.push(["商品名", "商品价格", "商品规格", "商品数量"]);
          orderItemList.map(orderItem => {
            let goodsInfo = [];
            goodsInfo.push(orderItem.commodityName);
            goodsInfo.push(orderItem.commodityPrice);
            goodsInfo.push(orderItem.commoditySpecs);
            goodsInfo.push(orderItem.commodityNum);
            dataArray.push(goodsInfo);
          })
          dataArray.push([]);
        })
        console.log("titleMap=>", titleMap)
        console.log("dataArray===>", dataArray)
        export_json_to_excel(titleMap, dataArray, "订单")
      })
    }
  },
  mounted () {
    // this.getTableList();
    //假数据
    this.tableContent = [{ "balance": 0, "createTime": "2019-10-22 15:31:52", "id": 1, "loginName": "admin", "password": "$2a$10$7Govz0/qE1KKBQndZwrRM.dG/s6e62HvPio5Z44DnWcOfPQ9IPLvm", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1, "updateTime": "2019-12-24 13:51:23", }, { "balance": 0, "createTime": "2019-10-22 15:31:52", "id": 2, "loginName": "正式股东", "password": "$2a$10$31.HLeug6R/gIFeZDXBwaeQNOeRr3cbQk8E2F8TUOgBCoKhk.JgGK", "role": { "createTime": "2019-12-13 10:49:07", "id": 12, "name": "正式股东" }, "roleId": 12, "updateTime": "2019-12-10 19:39:14" }, { "balance": 0, "createTime": "2019-12-10 19:40:27", "id": 5, "loginName": "正式股东2", "password": "$2a$10$C4aQQ8/qRDeJX99C5dRMR.rnF40AbMaj6awpyqvMo7ixus6O5pPXW", "role": { "createTime": "2019-12-13 10:49:07", "id": 12, "name": "正式股东" }, "roleId": 12 }, { "balance": 0, "createTime": "2019-12-11 11:08:24", "id": 6, "loginName": "编辑者001", "password": "$2a$10$aEUeF9zprzl2D5g.O.XeV.dcSBlpHCQmobBRT9MJ97rymuoJcIn0O", "role": { "createTime": "2019-12-11 11:07:51", "id": 6, "name": "编辑者" }, "roleId": 6 }, { "balance": 0, "createTime": "2019-12-13 10:27:25", "id": 7, "loginName": "大隐财务", "password": "$2a$10$LsTSdyPRaaDPAWWdqZoMserLSIssRrT3Nv3a7CbSqttO6G7hXpGyC", "role": { "createTime": "2019-12-13 10:27:40", "id": 7, "name": "财务" }, "roleId": 7 }, { "balance": 0, "createTime": "2019-12-13 10:36:33", "id": 8, "loginName": "大隐文化运营小娅", "password": "$2a$10$QUzUYvlckk91ZwIp2Gk39etqxG6ALMtuwSPeNuw906YoYAYYo8/Hq", "role": { "createTime": "2019-12-13 10:37:31", "id": 9, "name": "大隐文化运营" }, "roleId": 9 }, { "balance": 0, "createTime": "2019-12-13 10:41:32", "id": 9, "loginName": "大隐总管理", "password": "$2a$10$G78qmnqpg.Gl7CC1Xb25YuY03x/9Tv6XA.qt3wOITvQn3zpcIhO/e", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1 }, { "balance": 0, "createTime": "2019-12-24 13:48:53", "id": 14, "loginName": "大隐新零售运营部张霄健", "password": "$2a$10$DR8clHRVBCvYSf8ixkUpx.i7JPrISoE0Lvuh5oa4LsiVbpJHj0Uzm", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1 }, { "balance": 0, "createTime": "2019-12-24 13:49:15", "id": 15, "loginName": "大隐新零售运营部包细徳", "password": "$2a$10$NJU1Zx18FIAW4uV1ND6SY.cZWMCd8BNApBvJO6zM44sR21dOkjmt6", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1 }]
  }
}
</script>