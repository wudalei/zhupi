<template>
  <div>
    <div class="toolbar soure">
      <span class="title-box">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
      </span>
      <span class="title-box">
        <el-button v-if="add"
                   @click="handleAdd">添加数据</el-button>
        <el-button v-if="exceed"
                   @click="handleExceed">导出数据</el-button>
        <el-button v-if="batchDel"
                   type="danger"
                   @click="handleRemove">批量删除</el-button>
      </span>
    </div>
    <el-table stripe
              :data="dataSourch"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              highlight-current-row
              v-loading="$store.state.listLoading"
              @selection-change="selection"
              @sort-change="handleSort"
              border
              :header-cell-style="tableHeaderColor">
      <!--勾选框-->
      <el-table-column type="selection"
                       width="40"
                       fixed
                       align="center"></el-table-column>
      <!--下拉详情样式-->
      <el-table-column type="expand"
                       fixed
                       v-if="showMore">
        <template slot-scope="props">
          <!--详情内容-->
          <slot name="freeSlot"
                :scope="scope"></slot>
        </template>
      </el-table-column>
      <!--序号-->
      <el-table-column type="index"
                       label="序号"
                       height="30px"
                       width="80px"
                       align="center"></el-table-column>

      <el-table-column align="center"
                       v-for="(item,index) in dataConfig"
                       :key="index"
                       min-width="160px"
                       :label="item.label"
                       :prop="item.prop"
                       :sortable="item.sortable"
                       show-overflow-tooltip>
        <!--表格cell样式-->
        <template slot-scope="scope">
          <!--后端枚举类，type-数字，value-字符串值-->
          <el-tag v-if="item.type==='tag'"
                  :type="scope.row[item.prop.type]==0?'':'success'">{{scope.row[item.prop.value]}}</el-tag>
          <!--下拉菜单-->
          <el-select v-else-if="item.type==='select'"
                     width="50"
                     v-model="val"
                     placeholder="">
            <el-option v-for="opt in scope.row[item.prop]"
                       :key="opt"
                       :label="opt"
                       :disabled="true">
            </el-option>
          </el-select>
          <!--图片-->
          <img v-else-if="item.type==='img'"
               :src="scope.row[item.prop]"
               width="40" />
          <!--地址-->
          <div v-else-if="item.type==='province'">{{scope.row['province']+scope.row['city']+scope.row['district']}}</div>
          <!--默认文本-->
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <!--按钮操作-->
      <el-table-column label="操作"
                       v-if="show"
                       :width="width"
                       align="center"
                       fixed="right">
        <template slot-scope="scope">
          <slot name="btn"
                :scope="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24"
            class="">
      <el-pagination background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[10,20, 30, 50, 100]"
                     :page-size="20"
                     :total="total"
                     :current-page="current"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
export default {
  props: {
    dataSourch: {},
    dataConfig: {},
    showMore: {},
    batchDel: {
      default: false
    },
    exceed: {
      default: false
    },
    add: {
      default: false
    },
    total: {},
    current: {},
  },
  data () {
    return {
      show: false,
      width: '100'
    };
  },
  methods: {
    //选中列数据导出
    selection (val) {
      this.$emit("selection", val);
    },

    //添加数据
    handleAdd () {
      this.$emit("handleAdd");
    },

    //表格导出
    handleExceed () {
      this.$emit("handleExceed");
    },

    //批量删除
    handleRemove () {
      this.$emit("handleRemove");
    },

    //表格排序
    handleSort (column) {
      if (column.order === "ascending") {
        this.$emit("handleSort", column.prop);
      } else if (column.order === "descending") {
        this.$emit("handleSort", "-" + column.prop);
      }
    },

    //部分表格样式
    tableHeaderColor ({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (rowIndex === 0) {
        return "height:20px";
      }
    },

    //每页条数改变时会触发
    handleSizeChange (val) {
      this.$emit("handleSizeChange", val)
    },
    //当前页数改变时会触发
    handleCurrentChange (val) {
      this.$emit("handleCurrentChange", val)
    },
  },
  mounted () {
    //根据按钮数量调整操作栏宽度
    if (this.$scopedSlots.btn()) {
      this.width = (this.$scopedSlots.btn().length * 100) + ''
      this.show = true
    } else {
      this.show = false //当按钮数量是0的时候，操作列不显示
    }
  },
};
</script>

<style>
</style>
