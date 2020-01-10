

<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="$route.path"
             :collapse="collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="(item,index) in items">
        <template v-if="!item.hide">
          <el-submenu :index="item.path"
                      :key="index">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="(subItem,index2) in item.children">
              <el-menu-item :index="subItem.path"
                            :key="index2">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path"
                        :key="index">
            <div class="itemCls">
              <i :class="item.iconCls"></i>
              <span slot="title">{{ item.name }}</span>
            </div>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus';
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      collapse: false,
      items: [],
    };
  },
  computed: {

  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  },
  mounted () {
    let routerList = JSON.parse(Cookies.get('newRouter'));
    this.items = Object.assign({}, routerList);
  }
};
</script>

