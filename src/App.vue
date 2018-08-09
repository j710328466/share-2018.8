<template>
    <div class="layout">
      <!-- 头部 -->
      <mu-appbar class="header" color="primary">
        <mu-button class="logo" flat slot="left">Jimi Club</mu-button>
        <mu-tabs class="tabs" :value.sync="active" slot="right" @change="tabChange" indicator-color="#fff">
          <mu-tab>精美文章</mu-tab>
          <mu-tab>活动</mu-tab>
          <mu-tab>分享会</mu-tab>
        </mu-tabs>
        <mu-button flat slot="right">我的</mu-button>
      </mu-appbar>
      <!-- 内容 -->
      <mu-paper class="main" :z-depth="3">
        <router-view></router-view>
      </mu-paper>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      active: 0
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
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import './App.styl';
</style>
