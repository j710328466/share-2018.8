<template>
    <div class="admin">
      <mu-popup position="top" :overlay="false" :open="topPopup">
        {{popText}}
      </mu-popup>
      <mu-dialog :open="!isLogin" title="管理员登录">
        <mu-text-field v-model="adName"/><br/>
        <mu-text-field label="密码" hintText="密码" v-model="adPwd" type="password" labelFloat/><br/>
        <mu-raised-button label="登录" @click="login" primary/>
      </mu-dialog>
      <mu-paper class="main" v-show="isLogin">
        <mu-menu @change="leftVal" :value="checkLeftVal" class="left">
          <mu-menu-item to="adminMenage" value="管理员管理" title="管理员管理"/>
          <mu-menu-item to="userMenage" value="用户管理" title="用户管理"/>
          <mu-menu-item to="orderMenage" value="订单管理" title="订单管理"/>
          <mu-menu-item to="goodMenage" value="商品类型管理" title="商品类型管理"/>
          <mu-menu-item to="banner" value="广告投放" title="广告投放"/>
          <mu-menu-item @click="loginOut" value="退出账号" title="退出账号"/>
        </mu-menu>
        <div class="right">
          <mu-sub-header>{{checkLeftVal}}</mu-sub-header>
          <router-view></router-view>
        </div>
      </mu-paper>
    </div>
</template>

<script>
import { adminLogin } from '../api/getData'
export default {
  name: 'admin',
  data () {
    return {
      adName: '',
      adPwd: '',
      isLogin: false,
      admins: [],
      selectedMenu: '',
      showAddAdmin: false,
      topPopup: false,
      popText: '',

      name: '',
      pwd: '',
      adminVal: '',
      checkLeftVal: '管理员管理'
    }
  },
  mounted () {
    if (localStorage.getItem('_BBADID')) {
      this.isLogin = true
    }
  },
  methods: {
    leftVal (val) {
      this.checkLeftVal = val
    },
    login () {
      const p = {
        name: this.adName,
        pwd: this.adPwd,
        createTime: this.moment().format('YYYY-MM-DD HH:MM:SS')
      }
      adminLogin({
        data: p
      }).then(res => {
        if (res.data) {
          localStorage.setItem('_BBADID', res.data._id)
          this.popText = '登录成功'
          this.topPopup = true
          setTimeout(() => {
            this.isLogin = true
          }, 2000)
        } else {
        }
      })
    },
    loginOut () {
      localStorage.removeItem('_BBADID')
      this.$router.push({ path: '/' })
    }
  },
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  margin: 20px;
}
.left {
  width: 20%;
}
.right {
  flex: 1;
  border-left: 1px solid rgba(0, 0, 0, .11);
}
.radio {
  margin: 20px;
}
</style>
