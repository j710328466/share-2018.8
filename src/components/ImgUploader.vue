<template>
    <div class="imgUploader">
      <img class="pic" :src="imgUrl" alt="">
      <mu-flat-button class="choicePic" label="选择图片">
        <input class="file-button" @change="upload" type="file">
      </mu-flat-button>
    </div>
</template>

<script>
export default {
  name: 'me',
  data () {
    return {
      imgUrl: ''
    }
  },
  methods: {
    upload (val) {
      let obj = val.target.files
      if (obj[0].size > 409600) {
        return
      }
      this.$emit('imgUrl', {result: obj})
      let that = this
      var fr = new FileReader()
      fr.onload = function () {
        that.imgUrl = this.result
        that.$store.state.imgUrl = this.result
      }
      fr.readAsDataURL(obj[0])
    }
  }
}
</script>

<style scoped>
.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
.pic {
  width: 150px;
  height: 150px;
}
</style>
