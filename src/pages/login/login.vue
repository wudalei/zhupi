
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
                 :rules="userRule"
                 ref="userFrom">
          <el-form-item prop="loginName">
            <el-input v-model="userFrom.loginName"
                      type="text"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="userFrom.passWord"
                      type="password"
                      placeholder="密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary"
                   @click.native.prevent="login"
                   :class="'hvr-shutter-out-vertical'">登 陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import validate from '../../utils/validate'
import { setToken } from '../../utils/auth'
export default {
  components: {},
  props: {},
  data () {
    return {
      userFrom: {
        loginName: '大隐总管理',
        passWord: '123456',
      },
      userRule: {
        loginName: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        passWord: [{ required: true, trigger: "blur", message: "请输入密码" }, { validator: validate.password }]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    login () {
      var that = this;
      let param = {
        loginName: this.userFrom.loginName,
        passWord: this.userFrom.passWord
      }
      that.$refs.userFrom.validate(valid => {
        if (valid) {
          that.$api.user.Login(param).then(res => {

            // 将用户token保存
            let userToken = "Bearer " + res.data.msg;
            this.$store.commit('changeLogin', {
              Authorization: userToken
            })
            setToken(userToken);

            //获取用户权限
            this.$store.dispatch('GetInfo', that);
            this.$message({
              message: "登陆成功",
              type: "success"
            });
          }).catch(err => {
            console.log("err->", err)
          })
        }
      }
      )
    },
  },
  created () { },
  mounted () {

  }
}
</script>
<style lang="scss">
@import "@style/login.scss";
</style>