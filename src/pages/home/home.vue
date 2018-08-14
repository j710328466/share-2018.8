<template>
  <div class="layout">
    <!-- 提示框 -->
    <mu-snackbar :position="snackbar.position" :open.sync="snackbar.open">
      {{snackbar.message}}
      <mu-button flat slot="action" color="secondary" @click="snackbar.open = false">关闭</mu-button>
    </mu-snackbar>
    <!-- 登录框 -->
    <mu-dialog title="登录" width="360" :open.sync="loginOpened" max-width="80%" :esc-press-close="false" :overlay-close="false">
      <mu-text-field v-model="userName" label="账号" label-float></mu-text-field><br/>
      <mu-text-field v-model="password" label="密码" type="password" label-float></mu-text-field><br/>
      <mu-button class="mr_10" slot="actions" flat @click="register" >注册</mu-button>
      <mu-button slot="actions" color="primary" @click="login">登录</mu-button>
      <mu-button slot="actions" color="primary" @click="closeLogin">取消</mu-button>
    </mu-dialog>
    <!-- 头部 -->
    <mu-appbar class="header" color="primary">
      <router-link to="/register" slot="left" class="logo" flat>Jimi Club</router-link>
      <mu-tabs class="tabs" :value.sync="active" slot="right" @change="tabChange" indicator-color="#fff">
        <mu-tab>美文</mu-tab>
        <mu-tab>活动</mu-tab>
        <mu-tab>分享</mu-tab>
      </mu-tabs>
      <mu-button flat slot="right" @click="openMyPlace">我的</mu-button>
    </mu-appbar>
    <!-- 内容 -->
    <transition name="fade">
      <mu-paper class="main" :z-depth="3">
        <router-view></router-view>
      </mu-paper>
    </transition>
    <!-- 个人中心 -->
    <mu-drawer :open.sync="myPlaceOpen" :docked="false">
      <mu-list>
        <mu-list-item nested-list-class="mydrawer" button @click="openLoginDialog" v-if="!JCN">
          <mu-list-item-title>登录</mu-list-item-title>
        </mu-list-item>
        <mu-list-item nested-list-class="mydrawer" button v-else>
          <mu-list-item-title>{{JCN}}, 你好~</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="loginOut" button v-if="JCN">
          <mu-list-item-title>退出账号</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import { api_login } from './../../api/getData'
export default {
  name: 'home',
  data () {
    return {
      JCN: localStorage.getItem('JCN'),
      userName: '',
      password: '',
      active: 0,
      myPlaceOpen: false,
      loginOpened: false,
      docked: true,
      snackbar: {
        position: 'top',
        open: false,
        message: ''
      }
    }
  },
  beforeRouteLeave (to, from, next) {
  },
  mounted () {

  },
  methods: {
    tabChange (val) {
      if (val === 0) {
        this.$router.push({ path: '/' })
      } else if (val === 1) {
        this.$router.push({ path: '/activity' })
      } else if (val === 2) {
        this.$router.push({ path: '/share' })
      }
    },
    // 打开个人中心
    openMyPlace () {
      this.myPlaceOpen = !this.myPlaceOpen
    },
    openLoginDialog () {
      this.loginOpened = true
    },
    register () {
    },
    login () {
      api_login({
        data: {
          password: this.password,
          userName: this.userName
        }
      }).then(res => {
        // let data = res.data
        if (res.code === 200) {
          localStorage.setItem('JCN', res.data.userName)
          this.snackbar.open = true
          this.snackbar.message = '登录成功！'
          setTimeout(() => {
            this.loginOpened = false
            this.snackbar.open = false
            window.location.reload()
          }, 1000)
        }
      })
    },
    closeLogin () {
      this.loginOpened = false
    },
    loginOut () {
      localStorage.removeItem('JCN')
      window.location.reload()
    }
  },
  watch: {
    // $attrs (val) {
    //   this.list = ''
    //   if (val.searchOrder.length) {
    //     this.list = val.searchOrder
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import './home.styl'
</style>
