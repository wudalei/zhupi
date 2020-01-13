<template>
  <div>
    <el-table stripe
              :data="dataSourch"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              highlight-current-row
              v-loading="$store.state.listLoading"
              @selection-change="selsChange"
              style="width: 100%; padding: 0;"
              @sort-change="handleSort"
              border
              :header-cell-style="tableHeaderColor">
      <el-table-column type="selection"
                       width="40"
                       align="center"></el-table-column>
      <el-table-column type="expand"
                       v-if="showMore">
        <template slot-scope="props">
          <img @click="certificateFull(props.row.certificate)"
               style="height: 200px;"
               :src="props.row.certificate" />
        </template>
      </el-table-column>
      <el-table-column type="index"
                       label="序号"
                       width="60"
                       align="center"></el-table-column>
      <el-table-column v-for="(item,index) in dataConfig"
                       :key="index"
                       :label="item.label"
                       :prop="item.prop"
                       :sortable="item.sortable"
                       :width="item.width"
                       show-overflow-tooltip
                       v-if="showColumn(item.label)&&item.type==='nameText'">
      </el-table-column>
      <el-table-column align="center"
                       :width="item.width"
                       v-for="(item,index) in dataConfig"
                       :key="index"
                       :label="item.label"
                       :prop="item.prop"
                       :sortable="item.sortable"
                       show-overflow-tooltip
                       v-if="showColumn(item.label)&&item.type!=='nameText'">
        <template slot-scope="scope">
          <el-tag v-if="showColumn(item.label)&&item.type==='sex'"
                  :type="scope.row[item.prop]=='男' ? 'primary' : scope.row[item.prop]=='女' ?'danger':'success' ">{{scope.row[item.prop]}}</el-tag>
          <el-tag v-else-if="showColumn(item.label)&&item.type==='choice3'"
                  :type="scope.row[item.prop]==0 ? 'primary' : 'success' ">{{item.formatter(scope.row)}}</el-tag>
          <el-tag v-else-if="showColumn(item.label)&&item.type==='status'"
                  :type="scope.row[item.prop]=='待处理' ? 'primary' : scope.row[item.prop]=='已同意' ?'success':'danger' ">{{scope.row[item.prop]}}</el-tag>
          <el-tag v-else-if="showColumn(item.label)&&item.type==='isLove'"
                  :type="scope.row[item.prop]=='1' ? 'primary' : 'danger'">{{item.dealType(scope.row[item.prop])}}</el-tag>
          <el-tag v-else-if="showColumn(item.label)&&item.type==='type'"
                  :type="scope.row[item.prop]=='隐藏' ? 'danger' : scope.row[item.prop]=='显示' ?'primary':'success' ">{{scope.row[item.prop]}}</el-tag>
          <el-tag v-else-if="showColumn(item.label)&&item.type==='orderStatus'"
                  :type="scope.row[item.prop]=='未付款' ? 'info' : scope.row[item.prop]=='待发货' ?'warning':scope.row[item.prop]=='待收货' ?'primary':scope.row[item.prop]=='已完成' ?'success':scope.row[item.prop]=='已取消' ?'danger':'' ">{{scope.row[item.prop]}}</el-tag>
          <el-tag v-else-if="item.type==='commodityStatus'"
                  :type="scope.row[item.prop]=='在售' ? 'success' : scope.row[item.prop]=='下架' ? 'danger'  : 'info'">
            {{scope.row[item.prop]}}
          </el-tag>
          <div v-else-if="item.type==='selectList'">
            <div v-for="i in scope.row[item.prop]"
                 style="text-align: left;margin-top: 2px;">
              <span style="width: 100px;display: inline-block;text-align: right ">{{i.menuName}}: </span>
              <el-tag v-for="g in i.roles"
                      :key="g.id"
                      v-text="g.roleName"
                      style="margin-right: 3px;"
                      type="primary"></el-tag>
            </div>
          </div>
          <img v-else-if="item.type==='img'"
               :src="scope.row[item.prop]"
               width="40" />
          <img v-else-if="item.type==='img2'"
               :src="scope.row[item.prop][0].url"
               width="40" />
          <div v-else-if="item.type==='province'">{{scope.row['province']+scope.row['city']+scope.row['district']}}</div>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       v-if="enabled"
                       prop="enabled"
                       label="启用"
                       width="120">
        <template slot-scope="scope">
          <el-switch :disabled="eDisabled"
                     v-model="scope.row.enabled"
                     @change="editSubmit1(scope.$index, scope.row )"
                     active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       :width="btnWidth"
                       align="center"
                       v-if="btnWidth">
        <template slot-scope="scope">
          <el-button v-if="agree"
                     :disabled="scope.row.status != 0"
                     size="mini"
                     type="success"
                     icon="el-icon-edit"
                     @click="handleAgree(scope.$index, scope.row)">同意</el-button>
          <el-button v-if="reject"
                     :disabled="scope.row.status != 0"
                     size="mini"
                     type="danger"
                     icon="el-icon-delete"
                     @click="handleReject(scope.$index, scope.row)">驳回</el-button>
          <el-button v-if="edit"
                     size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button v-if="deliver"
                     :disabled="scope.row.status != '待发货'"
                     size="mini"
                     type="primary"
                     icon="el-icon-edit"
                     @click="handleDeliver(scope.$index, scope.row)">发货</el-button>
          <el-button v-if="detail"
                     size="mini"
                     type="info"
                     icon="el-icon-view"
                     @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button v-if="lower&&scope.row.status == '在售'"
                     size="mini"
                     type="danger"
                     icon="el-icon-bottom"
                     @click="handleLower(scope.$index, scope.row)">下架</el-button>
          <el-button v-if="upper&&scope.row.status == '下架'"
                     size="mini"
                     type="success"
                     icon="el-icon-top"
                     @click="handleUpper(scope.$index, scope.row)">上架</el-button>
          <el-button v-if="del"
                     size="mini"
                     type="danger"
                     icon="el-icon-delete"
                     @click="handleDel(scope.$index, scope.row)">删除</el-button>

          <el-button v-if="upgrade&&scope.row.grade == '好心人'"
                     size="mini"
                     type="primary"
                     icon="el-icon-caret-top"
                     @click="handleUpgrade(scope.$index, scope.row)">升级</el-button>
          <el-button v-if="demote&&scope.row.grade == '股东'"
                     size="mini"
                     type="danger"
                     icon="el-icon-bottom"
                     @click="handleDemote(scope.$index, scope.row)">降级</el-button>
          <el-button v-if="cancel"
                     :disabled="scope.row.status == '已完成'||scope.row.status == '已取消'"
                     size="mini"
                     type="danger"
                     icon="el-icon-delete"
                     @click="handleCancel(scope.$index, scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="支付凭证"
               :visible.sync="dialogFormVisible"
               :lock-scroll="false">
      <img :src="imagePath" />
    </el-dialog>
  </div>
