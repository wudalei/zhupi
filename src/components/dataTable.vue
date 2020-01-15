<template>
  <div>
    <div class="toolbar soure">
      <span class="title-box">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
      </span>
      <span class="title-box">
        <el-button @click="handleAdd">添加数据</el-button>
        <el-button @click="handleExceed">导出数据</el-button>
        <el-button type="danger"
                   @click="handleRemove">批量删除</el-button>
      </span>
    </div>
    <el-table stripe
              :data="dataSourch"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              highlight-current-row
              v-loading="$store.state.listLoading"
              @selection-change="selsChange"
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
  </div>
</template>
<script>
export default {
  props: [
    "dataSourch",
    "dataConfig",
    "showMore",
    "btnList",
  ],
  data () {
    return {
      show: false,
      width: '100'
    };
  },
  methods: {
    handleAdd () {
      this.$emit("handleAdd");
    },
    handleExceed () { },
    handleRemove () { },
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
  },
  mounted () {
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
