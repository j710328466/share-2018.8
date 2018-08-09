<template>
    <div class="content">
      <mu-popup position="top" :overlay="false" :open="topPopup">
        {{popText}}
      </mu-popup>
      <!-- 登录框 -->
      <mu-dialog :open="dialog" title="登录" v-if="!logined">
          <mu-text-field label="账号" hintText="请输入账号" v-model="name" type="text" labelFloat/><br/>
          <mu-text-field label="密码" hintText="请输入密码" v-model="pwd" :errorText="inputErrorPwd" @textOverflow="handlePwdOverflow" :maxLength="12" type="password" labelFloat/><br/>
          <mu-raised-button label="登录" @click="login" primary/>
          <mu-raised-button label="取消" @click="close"/>
          <mu-flat-button label="注册账号" @click="toRegister"/>
      </mu-dialog>
      <!-- 用户界面 -->
      <mu-paper class="user" :zDepth="2" v-else>
        <h2 class="user_tit">{{name}}的个人中心</h2>
        <div class="user_cont">
          <mu-list class="user_cont_l" @change="handleListChange" :value="activeItem">
            <mu-list-item title="我发布的" value="sale">
            </mu-list-item>
            <mu-list-item title="我卖出的" value="saled">
            </mu-list-item>
            <mu-list-item title="我买到的" value="bought">
            </mu-list-item>
          </mu-list>
          <div class="user_cont_r">
            <mu-table :showCheckbox="false" :fixedHeader="true">
              <mu-thead slot="header">
                <mu-tr>
                  <mu-th tooltip="订单ID">订单ID</mu-th>
                  <mu-th tooltip="商品预览">图片</mu-th>
                  <mu-th tooltip="名称">商品名称</mu-th>
                  <mu-th tooltip="发布时间">发布时间</mu-th>
                  <mu-th tooltip="价格">价格</mu-th>
                  <mu-th tooltip="操作">操作</mu-th>
                </mu-tr>
              </mu-thead>
              <mu-tbody>
                <mu-tr v-for="(item,index) in tableData"  :key="index" :selected="item.selected">
                  <mu-td>{{item._id}}</mu-td>
                  <mu-td>
                    <img class="good_pic" :src="item.pics[0]" alt="">
                  </mu-td>
                  <mu-td>{{item.title}}</mu-td>
                  <mu-td>{{item.createTime}}</mu-td>
                  <mu-td>{{item.price}}</mu-td>
                  <mu-td>
                    <mu-raised-button label="详情" :to="{path: `orderDetail/${item._id}`}" primary/>
                  </mu-td>
                </mu-tr>
              </mu-tbody>
            </mu-table>
          </div>
        </div>
      </mu-paper>
    </div>
</template>

<script>
import { login } from '../api/getData'
export default {
  name: 'me',
  data () {
    return {
      data: [],
      name: '',
      pwd: '',
      inputErrorPwd: '',
      dialog: true,
      topPopup: false,
      popText: '',
      goodName: '',
      goodDesc: '',
      logined: localStorage.getItem('_BBID'),
      activeItem: 'sale',
      tableData: ''
    }
  },
  mounted: function () {
    var BBID = localStorage.getItem('_BBID')
    var BBNAME = localStorage.getItem('_BBNAME')
    if (BBNAME) {
      this.name = BBNAME
    }
    if (BBID) {
      this.dialog = false
    }
  },
  methods: {
    login: function () {
      const p = {
        name: this.name,
        pwd: this.pwd
      }
      console.log(p)
      login({
        data: p
      }).then(res => {
        let data = res.data
        console.log(res)
        if (res.data === '登录失败') {
          this.topPopup = true
          this.popText = res.data
        } else {
          this.topPopup = true
          this.popText = '登录成功'
          localStorage.setItem('_BBID', data._id)
          localStorage.setItem('_BBNAME', data.name)
          setTimeout(() => {
            window.location.reload()
          }, 500)
        }
      })
    },
    toRegister: function () {
      this.$router.push({ path: '/register' })
    },
    raisePop: function () {
    },
    close: function () {
      this.$router.push({ path: '/' })
    },
    // 订单类型选择
    handleListChange: function (val) {
      this.activeItem = val
      getGoodList({
        data: {
          state: val,
          user_id: localStorage.getItem('_BBNAME')
        }
      }).then(res => {
        if (String(res.status) === '200') {
          this.tableData = res.data
        }
      })
    },
    handleNameOverflow: function (isOverflow) {
      console.log(isOverflow)
      this.inputErrorName = isOverflow ? '账号过长！' : ''
    },
    handlePwdOverflow: function (isOverflow) {
      this.inputErrorPwd = isOverflow ? '密码过长！' : ''
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
.mu-td {
  word-break:break-all;
  white-space: normal;
}
.me {
    margin: 20px;
}
.content {
    width: 90%;
}
.mu-sub-header {
    padding-top: 10px;
    padding-left: 0;
}
.user {
  margin: 20px;
}
.left {
  width: 30%;
}
.user_tit {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, .11);
}
.user_cont {
  display: flex;
}
.user_cont_l {
  text-align: center;
  padding: 0;
  width: 20%;
  border-right: 1px solid rgba(0, 0, 0, .11);
}
.user_cont_r {
  padding: 20px;
  width: 80%;
}
.good_pic {
  padding: 10px 0;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  box-sizing: content-box;
}

</style>
