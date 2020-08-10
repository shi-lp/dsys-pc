<template>
  <header class="header black-bg">
      <div class="sidebar-toggle-box">
        <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
      </div>
      <!--logo start-->
      <a href="" class="logo"><b>DSYS<span>CRM</span></b></a>
      <!--logo end-->
      <div class="nav notify-row" id="top_menu">
        <!--  notification start -->
        <ul class="nav top-menu">
          <!-- taskBar -->
          <!-- inbox dropdown start-->
          <!-- inbox dropdown end -->
          <!-- notification dropdown start-->
          <!-- notification dropdown end -->
        </ul>
        <!--  notification end -->
      </div>
      <div class="top-menu">
        <ul class="nav pull-right top-menu">
          <li><a class="logout" href="">Logout</a></li>
        </ul>
      </div>
    </header>
</template>

<script>
export default {
  name: 'HeaderBar'
}
</script>
<style>
</style>
