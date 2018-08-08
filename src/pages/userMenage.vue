<template>
    <div class="userMenage">
      <mu-table :showCheckbox="false" :fixedHeader="true">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th tooltip="ID">id</mu-th>
            <mu-th tooltip="姓名">姓名</mu-th>
            <mu-th tooltip="性别">性别</mu-th>
            <mu-th tooltip="身份证号">身份证号</mu-th>
            <mu-th tooltip="手机号">手机号</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="(item,index) in users"  :key="index" :selected="item.selected">
            <mu-td>{{item._id}}</mu-td>
            <mu-td>{{item.name}}</mu-td>
            <mu-td>{{item.sex}}</mu-td>
            <mu-td>{{item.idCard}}</mu-td>
            <mu-td>{{item.tel}}</mu-td>
            <mu-td>
              <mu-flat-button @click="userDel(item._id)" label="删除" primary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
    </div>
</template>

<script>
import {allUser, userDelete} from '../api/getData'
export default {
  name: 'userMenage',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this._getUserList()
  },
  methods: {
    _getUserList () {
      allUser().then(res => {
        if (res.data) {
          this.users = res.data
        }
      })
    },
    userDel (val) {
      userDelete({
        data: {
          _id: val
        }
      }).then(res => {
        if (res.data.ok) {
          this._getUserList()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
