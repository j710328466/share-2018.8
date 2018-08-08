<template>
    <mu-paper id="orderState" :zIndex="2">
      <mu-popup position="top" :overlay="false" :open="topPopup">
        {{popText}}
      </mu-popup>
      <mu-stepper class="step" :activeStep="activeStep">
        <mu-step>
          <mu-step-label>
            确认订单
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            支付
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            确认收货
          </mu-step-label>
        </mu-step>
      </mu-stepper>
      <div class="main">
        <div class="step1" v-show="activeStep === 0">
          <div class="good">
            <img class="good_pic" :src="orderDetail.pics && orderDetail.pics[0]" alt="">
            <div class="good_desc">
              <h2 class="good_desc_tit" >{{orderDetail.title}}</h2>
              <p class="good_desc_price" >￥{{orderDetail.price && orderDetail.price.toFixed(2)}}</p>
            </div>
          </div>
          <div class="addr">
            <mu-content-block>
              <mu-select-field v-show="!isAddAddring" fullWidth v-model="addrSelect" label="选择收货地址">
                <mu-menu-item  @click="addAddr" value="请添加地址" title="请添加地址" />
                <mu-menu-item v-for="(item, index) in userMsg.addr" :key="index" :value="item" :title="item"/>
              </mu-select-field>
              <div v-show="isAddAddring" class="addAddr">
                <mu-text-field v-model="addrVal" hintText="请输入地址"/>
                <mu-raised-button label="添加" primary @click="addAddrOk"/>
              </div>
            </mu-content-block>
          </div>
          <div class="freight">
            <mu-content-block>
              <mu-text-field v-model="tel" hintText="请输入手机号"/><br/>
              <mu-select-field v-model="receiveGoodType" label="收货方式">
                <mu-menu-item value="selfPicking" title="自提" />
                <mu-menu-item value="express" title="快递" />
              </mu-select-field><br/>
              <mu-text-field :value="'运费：￥' + (orderDetail.freight || '0.00')" disabled v-show="receiveGoodType === 'express' "/>
            </mu-content-block>
          </div>
        </div>
        <div class="step2" v-show="activeStep === 1">
          <div class="order">
            <div class="method">
              <p>支付方式：</p>
              <mu-radio class="radio" label="支付宝" nativeValue="alipay" v-model="payment"/> <br/>
              <mu-radio class="radio" label="微信支付" nativeValue="wechat" v-model="payment"/> <br/>
              <mu-radio class="radio" label="储蓄卡" nativeValue="bankCard" v-model="payment"/> <br/>
            </div>
            <div class="price">支付金额：￥{{orderDetail.price && orderDetail.price.toFixed(2)}}</div>
          </div>
        </div>
        <div class="step3" v-show="activeStep === 2">
          <mu-stepper class="wuliu" :activeStep="wuliuStep" orientation="vertical">
            <mu-step>
              <mu-step-label>
                已发货
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                运输中
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                派件中
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                已签收
              </mu-step-label>
            </mu-step>
          </mu-stepper>
        </div>
      </div>
      <div class="btn" v-if="!finished">
        <mu-flat-button label="上一步" :disabled="activeStep === 0" @click="prev"/>
        <mu-raised-button :label="activeLabel" primary @click="next"/>
      </div>
    </mu-paper>
</template>

<script>
import { getGoodList, userDetail, addAddress, buyGood } from '../api/getData'
export default {
  name: 'orderState',
  data () {
    return {
      activeStep: 0,
      activeLabel: '下一步',
      orderDetail: '',
      userMsg: '',
      addrSelect: '请添加地址',
      addrVal: '',
      tel: '',
      isAddAddring: false,
      topPopup: false,
      popText: '',
      payment: 'alipay',
      wuliuStep: 0,
      receiveGoodType: ''
    }
  },
  mounted () {
    this._getUserDetail()
    this._getGoodList()
  },
  computed: {
    finished () {
      return this.activeStep > 2
    }
  },
  methods: {
    _getUserDetail () {
      userDetail({
        data: {
          name: localStorage.getItem('_BBNAME')
        }
      }).then(res => {
        console.log(res)
        this.userMsg = res.data
      })
    },
    _getGoodList () {
      getGoodList({
        data: this.$route.params
      }).then(res => {
        this.orderDetail = res.data[0]
      })
    },
    prev () {
      this.activeStep--
    },
    next () {
      if (this.activeStep === 1) {
        buyGood({
          data: {
            _id: this.$route.params._id,
            state: 'saled',
            buyer: {
              _id: localStorage.getItem('_BBID'),
              tel: this.tel,
              addr: this.addrSelect
            }
          }
        }).then(res => {
          if (res.data) {
            this.topPopup = true
            this.popText = '支付成功'
            setTimeout(() => {
              this.activeStep++
            }, 1500)
          } else {
            this.topPopup = true
            this.popText = '支付失败'
          }
        })
      } else if (this.activeStep === 2 || this.activeStep === 0) {
        this.activeStep++
      }
    },
    addAddr () {
      this.isAddAddring = true
    },
    addAddrOk () {
      addAddress({
        data: {
          user: {
            name: localStorage.getItem('_BBNAME')
          },
          data: {
            addr: this.addrVal
          }
        }
      }).then(res => {
        this.topPopup = true
        this.popText = '地址增加成功'
        this._getUserDetail()
      })
      this.isAddAddring = false
    }
  },
  watch: {
    topPopup () {
      setTimeout(() => {
        this.topPopup = false
      }, 1500)
    },
    activeStep (val) {
      if (val === 0) {
        this.activeLabel = '下一步'
      } else if (val === 1) {
        this.activeLabel = '支付'
      } else if (val === 2) {
        this.activeLabel = '完成'
      }
    }
  }
}
</script>

<style scoped>
.radio {
  margin: 10px 0;
}
#orderState {
  margin: 20px auto;
  width: 50%;
}
.step {
  padding: 20px;
}
.main {
  padding: 20px;
  height: 480px;
}
.good {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
  display: flex;
}
.good_pic {
  display: block;
  width: 150px;
  height: 150px;
}
.good_desc {
  padding: 0 40px;
  flex: 1;
}
.good_desc_tit {
  font-size: 30px;
  padding: 20px 0;
}
.good_desc_price, .price {
  font-size: 20px;
  color: blueviolet;
}
.step3 {
  text-align: center;
}
.wuliu {
  margin: auto;
  width: 30%;
}
.price {
  text-align: right;
}
.btn {
  padding: 20px 0;
  text-align: center;
}
</style>
