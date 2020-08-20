<template>
  <div>
    <el-button
    plain
    @click="open2">
    不会自动关闭
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'TopicMessage',
  methods: {
    open2 () {
      this.$notify({
        title: '提示',
        message: 'message',
        duration: 0,
        position: 'bottom-right'
      })
    }
  }
}
</script>
<style>
</style>
