<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>

import login from '@/view/login/login'

export default {
  name: 'app',
  components: {
    login
  }
}
</script>

<style>
@import url('./assets/css/base.css');
@import url('./assets/css/normalize.css');
</style>
