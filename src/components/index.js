
import dataTable from "../components/dataTable.vue"
import dataForm from "../components/dataForm.vue"
import filterBar from "../components/FilterBar.vue"
import pagination from "../components/pagination.vue"


const components = {
  install: function (Vue) {
    Vue.component('dataTable', dataTable);
    Vue.component('filterBar', filterBar);
    Vue.component('dataForm', dataForm);
    Vue.component('pagination', pagination);
  }
}
export default components;
