<template>
    <div class="banner">
      <mu-dialog :open="isShowAddBanner" title="banner新增">
        <mu-text-field label="标题" v-model="title" type="text" labelFloat/><br/>
        <mu-text-field label="链接" v-model="href" type="text" labelFloat/><br/>
        <div class="mu-text-field">
          <mu-radio class="radio" label="上面" nativeValue="top" v-model="position"/>
          <mu-radio class="radio" label="左边" nativeValue="left" v-model="position"/>
        </div><br>
        <ImgUploader v-on:imgUrl="getUrl" ></ImgUploader>
        <mu-raised-button label="添加" @click="addBanner" primary/>
        <mu-raised-button label="取消" @click="cancel"/>
      </mu-dialog>
      <mu-table :showCheckbox="false" :fixedHeader="true">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th tooltip="ID">id</mu-th>
            <mu-th tooltip="标题">标题</mu-th>
            <mu-th tooltip="链接">链接</mu-th>
            <mu-th tooltip="图片">图片</mu-th>
            <mu-th tooltip="位置">位置</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(item,index) in banners"  :key="index" :selected="item.selected">
            <mu-td>{{item._id}}</mu-td>
            <mu-td>{{item.title}}</mu-td>
            <mu-td>{{item.href}}</mu-td>
            <mu-td>
              <img class="bannerPic" :src="item.img" alt="">
            </mu-td>
            <mu-td>{{item.position}}</mu-td>
            <mu-td>
              <mu-flat-button @click="bannerDel(item._id)" label="删除" primary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <div class="footer">
        <mu-raised-button @click="addBannerShow" class="addAdmin" label="新增" primary/>
      </div>
    </div>
</template>

<script>
import ImgUploader from '../components/ImgUploader'
import OSS from '../../utils/aliOSS'
import {addBannerReq, bannerDelete, bannerShow} from '../api/getData'
export default {
  name: 'banner',
  data () {
    return {
      title: '',
      img: '',
      href: '',
      position: '',
      banners: [],
      isShowAddBanner: false
    }
  },
  components: {
    ImgUploader
  },
  mounted () {
    this._getBanner()
  },
  methods: {
    _getBanner () {
      bannerShow({}).then(res => {
        console.log(res)
        if (res.data) {
          this.banners = res.data
        }
      })
    },
    getUrl (e) {
      OSS.upload(e.result[0], 'classLesson/banners', (res) => {
        if (res.url) {
          this.img = res.url
        }
      })
    },
    bannerDel (val) {
      bannerDelete({
        data: {
          _id: val
        }
      }).then(res => {
        if (res.data) {
          this._getBanner()
        }
      })
    },
    addBannerShow () {
      this.isShowAddBanner = true
    },
    addBanner () {
      let p = {
        href: this.href,
        img: this.img,
        title: this.title,
        position: this.position
      }
      addBannerReq({
        data: p
      }).then(res => {
        if (res.data) {
          this.isShowAddBanner = false
          this._getBanner()
        }
      })
    },
    cancel () {
      this.isShowAddBanner = false
    }
  }
}
</script>

<style scoped>
.bannerPic {
  width: 100px;
  height: 100px;
}
</style>
