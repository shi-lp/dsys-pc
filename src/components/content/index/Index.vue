<template>
  <div>
    <header-bar></header-bar>
    <side-bar></side-bar>
    <main-content>
      <div slot="main-index">
        <router-view></router-view>
      </div>
    </main-content>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/content/index/head/HeaderBar'
import SideBar from '@/components/content/index/sideBar/SideBar'
import MainContent from '@/components/content/index/main/MainContent'
import FooterBar from '@/components/content/index/footer/FooterBar'

export default {
  name: 'Index',
  components: {
    HeaderBar,
    SideBar,
    MainContent,
    FooterBar
  }
}
</script>
<style>
</style>
