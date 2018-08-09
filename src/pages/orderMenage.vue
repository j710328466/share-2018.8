<template>
  <div class="orderMenage">
    <mu-table :showCheckbox="false" :fixedHeader="true" width="2000">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">id</mu-th>
          <mu-th tooltip="图片">名称</mu-th>
          <mu-th tooltip="图片">图片</mu-th>
          <mu-th tooltip="发布者">发布者</mu-th>
          <mu-th tooltip="手机号">手机号</mu-th>
          <mu-th tooltip="价格">价格</mu-th>
          <mu-th tooltip="类型">类型</mu-th>
          <mu-th tooltip="状态">状态</mu-th>
          <mu-th tooltip="创建时间">创建时间</mu-th>
          <mu-th tooltip="买家ID">买家ID</mu-th>
          <mu-th tooltip="买家手机号">买家手机号</mu-th>
          <mu-th tooltip="收货地址">收货地址</mu-th>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in orders"  :key="index" :selected="item.selected">
          <mu-td>{{item._id}}</mu-td>
          <mu-td>{{item.title}}</mu-td>
          <mu-td>
            <img class="orderImg" :src="item.pics[0]" alt="">
          </mu-td>
          <mu-td>{{item.user_id}}</mu-td>
          <mu-td>{{item.tel}}</mu-td>
          <mu-td>{{item.price}}</mu-td>
          <mu-td>{{item.type}}</mu-td>
          <mu-td>{{item.state}}</mu-td>
          <mu-td>{{item.createTime}}</mu-td>
          <mu-td>{{item.buyer && item.buyer._id}}</mu-td>
          <mu-td>{{item.buyer && item.buyer.tel}}</mu-td>
          <mu-td>{{item.buyer && item.buyer.addr}}</mu-td>
          <mu-td>
            <mu-flat-button @click="orderDel(item._id)" label="删除" primary/>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
  </div>
</template>

<script>
export default {
  name: 'orderMenage',
  data () {
    return {
      orders: []
    }
  },
  mounted () {
    this._getOrderList()
  },
  methods: {
    _getOrderList () {
    },
    orderDel (val) {
    }
  }
}
</script>

<style scoped>
.orderImg {
  width: 80px;
  height: 80px;
}
</style>
