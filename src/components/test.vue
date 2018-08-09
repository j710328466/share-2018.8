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
    }
  }
}
</script>

<style scoped>
.test {
  margin: 20px;
}
</style>
