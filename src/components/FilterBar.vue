<template>
  <div class="filer-cantainer">
    <el-col :span="24"
            class="toolbar"
            style="padding-bottom: 0;">
      <div class="toolbar-title">
        <span class="title-box">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </span>
        <span class="title-box">
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary"
                     @click="handleRefresh">刷新结果</el-button>
        </span>
      </div>
      <el-form :inline="true"
               :model="model"
               ref="filter">
        <el-form-item v-for="(item,index) in config"
                      :style="{ width: item.width }"
                      :key="index"
                      :prop="item.value"
                      :label="item.labal">
          <!--文本输入-->
          <el-input v-if="item.type === 'input'"
                    clearable
                    :width="item.width"
                    :placeholder="item.placeholder"
                    v-model="model[item.value]"></el-input>
          <!--时间选择器-->
          <el-date-picker v-else-if="item.type === 'dateTime'"
                          v-model="model[item.value]"
                          type="daterange"
                          align="right"
                          unlink-panels
                          :default-time="['00:00:00', '23:59:59']"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :picker-options="pickerOptions"></el-date-picker>
          <!--下拉框(数据字段不确定复用性差，暂无解决办法)-->
          <!-- <el-select v-if="item.type === 'select'"
                     v-model="model[item.value]"
                     clearable
                     filterable
                     :style="{width:item.selectWidth}"
                     :placeholder="item.placeholder">
            <el-option v-for="(option,index) in selectData[item.value]"
                       :key="option.id?option.id:index"
                       label="1"
                       :value="option.id?option.id:option"></el-option> 
          </el-select>-->
          <!--插槽-->
        </el-form-item>
        <el-form-item label="请选择">
          <template slot-scope="scope">
            <slot name="freeSlot"
                  :scope="scope"></slot>
          </template>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import mixin from "../utils/mixin";
import util from "../common/js/util";
export default {
  mixins: [mixin],
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: "今天",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "昨天",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            end.setTime(end.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "前天",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一周",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近半年",
          onClick (picker) {
            const end0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 23:59:59"
            );
            const end = new Date(end0.replace(/-/g, "/"));
            const start0 = util.formatDate.format(
              new Date(),
              "yyyy-MM-dd 00:00:00"
            );
            const start = new Date(start0.replace(/-/g, "/"));
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
            picker.$emit("pick", [start, end]);
          }
        }
        ]
      }
    };
  },
  props: [
    "model",
    "config",
  ],
  methods: {
    handleReset () {
      this.$refs.filter.resetFields();
    },
    handleRefresh () {
      this.$emit("handleRefresh");
    },
  },
  mounted () { }
};
</script>
