<template>
    <div class="goodMenage">
      <mu-dialog :open="showAddGoodType" title="商品类型新增">
        <mu-text-field v-model="hugeType" label="主类目" labelFloat/><br/>
        <mu-text-field v-model="microType" label="子类型" labelFloat/><br/>
        <mu-raised-button @click="submit" label="确定" primary/>
        <mu-raised-button label="取消" @click="close"/>
      </mu-dialog>
      <mu-dialog :open="showChangeGoodType" title="商品类型修改">
        <mu-text-field v-model="microType" label="子类型" labelFloat/><br/>
        <mu-raised-button @click="submit" label="确定" primary/>
        <mu-raised-button label="取消" @click="close"/>
      </mu-dialog>
      <mu-content-block>
        <mu-table :showCheckbox="false" :fixedHeader="true">
          <mu-thead slot="header">
            <mu-tr>
              <mu-th tooltip="ID">id</mu-th>
              <mu-th tooltip="主类目">主类目</mu-th>
              <mu-th tooltip="子类型">子类型</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="(goodType,index) in goodTypes"  :key="index" :selected="goodType.selected">
              <mu-td>{{goodType._id}}</mu-td>
              <mu-td>{{goodType.hugeType}}</mu-td>
              <mu-td>
                <mu-chip v-for="(item, sindex) in goodType.microType" :key="sindex"  @delete="goodTypeDel(goodType._id, sindex)" showDelete>
                  {{item}}
                </mu-chip>
              </mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
        <mu-raised-button @click="addGoodType" label="添加" primary/>
      </mu-content-block>
    </div>
</template>

<script>
export default {
  name: 'goodMenage',
  data () {
    return {
      showAddGoodType: false,
      showChangeGoodType: false,
      hugeType: this.hugeType,
      microType: this.microType,

      goodTypes: []
    }
  },
  mounted () {
    this._getGoodTypeList()
  },
  methods: {
    _getGoodTypeList () {

    },
    goodTypeDel (id, index) {

    },
    addGoodType () {
      this.showAddGoodType = true
    },
    submit () {
    },
    close () {
      this.showAddGoodType = false
    }
  }
}
</script>

<style scoped>

</style>
