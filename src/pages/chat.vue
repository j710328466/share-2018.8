<template>
  <transition name="fade">
    <mu-paper class="chatroom" :zDepth="2">
      <!-- 头部 -->
      <mu-appbar title="jz">
        <mu-avatar slot="left" :src="avatar"/>
      </mu-appbar>
      <!-- 聊天框 -->
      <div id="main" class="main" >
        <div v-for="(msg, index) of msgs" :key="index">
          <mu-content-block v-if="!msg.self">
            <p class="date">{{msg.date}}</p>
            <div class="chatCont">
              <mu-avatar :src="msg.avatar" />
              <div class="cont">
                <p class="tl ml-10">{{msg.name}}</p>
                <mu-paper class="msg mr-40 ml-10" :zDepth="1">
                  {{msg.mess}}
                </mu-paper>
              </div>
            </div>
          </mu-content-block>
          <mu-content-block v-else>
            <p class="date">{{msg.date}}</p>
            <div class="chatCont">
              <div class="cont">
                <p class="tr mr-10">{{msg.name}}</p>
                <mu-paper class="msg ml-40 mr-10" :zDepth="1">
                  {{msg.mess}}
                </mu-paper>
              </div>
              <mu-avatar :src="msg.avatar" />
            </div>
          </mu-content-block>
        </div>
      </div>
      <!-- 输入框 -->
      <div class="mess" ref="input">
        <mu-text-field class="mess-input" @focus="focusIn" v-model="inputMess" ref="inputMess" hintText="请输入" />
        <mu-raised-button class="mess-send" @click="sendMess" label="发送"  primary />
      </div>
    </mu-paper>
  </transition>
</template>

<script>
export default {
  name: 'chatroom',
  data () {
    return {
      avatar: '',
      name: '未知用户',
      users: [],
      barIsOpen: false,
      msgs: (localStorage.msgs && JSON.parse(localStorage.msgs)) || [],
      inputMess: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage._BBNAME) {
      next('/index')
    } else {
      next()
    }
  },
  mounted () {
    const that = this
    this.oContent = document.querySelector('#main')
    this.oContent.scrollTop = this.oContent.scrollHeight
    socket.on('msg', function (data) {
      that.msgs.push(data)
    })
  },
  methods: {
    focusIn: function () {
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
      }, 300)
    },
    sendMess () {
      if (!this.inputMess) {
        return
      }
      socket.emit('msg',
        {
          toName: this.$route.params._id,
          name: localStorage.getItem('_BBNAME'),
          date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
          mess: this.inputMess,
          avatar: this.avatar
        }
      )
      this.msgs.push({
        name: localStorage.getItem('_BBNAME'),
        date: this.moment().format('YYYY-MM-DD HH:mm:ss'),
        self: true,
        mess: this.inputMess,
        avatar: this.avatar
      })
      setTimeout(() => {
        this.oContent.scrollTop = this.oContent.scrollHeight
      }, 0)
      this.inputMess = ''
      this.$refs.inputMess.focus()
    }
  },
  watch: {
    msgs (val) {
      localStorage.msgs = JSON.stringify(val)
      setTimeout(() => {
        this.oContent.scrollTop = this.oContent.scrollHeight
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  p
    margin-bottom 0
  .tl
    text-align left
  .tr
    text-align right
  .fade-enter-active, .fade-leave-active
    transition opacity 1s
  .fade-enter,.fade-leave-to
    opacity 0
  .chatroom
    margin 40px auto
    display flex
    position relative
    flex-direction column
    height 80vh
    max-width 768px
    .main
      flex 1
      height 100%
      overflow scroll
      .online
        text-align center
      .date
        text-align center
      .chatCont
        display flex
        .cont
          margin 5px 10px
          flex 1
          word-wrap break-word
          word-break break-all
          .msg
            padding 6px
    .mess
      padding 0 10px
      display flex
      width 100%
      .mess-input
        flex 1
        margin-bottom 0
      .mess-emoji
        width 50px
    .focus
      position absolute
      bottom 0
</style>
