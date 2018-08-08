<template>
    <div class="content">
      <mu-paper class="banner_top" :zDepth="1" v-if="banners[0]">
        <a :href="banners[0].href">
            <img class="banner_top_img" :src="banners[0].img" alt="">
            <h2 class="banner_title">{{banners[0].title}}</h2>
          </a>
      </mu-paper>
      <div class="content-left">
        <mu-paper :zDepth="2">
          <mu-list @change="handleListChange" :value="activeList">
            <mu-list-item title="热门推荐" value="">
            </mu-list-item>
            <mu-list-item v-for="(type, index) in goodTypes" :key="index" :title="type.hugeType" toggleNested :open="false">
              <mu-list-item v-for="(item, sindex) in type.microType" :key="sindex" slot="nested" :title="item" :value="item">
              </mu-list-item>
            </mu-list-item>
          </mu-list>
        </mu-paper>
        <mu-paper class="banner_left" :zDepth="2" v-if="banners[1]">
          <a :href="banners[1].href">
            <img class="banner_left_img" :src="banners[1].img" alt="">
            <h2 class="banner_title">{{banners[1].title}}</h2>
          </a>
        </mu-paper>
      </div>
      <div class="content-right">
          <mu-paper class="body" :zDepth="2">
              <mu-sub-header>商品展示</mu-sub-header>
                <mu-content-block>
                    <mu-grid-list class="gridlist-demo">
                        <mu-grid-tile class="good" v-for="(item, index) in list" :key="index">
                            <img :src="item.pics[0]"/>
                            <span slot="title">{{item.title}}</span>
                            <span slot="subTitle">￥<b>{{item.price.toFixed(2)}}</b></span>
                            <mu-icon-button :to="{path: `orderDetail/${item._id}`}" tooltip="详情" tooltipPosition="top-left" icon="$" slot="action"/>
                        </mu-grid-tile>
                    </mu-grid-list>
                </mu-content-block>
          </mu-paper>
      </div>
    </div>
</template>

<script>
import { getGoodList, bannerShow, goodTypeList } from '../api/getData'
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeList: '',
      list: '',
      banners: [],
      goodTypes: []
    }
  },
  created () {
    getGoodList({
      data: {
        state: 'sale'
      }
    }).then(res => {
      this.list = res.data
    })
    goodTypeList({}).then(res => {
      console.log(res)
      this.goodTypes = res.data
    })
  },
  mounted () {
    bannerShow({}).then(res => {
      if (res.data) {
        console.log(res)
        this.banners = res.data
      }
    })
  },
  methods: {
    // 列表渲染
    handleListChange (val) {
      this.activeList = val
      if (val) {
        console.log(val)
        getGoodList({
          data: {
            type: val
          }
        }).then(res => {
          this.list = res.data
        })
      } else {
        getGoodList({}).then(res => {
          this.list = res.data
        })
      }
    }
  },
  watch: {
    $attrs (val) {
      this.list = ''
      if (val.searchOrder.length) {
        this.list = val.searchOrder
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    padding-top: 20px;
}
.content-left{
  width: 20%;
  float: left;
  padding: 5px;
}

.content-right{
  width: 80%;
  display: block;
  float: right;
  padding: 0 0 20px 20px;
}

.body {
  border-radius: 5px;
  min-height: 500px;
}
.mu-grid-tile img {
  width: 100%;
}
.gridlist-demo{
  overflow-y: auto;
}
.gridlist-demo .good {
  width: 25%!important;
}
.banner_title {
  text-align: center;
}
.banner_top {
  margin-bottom: 10px;
}
.banner_top_img {
  width: 100%;
  height: 150px;
}
.banner_left {
  margin: 20px 0;
}
.banner_left_img {
  width: 100%;
}

</style>
