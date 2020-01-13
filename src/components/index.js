/*
 * @Description: 
 * @Version: 2.0
 * @Autor: wudalei
 * @Date: 2020-01-11 10:27:48
 * @LastEditors  : wudalei
 * @LastEditTime : 2020-01-11 13:16:30
 */

import dataTable from "../components/dataTable.vue"

const components = {
  install: function (Vue) {
    Vue.component('dataTable', dataTable);
  }
}
export default components;
