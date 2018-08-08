<template>
    <div class="content">
      <mu-popup position="top" :overlay="false" :open="topPopup">
        {{popText}}
      </mu-popup>
      <mu-paper class="reg" :zDepth="2">
        <mu-sub-header class="reg_title">注册账号</mu-sub-header>
        <mu-content-block>
          <mu-text-field label="账号" hintText="请输入账号" v-model="name" type="text" labelFloat/><br/>
          <div class="mu-text-field">
            <mu-radio label="男" name="group" nativeValue="1" v-model="sex" class="sex-radio"/>
            <mu-radio label="女" name="group" nativeValue="0" v-model="sex"  class="sex-radio"/>
          </div><br>
          <mu-text-field label="密码" hintText="请输入密码" v-model="pwd" :errorText="inputErrorPwd" @textOverflow="handlePwdOverflow" :maxLength="12" type="password" labelFloat/><br/>
          <mu-text-field label="再次输入密码" hintText="请输入密码" v-model="rePwd" :errorText="inputErrorRepwd" @textOverflow="handleRepwdOverflow" :maxLength="12" type="password" labelFloat/><br/>
          <mu-text-field label="手机号" hintText="请输入手机号" v-model="tel" type="text" labelFloat/><br/>
          <mu-text-field label="身份证号" hintText="请输入身份证号码" v-model="idCard" type="text" labelFloat/><br/>
          <mu-raised-button label="注册" @click="register" primary/>
          <mu-raised-button label="取消" @click="close"/>
        </mu-content-block>
      </mu-paper>
    </div>
</template>

<script>
import { register } from '../api/getData'
export default {
  name: 'seaFind',
  data () {
    return {
      data: [],
      name: '',
      sex: '',
      pwd: '',
      rePwd: '',
      idCard: '',
      tel: '',
      inputErrorPwd: '',
      inputErrorRepwd: '',
      topPopup: false,
      popText: '',
      inputErrorName: ''
    }
  },
  methods: {
    handleNameOverflow (isOverflow) {
      console.log(isOverflow)
      this.inputErrorName = isOverflow ? '账号过长了！' : ''
    },
    handlePwdOverflow (isOverflow) {
      this.inputErrorPwd = isOverflow ? '密码过长了！' : ''
    },
    handleRepwdOverflow (isOverflow) {
      this.inputErrorRepwd = isOverflow ? '密码过长你就不能段点嘛？' : ''
    },
    close: function () {
      this.$router.push({ path: '/' })
    },
    register () {
      const p = {
        name: this.name,
        sex: this.sex,
        pwd: this.pwd,
        rePwd: this.rePwd,
        idCard: this.idCard,
        tel: this.tel
      }
      if (p.pwd !== p.rePwd) {
        this.popText = '两次密码不一致'
        this.topPopup = true
        return
      }
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(p.tel))) {
        return
      }
      for (var item in p) {
        if (p[item] === '') {
          this.popText = '请输入' + item
          this.topPopup = true
          return
        }
      }
      register({
        data: p
      }).then(res => {
        console.log(res)
        if (res.data.name) {
          this.topPopup = true
          this.popText = '注册成功'
          localStorage.setItem('_BBID', res.data._id)
          localStorage.setItem('_BBNAME', res.data.name)
          setTimeout(() => {
            this.$router.push({ path: '/' })
            window.location.reload()
          }, 1000)
        } else {
          this.topPopup = true
          this.popText = res.data
        }
      })
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
.mu-text-field {
    display: inline-flex;
    justify-content: space-around;
    line-height: 48px;
}
.sex-radio {
    margin-top: 20px;
}
.reg {
    margin: 20px;
    text-align: center;
}
.reg_title {
    font-size: 20px;
}
</style>
