<template>
  <div class="login-container">
    <div class="login-main">
      <div class="login-main-left">
        <img src="@static/bgImg/login.png"
             alt="">
      </div>
      <div class="login-main-right">
        <h1>欢迎登陆</h1>
        <el-form :model="userFrom"
                 ref="userFrom">
          <el-input v-model="loginName"
                    placeholder="用户名"></el-input>
          <el-input v-model="passWord"
                    placeholder="密码"></el-input>
        </el-form>
        <el-button type="primary"
                   :class="'hvr-shutter-out-vertical'"
                   @click="login">登 陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      userFrom: {
        loginName: '大隐总管理',
        passWord: '',
      },
    }
  },
  watch: {},
  computed: {},
  methods: {
    login () {
      let param = {
        loginName: this.userFrom.loginName,
        passWord: this.userFrom.passWord
      }
      this.$api.user.Login(param).then(res => {
        console.log("登录res", res);
      }).catch(err => {

      })
    },
  },
  created () { },
  mounted () {

  }
}
</script>
<style lang="scss">
@import "../../style/login.scss";
</style>