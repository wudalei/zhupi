
<template>
  <div class="login-container">
    <vue-particles color="#b3abf7"
                   :particleOpacity="0.7"
                   :particlesNumber="60"
                   shapeType="circle"
                   :particleSize="4"
                   linesColor="#d5d1fb"
                   :linesWidth="1"
                   :lineLinked="true"
                   :lineOpacity="0.4"
                   :linesDistance="150"
                   :moveSpeed="2"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="true"
                   clickMode="push"
                   class="bgImg">
    </vue-particles>
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
import Cookies from 'js-cookie'
export default {
  components: {

  },
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
        loginName: that.userFrom.loginName,
        passWord: that.userFrom.passWord
      }
      that.$refs.userFrom.validate(valid => {
        if (valid) {
          that.$api.user.login(param).then(res => {
            // 将用户token保存
            let userToken = "Bearer " + res.data.msg;
            that.$store.commit('changeLogin', {
              Authorization: userToken
            })
            setToken(userToken);

            //获取用户权限
            that.$store.dispatch('GetInfo', that);
            that.$message({
              message: "登陆成功",
              type: "success"
            });
            setTimeout(() => {
              let routerList = JSON.parse(Cookies.get('newRouter'));
              if (routerList[0].children) {
                that.$router.push({ path: routerList[0].children[0].path });
                return;
              }
              that.$router.push({ path: routerList[0].path })
            }, 500)
          }).catch(err => {
            // console.log("err->", err)
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