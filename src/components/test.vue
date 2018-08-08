<template>
    <div class="test">
      <mu-raised-button class="test" label="测试" @click="test" primary/>
    </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
    }
  },
  methods: {
    test: function () {
      // this.axios({
      //   url: 'http://localhost:8888/test',
      //   data: {
      //     name: 'aaa',
      //     age: 11
      //   },
      //   method: 'POST'
      // })
    }
  }
}
</script>

<style scoped>
.test {
  margin: 20px;
}
</style>
