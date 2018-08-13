<template>
    <div class="register">
      <mu-snackbar :position="snackbar.position" :open.sync="snackbar.open">
        {{snackbar.message}}
        <mu-button flat slot="action" color="secondary" @click="snackbar.open = false">关闭</mu-button>
      </mu-snackbar>
      <mu-paper class="cont" :zDepth="2">
        <mu-sub-header class="reg_title">注册账号</mu-sub-header>
        <mu-content-block>
          <mu-text-field label="账号" hintText="请输入账号" v-model="userName" type="text" labelFloat/><br/>
          <!-- :errorText="inputErrorRepwd" @textOverflow="handleRepwdOverflow" 密码提示 -->
          <mu-text-field label="密码" hintText="请输入密码" v-model="password" :maxLength="12" type="password" labelFloat/><br/>
          <mu-text-field label="再次输入密码" hintText="请输入密码" v-model="password2"  :maxLength="12" type="password" labelFloat/><br/>
          <mu-text-field label="手机号" hintText="请输入手机号" v-model="tel" type="text" labelFloat/><br/>
          <mu-button class="mb_20" slot="actions" color="secondary" @click="register">注册</mu-button>
        </mu-content-block>
      </mu-paper>
    </div>
</template>

<script>
import { api_register } from '../../api/getData'
export default {
  name: 'register',
  data () {
    return {
      // 提示框
      snackbar: {
        position: 'top',
        open: false,
        message: ''
      },
      // 用户信息
      userName: '',
      password: '',
      password2: '',
      tel: ''
    }
  },
  methods: {
    handlePwdOverflow (isOverflow) {
      this.inputErrorPwd = isOverflow ? '密码过长了！' : ''
    },
    handleRepwdOverflow (isOverflow) {
      this.inputErrorRepwd = isOverflow ? '密码过长你就不能段点嘛？' : ''
    },
    close () {
      this.$router.push({ path: '/' })
    },
    register () {
      const p = {
        userName: this.userName,
        password: this.password,
        tel: this.tel
      }
      for (var item in p) {
        if (p[item] === '') {
          this.snackbar.open = true
          this.snackbar.message = '你是不是没填完~'
          setTimeout(() => {
            this.snackbar.open = false
          }, 1000)
          return
        }
      }
      if (this.password2 !== p.password) {
        this.snackbar.open = true
        this.snackbar.message = '密码不一致！'
        setTimeout(() => {
          this.snackbar.open = false
        }, 1000)
        return
      }
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(p.tel))) {
        return
      }
      api_register({
        data: p
      }).then(res => {
        if (res.code === 200) {
          this.snackbar.open = true
          this.snackbar.message = '注册成功'
          setTimeout(() => {
            this.snackbar.open = false
          }, 1000)
          // localStorage.setItem('_BBID', res.data._id)
          // localStorage.setItem('_BBNAME', res.data.name)
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 1000)
        } else {
          this.snackbar.open = true
          this.snackbar.message = res.message
          setTimeout(() => {
            this.snackbar.open = false
          }, 1000)
        }
      })
    }
  },
  watch: {
    open (val) {
      console.log(val)
      // if (val) {
      //   setTimeout(() => {
      //     this.topPopup = false
      //   }, 2000)
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './register.styl'
</style>
