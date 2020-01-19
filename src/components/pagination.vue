
<template>
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
</template>
<script>
export default {
  props: ['total', 'current'],
  data () {

  },
  methods: {
    handleSizeChange (val) {
      this.$emit("handleSizeChange", val)
    },
    handleCurrentChange (val) {
      this.$emit("handleCurrentChange", val)
    },
  },
  mounted () {
  }
}
</script>
