<template>
  <section>
    <!--头部筛选工具条-->
    <filterBar :model="filtersFile"
               :dataConfig="dataConfig"
               :config="filters"
               :selectData="selectData"
               @handleRefresh="handleRefresh"></filterBar>

    <!--列表数据-->
    <dataTable :dataSourch="tableContent"
               :dataConfig="dataConfig"
               :btnList="btnList">
      <template v-slot:btn>
        <el-button size="mini"
                   type="primary"
                   @click="handleEdit"
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

    <!--新增界面-->
    <dataForm title="新增"
              :dataForm="addForm"
              :dataFormRules="addFormRules"
              labelWidth="150px"
              :formConfig="addConfig"
              :formVisible.sync="addFormVisible"
              @formSubmit="addSubmit"
              @formClose="formClose"></dataForm>

    <!--编辑界面-->
    <dataForm title="编辑"
              :dataForm="editForm"
              :dataFormRules="editFormRules"
              labelWidth="150px"
              :formConfig="editConfig"
              :formVisible.sync="editFormVisible"
              @formSubmit="editSubmit"
              @formClose="formClose"></dataForm>
  </section>
</template>
<script>
import mixin from '../../utils/mixin'
import dataConfig from './config'
export default {
  mixins: [mixin],
  data () {
    return {
      // 按钮权限
      btnList: [{ edit: '修改' }, { del: "删除" }, { get: '查看' }],
      // 筛选工具条配置
      filtersFile: dataConfig.filtersFile,
      filters: dataConfig.filters,
      // 数据列表配置
      dataConfig: dataConfig.fields,
      // 编辑页面配置
      editFormRules: dataConfig.addFormRules,
      editForm: dataConfig.addForm,
      editConfig: dataConfig.addFields,
      // 新增页面配置
      addFormRules: dataConfig.addFormRules,
      addForm: dataConfig.addForm,
      addConfig: dataConfig.addFields,
      // 下拉框数据
      selectData: {
        name: [{ id: '1' }],
        roleId: []
      }
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
    //数据编辑
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
    //翻页
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
  },
  mounted () {
    // this.getTableList();
    console.log("mixins", [mixin])
    //假数据
    this.tableContent = [{ "balance": 0, "createTime": "2019-10-22 15:31:52", "id": 1, "loginName": "admin", "password": "$2a$10$7Govz0/qE1KKBQndZwrRM.dG/s6e62HvPio5Z44DnWcOfPQ9IPLvm", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1, "updateTime": "2019-12-24 13:51:23", }, { "balance": 0, "createTime": "2019-10-22 15:31:52", "id": 2, "loginName": "正式股东", "password": "$2a$10$31.HLeug6R/gIFeZDXBwaeQNOeRr3cbQk8E2F8TUOgBCoKhk.JgGK", "role": { "createTime": "2019-12-13 10:49:07", "id": 12, "name": "正式股东" }, "roleId": 12, "updateTime": "2019-12-10 19:39:14" }, { "balance": 0, "createTime": "2019-12-10 19:40:27", "id": 5, "loginName": "正式股东2", "password": "$2a$10$C4aQQ8/qRDeJX99C5dRMR.rnF40AbMaj6awpyqvMo7ixus6O5pPXW", "role": { "createTime": "2019-12-13 10:49:07", "id": 12, "name": "正式股东" }, "roleId": 12 }, { "balance": 0, "createTime": "2019-12-11 11:08:24", "id": 6, "loginName": "编辑者001", "password": "$2a$10$aEUeF9zprzl2D5g.O.XeV.dcSBlpHCQmobBRT9MJ97rymuoJcIn0O", "role": { "createTime": "2019-12-11 11:07:51", "id": 6, "name": "编辑者" }, "roleId": 6 }, { "balance": 0, "createTime": "2019-12-13 10:27:25", "id": 7, "loginName": "大隐财务", "password": "$2a$10$LsTSdyPRaaDPAWWdqZoMserLSIssRrT3Nv3a7CbSqttO6G7hXpGyC", "role": { "createTime": "2019-12-13 10:27:40", "id": 7, "name": "财务" }, "roleId": 7 }, { "balance": 0, "createTime": "2019-12-13 10:36:33", "id": 8, "loginName": "大隐文化运营小娅", "password": "$2a$10$QUzUYvlckk91ZwIp2Gk39etqxG6ALMtuwSPeNuw906YoYAYYo8/Hq", "role": { "createTime": "2019-12-13 10:37:31", "id": 9, "name": "大隐文化运营" }, "roleId": 9 }, { "balance": 0, "createTime": "2019-12-13 10:41:32", "id": 9, "loginName": "大隐总管理", "password": "$2a$10$G78qmnqpg.Gl7CC1Xb25YuY03x/9Tv6XA.qt3wOITvQn3zpcIhO/e", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1 }, { "balance": 0, "createTime": "2019-12-24 13:48:53", "id": 14, "loginName": "大隐新零售运营部张霄健", "password": "$2a$10$DR8clHRVBCvYSf8ixkUpx.i7JPrISoE0Lvuh5oa4LsiVbpJHj0Uzm", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1 }, { "balance": 0, "createTime": "2019-12-24 13:49:15", "id": 15, "loginName": "大隐新零售运营部包细徳", "password": "$2a$10$NJU1Zx18FIAW4uV1ND6SY.cZWMCd8BNApBvJO6zM44sR21dOkjmt6", "role": { "createTime": "2019-11-26 16:16:09", "id": 1, "name": "总管理员", "updateTime": "2019-11-26 16:16:12" }, "roleId": 1 }]
  }
}
</script>