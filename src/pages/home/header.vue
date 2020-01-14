<template>
  <div class="header">
    <div class="logo">后台管理系统</div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn"
         @click="collapseChage">
      <i v-if="!collapse"
         class="el-icon-s-fold"></i>
      <i v-else
         class="el-icon-s-unfold"></i>
    </div>
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in routerList"
                          :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen"
             @click="handleFullScreen">
          <el-tooltip effect="dark"
                      :content="fullscreen?`取消全屏`:`全屏`"
                      placement="bottom">
            <i class="el-icon-full-screen"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark"
                      :content="message?`有${message}条未读消息`:`消息中心`"
                      placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-chat-dot-round"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge"
                v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/../static/bgImg//avator.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name"
                     trigger="click"
                     @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="http://111.0.67.131:8848/gitlab/ysdevelop-inner/y-bbs-admin-web"
               target="_blank">
              <el-dropdown-item>gitlab</el-dropdown-item>
            </a>
            <el-dropdown-item divided
                              command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from './bus'
import { removeToken } from '../../utils/auth'
export default {
  data () {
    return {
      collapse: false,
      fullscreen: false,
      name: '猪皮',
      message: 2,
      routerList: [],
    };
  },
  computed: {
    username () {
      let username = localStorage.getItem('ms_username');
      return username ? username : this.name;
    }
  },
  watch: {
    $route (newValue, oldValue) {
      //路由变化
      this.routerList = newValue.matched
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command == 'loginout') {
        localStorage.clear();
        sessionStorage.clear();
        removeToken();
        this.$store.commit('changeLogin', {
          Authorization: ''
        })
        this.$router.push('/login');
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    this.routerList = this.$route.matched
  }
};
</script>