</template>
<script>
import mixin from "../utils/mixin";

export default {
  mixins: [mixin],
  props: [
    "dataSourch",
    "dataConfig",
    "checked",
    "del",
    "upper",
    "lower",
    "cancel",
    "deliver",
    "agree",
    "reject",
    "edit",
    "upgrade",
    "demote",
    "detail",
    "btnWidth",
    "eDisabled",
    "enabled",
    "verify",
    "showMore",
    "toDetail",
    "exportLabel",
    "toComment"
  ],
  data () {
    return {
      imagePath: "",
      roleId: sessionStorage.getItem("roleId"),
      dialogFormVisible: false
    };
  },
  methods: {
    handleSort (column) {
      if (column.order === "ascending") {
        this.$emit("handleSort", column.prop);
      } else if (column.order === "descending") {
        this.$emit("handleSort", "-" + column.prop);
      }
    },
    selsChange (val) {
      this.$emit("selsChange", val);
    },
    editSubmit1 (val1, val2) {
      this.$emit("editSubmit1", val1, val2);
    },
    editSubmit2 (val1, val2) {
      this.$emit("editSubmit2", val1, val2);
    },
    showColumn (item) {
      if (this.checked.indexOf(item) !== -1) {
        return true;
      }
    },
    handleEdit (val1, val2) {
      this.$emit("handleEdit", val1, val2);
    },
    handleReject (val1, val2) {
      this.$emit("handleReject", val1, val2);
    },
    handleAgree (val1, val2) {
      this.$emit("handleAgree", val1, val2);
    },
    handleDeliver (val1, val2) {
      this.$emit("handleDeliver", val1, val2);
    },
    handleDel (val1, val2) {
      this.$emit("handleDel", val1, val2);
    },
    handleUpgrade (val1, val2) {
      this.$emit("handleUpgrade", val1, val2);
    },
    handleDemote (val1, val2) {
      this.$emit("handleDemote", val1, val2);
    },
    handleCancel (val1, val2) {
      this.$emit("handleCancel", val1, val2);
    },
    handleDetail (val1, val2) {
      this.$emit("handleDetail", val1, val2);
    },
    handleLower (val1, val2) {
      this.$emit("handleLower", val1, val2);
    },
    handleUpper (val1, val2) {
      this.$emit("handleUpper", val1, val2);
    },
    handleToDetail (val1, val2) {
      this.$emit("handleToDetail", val1, val2);
    },
    getRowKey (row) {
      return row.id + row.childrenLevel;
    },
    certificateFull (imagePath) {
      this.imagePath = imagePath;
      this.dialogFormVisible = true;
    },
    tableHeaderColor ({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (rowIndex === 0) {
        return "background-color: #DCDFE6;";
      }
    },
    dealName (name) {
      if (name == null) {
        return "无";
      }
      return name;
    },
    toContract (row, table) {
      if (table == "project") {
        this.$router.push({
          path: "/ContractItem",
          query: {
            id: row.id,
            name: row.name
          }
        });
      }
      if (table == "supplier") {
        this.$router.push({
          path: "/SupplierDetails",
          query: {
            id: row.id,
            name: row.name
          }
        });
      }
    }
  },
  mounted () { }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
