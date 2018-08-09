<template>
    <mu-paper class="publish" :zDepth="2">
      <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
        {{popDesc}}
      </mu-popup>
      <h1 class="title">发布商品</h1>
      <div class="main">
        <mu-text-field v-model="title" label="标题" labelFloat/><br/>
        <mu-text-field v-model="price" label="价格" labelFloat/><br/>
        <mu-text-field v-model="publishAddr" label="发布于（校区）" labelFloat/><br/>
        <mu-text-field v-model="tel" label="联系电话" labelFloat/><br/>
        <mu-text-field v-model="freight" label="运费" labelFloat/><br/>
        <mu-select-field v-model="type" label="类型">
          <mu-menu-item value="笔记本" title="笔记本"/>
          <mu-menu-item value="平板电脑" title="平板电脑"/>
          <mu-menu-item value="台式机" title="台式机"/>
          <mu-menu-item value="手机" title="手机"/>
          <mu-menu-item value="家电" title="家电"/>
          <mu-menu-item value="家具" title="家具"/>
          <mu-menu-item value="电动车" title="电动车"/>
          <mu-menu-item value="自行车" title="自行车"/>
          <mu-menu-item value="摩托车" title="摩托车"/>
          <mu-menu-item value="美容保健" title="美容保健"/>
          <mu-menu-item value="健身医疗" title="健身医疗"/>
          <mu-menu-item value="游戏交易" title="游戏交易"/>
        </mu-select-field><br/>
        <mu-text-field v-model="desc" label="描述" multiLine :rows="3" :rowsMax="6" labelFloat/><br/>
        <ImgUploader v-on:imgUrl="imgUrl" ></ImgUploader>
      </div>
      <mu-raised-button class="sub" @click="submit" label="提交" primary/>
      <mu-raised-button class="sub" @click="cancel" label="取消"/>
    </mu-paper>
</template>

<script>
import ImgUploader from '../components/ImgUploader'
import OSS from '../../utils/aliOSS'
export default {
  name: 'publish',
  components: {
    ImgUploader
  },
  data () {
    return {
      user_id: localStorage.getItem('_BBNAME') || '',
      title: '',
      desc: '',
      pics: '',
      price: '',
      state: '',
      type: '',
      tel: '',
      publishAddr: '',
      freight: '',
      popDesc: '',
      topPopup: false
    }
  },
  methods: {
    imgUrl (e) {
      this.pics = e
      OSS.upload(e.result[0], 'classLesson/goodPics', (res) => {
        if (res.url) {
          this.popDesc = '图片上传成功'
          this.topPopup = true
          this.pics = res.url
        }
      })
    },
    submit () {
    },
    cancel () {
      this.$router.push({ path: '/' })
    }
  },
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.publish {
  width: 800px;
  margin: 20px auto;
  text-align: center;
}
.title {
  padding: 10px 0;
  text-align: center;
}
.sub {
  margin: 20px 0;
}
</style>
