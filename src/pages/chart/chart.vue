
<template>
  <div class="chart-container">
    <div class="zp-box title-box"
         v-for="item in 4"></div>
    <div class="zp-box chart_2"></div>
    <div class="zp-box chart_3"></div>
    <div class="zp-box chart_4"></div>
    <div class="zp-box chart_5"></div>
    <div class="zp-box chart_6"></div>
    <div class="zp-box chart_7"></div>
    <div class="zp-box chart_8"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      itemList: []
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss">
@import "@style/chart.scss";
</style>