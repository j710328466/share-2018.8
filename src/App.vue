<template>
  <router-view ></router-view>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      routeChange: ''
    }
  },
  created () {
  },
  methods: {

  },
  watch: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/styl/base.styl';
@import './App.styl';
</style>
