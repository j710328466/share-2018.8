<template>
  <div class="cards">
    <mu-card class="card" v-for="(essay,index) in essayList" :key="index" >
      <mu-card-header title="江志雄" sub-title="技术部-前端开发">
        <mu-avatar slot="avatar">
          <img src="../../assets/img/uicon.jpg">
        </mu-avatar>
      </mu-card-header>
      <mu-card-media title="前端自动化开发" sub-title="净是些瞎比比...">
        <img src="../../assets/img/sun.jpg">
      </mu-card-media>
      <mu-card-actions class="btns">
        <mu-button>收藏</mu-button>
        <mu-button>阅读全文</mu-button>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
export default {
  name: 'goodEssay',
  data () {
    return {
      essayList: [1, 2, 3, 4]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './goodEssay.styl'
</style>
