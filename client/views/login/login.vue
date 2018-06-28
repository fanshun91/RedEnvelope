<template>
  <div class="login-bgColor">
    <div class="login-container">
      <div class="login-panel">
        <h2 class="login-title">登录</h2>
        <el-form class="login-form" :model="loginForm" :rules="login" ref="loginForm">
          <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item>
            <el-button class="sub-btn" type="primary" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let checkUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (value !== 'fanshun') {
          callback(new Error('用户名验证失败'))
        } else {
          callback()
        }
      }
      let checkUserPwd = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (value !== '123') {
          callback(new Error('密码验证失败'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        login: {
          username: [
            {
              validator: checkUserName,
              trigger: 'blur'
            }
          ],
          password: [
            {
              validator: checkUserPwd,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.replace('/user')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login-bgColor
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background -webkit-linear-gradient(top, #53a8ff, #80bfff)

  .login-container
    -webkit-box-flex 1
    -ms-flex 1
    flex 1
    display -webkit-flex
    display flex
    -webkit-box-orient vertical
    -webkit-box-direction normal
    -ms-flex-direction column
    flex-direction column
    -webkit-box-align center
    -ms-flex-align center
    -webkit-box-pack center
    -ms-flex-pack center
    -webkit-align-items center
    align-items center
    justify-content center
    height 100%

  .login-panel
    width 400px
    height auto
    margin -20px auto 0
    margin-top 28px\9
    margin-top 28px\0
    padding-bottom 36px
    background-color #fff
    border-sizing border-box
    -webkit-border-radius 3px
    -moz-border-radius 3px
    -ms-border-radius 3px
    -o-border-radius 3px
    border-radius 3px
    box-shadow 0 1px 1px 0 #800040

  .login-title
    margin 60px 0 36px
    font-size 28px
    font-weight 600
    color #009688
    text-align center
    letter-spacing 8px
    text-indent 4px

  .login-form
    padding: 0 30px

  .sub-btn
    width 100%

  .login-btn:hover
    background-color #008072

</style>
