<template>
    <div class="adminMenage">
      <mu-dialog :open="showAddAdmin" title="管理员新增">
        <mu-text-field hintText="账号" v-model="name" type="text" labelFloat/><br/>
        <mu-text-field hintText="密码" v-model="pwd" type="password" labelFloat/><br/>
        <div class="mu-text-field">
          <mu-radio class="radio" label="管理员" nativeValue="1" v-model="adminVal"/>
          <mu-radio class="radio" label="超级管理员" nativeValue="2" v-model="adminVal"/>
        </div><br>
        <mu-raised-button label="添加" @click="addAdmin" primary/>
        <mu-raised-button label="取消" @click="closeAddAdmin"/>
      </mu-dialog>
      <div>
        <mu-table :showCheckbox="false" :fixedHeader="true">
          <mu-thead slot="header">
            <mu-tr>
              <mu-th tooltip="ID">id</mu-th>
              <mu-th tooltip="姓名">姓名</mu-th>
              <mu-th tooltip="类别">类别</mu-th>
              <mu-th tooltip="权限等级">权限等级</mu-th>
              <mu-th tooltip="创建时间">创建时间</mu-th>
              <mu-th tooltip="操作">操作</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(item,index) in admins"  :key="index" :selected="item.selected">
              <mu-td>{{item._id}}</mu-td>
              <mu-td>{{item.name}}</mu-td>
              <mu-td>{{item.admin}}</mu-td>
              <mu-td>{{item.status}}</mu-td>
              <mu-td>{{item.createTime}}</mu-td>
              <mu-td>
                <mu-flat-button @click="adminDel(item._id)" label="删除" primary/>
              </mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
        <div class="footer">
          <mu-raised-button @click="addAdminShow" class="addAdmin" label="新增" primary/>
        </div>
      </div>
    </div>
</template>

<script>
import {adminList, adminDelete, adminRegister} from '../api/getData'
export default {
  name: 'adminMenage',
  data () {
    return {
      admins: [],
      showAddAdmin: false,
      name: '',
      pwd: '',
      adminVal: ''
    }
  },
  mounted () {
    this._getAdminList()
  },
  methods: {
    _getAdminList () {
      adminList().then(res => {
        if (res.data.length) {
          this.admins = res.data
        } else {
        }
      })
    },
    adminDel (val) {
      adminDelete({
        data: {
          _id: val
        }
      }).then(res => {
        if (res.data.ok) {
          this._getAdminList()
        }
      })
    },
    addAdminShow () {
      this.showAddAdmin = true
    },
    addAdmin () {
      let p = {
        name: this.name,
        pwd: this.pwd,
        createTime: this.moment().format('YYYY-MM-DD HH:MM:SS'),
        status: this.adminVal
      }
      adminRegister({
        data: p
      }).then(res => {
        if (res.data) {
          this._getAdminList()
          this.showAddAdmin = false
        }
      })
    },
    closeAddAdmin () {
      this.showAddAdmin = false
    }
  }
}
</script>

<style scoped>
.footer {
  text-align: right;
}
.addAdmin {
  margin-right: 20px;
}
</style>
