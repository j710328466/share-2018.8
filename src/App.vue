<template>
    <div class="layout">
      <!-- 头部 -->
      <div class="header" v-if="showHeader">
        <div @click="toHome" class="logo">
          校园二手
        </div>
        <div class="nav" v-if="showTab">
          <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
            <mu-tab value="index" to="/" title="首页"/>
            <mu-tab value="chat" to="/chat/:_id" title="消息"/>
            <mu-tab value="login" to="/login" @click="checkLogin" title="个人中心"/>
          </mu-tabs>
        </div>
        <div class="search" v-if="showTab">
          <mu-text-field  v-model="searchWord" class="search-input" hintText="搜索" />
          <mu-icon-button @click="search" class="search-btn">搜</mu-icon-button>
        </div>
        <div class="user">
          <mu-list-item class="avatar" :title="name" disabled >
            <mu-avatar slot="left" ref="button" src="../static/burger.jpg" @click="toggle" />
            <mu-popover :trigger="trigger" :open="open" @close="handleClose">
              <mu-menu>
                <mu-menu-item title="登录" @click="toLogin" v-show="!login"/>
                <mu-menu-item title="发布商品" to="/publish" v-show="login"/>
                <mu-menu-item title="退出登录" @click="loginOut" v-show="login"/>
              </mu-menu>
            </mu-popover>
          </mu-list-item>
        </div>
      </div>
      <!-- 内容 -->
      <router-view :searchOrder="orderList"></router-view>
    </div>
</template>

<script>
import {keyWordSearch} from './api/getData'
export default {
  name: 'App',
  data () {
    return {
      activeTab: 'index',
      dialog: false,
      open: false,
      trigger: null,
      name: '未登录',
      login: false,
      searchWord: '',
      showTab: true,
      showHeader: true,
      orderList: []
    }
  },
  beforeRouteLeave (to, from, next) {
  },
  mounted () {
    this.trigger = this.$refs.button.$el
    var BBNAME = localStorage.getItem('_BBNAME')
    if (BBNAME) {
      this.name = BBNAME
      this.login = true
      socket.emit('setName', {
        BBNAME
      })
    }
    if (this.$route.name === 'admin') {
      this.showHeader = false
    }
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    },
    checkLogin (val) {
      this.dialog = true
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    toggle () {
      this.open = !this.open
    },
    handleClose (e) {
      this.open = false
    },
    toLogin () {
      this.$router.push({ path: '/login' })
    },
    loginOut () {
      localStorage.removeItem('_BBNAME')
      localStorage.removeItem('_BBID')
      window.location.reload()
    },
    search () {
      keyWordSearch({
        data: {
          title: this.searchWord,
          state: 'sale'
        }
      }).then(res => {
        this.orderList = res.data
      })
    }
  },
  watch: {
    $route: function (val) {
      console.log(val)
      if (String(val.name) === 'index' || String(val.name) === 'seaFind' || String(val.name) === 'login') {
        this.showTab = true
      } else {
        this.showTab = false
      }
    }
  }
}
</script>

<style>
.mu-td {
  word-break:break-all;
  white-space: normal;
}
* {
  margin: 0;
  padding: 0;
}
h1,h2,h3,h4,h5,h6,span,p {
  margin: 0;
  padding: 0;
}
.layout {
  min-width: 980px;
}
.header {
  background-color: #7e57c2;
}

.logo {
  margin-left: 15px;
  font-size: 24px;
  color: white;
  display: inline-block;
  padding: 10px 0;
  cursor: pointer;
}

.nav {
  display: inline-block;
  width: calc(100% - 150px);
  margin: 0 auto;
}

.tab{
  margin: 0 auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0);
}
.header .user {
  position: absolute;
  padding-right: 20px;
  padding-top: 5px;
  top: 0;
  right: 0;
  height: 56px;
  color: #fff;
  line-height: 56px;
}
.search {
  position: absolute;
  display: flex;
  top: 0;
  right: 150px;
  height: 56px;
  line-height: 56px;
  color: #fff;
}
.search-input {
  padding-top: 8px;
  flex: 1;
  width: 100px;
}
.search-btn {
  flex: 20px 0 0;
  height: 56px;
}
.header .mu-item {
  color: #fff;
}
.breadcrumb{
  margin: 10px;
}
.mu-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  font-weight: bold;
  display: flex;
  color: rgb(230, 23, 23);
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
.content{
  width: 98%;
  margin: 0 auto;
}

.footer{
  padding: 20px 0;
  text-align: center;
}
</style>
