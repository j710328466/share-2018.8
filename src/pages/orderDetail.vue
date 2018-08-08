<template>
  <transition name="fade">
    <mu-paper id="orderDetail" :zDepth="2" v-if="goodDetail">
      <mu-card>
        <mu-card-media :title="goodDetail.title" :subTitle="goodDetail.price && String('￥' + goodDetail.price.toFixed(2))">
          <img class="good_pic" :src="goodDetail.pics && goodDetail.pics[0]" />
          <div class="btn">
            <mu-raised-button :to="{path: `/orderState/${goodDetail._id}`}" label="购买" primary v-show="String(goodDetail.user_id) !== publisher"/>
          </div>
        </mu-card-media>
        <mu-card-header :title="goodDetail.user_id" :subTitle="'发布于' + (goodDetail.publishAddr || '')">
          <mu-avatar :src="goodDetail.pics && goodDetail.pics[0]" slot="avatar"/>
          联系方式：{{goodDetail.tel}}
          <mu-raised-button class="chat_btn" :to="{path: `/chat/${goodDetail.user_id}`}" label="聊一聊" />
        </mu-card-header>
        <mu-card-text>
          {{goodDetail.desc}}
        </mu-card-text>
      </mu-card>
    </mu-paper>
  </transition>
</template>

<script>
import { getGoodList } from '../api/getData'
export default {
  name: 'orderDetail',
  data () {
    return {
      goodDetail: [],
      publisher: localStorage.getItem('_BBNAME') || ''
    }
  },
  mounted () {
    getGoodList({
      data: this.$route.params
    }).then(res => {
      this.goodDetail = res.data[0]
    })
  },
  methods: {
  }
}
</script>

<style scoped>
#orderDetail {
  margin: 20px auto;
  width: 50%;
}
.btn {
  position: absolute;
  right: 20px;
  bottom: 0;
  line-height: 60px;
  z-index: 9999;
}
.chat_btn {
  float: right;
}
.good_pic {
  width: 500px;
  height: 500px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
