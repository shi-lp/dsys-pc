<template>
  <div id="login-page">
    <div class="container">
      <form class="form-login" action="index.html">
        <h2 class="form-login-heading">sign in now</h2>
        <div class="login-wrap">
          <input type="text" class="form-control" placeholder="请输入账号、邮箱或者手机号" autofocus>
          <br>
          <input type="password" class="form-control" placeholder="Password">
          <label class="checkbox">
            <input type="checkbox" value="remember-me"> 记住密码
            <span class="pull-right">
            <a data-toggle="modal" href="login.html#myModal"> 忘记密码?</a>
            </span>
            </label>
          <button class="btn btn-theme btn-block" @click="loginUser"><i class="fa fa-lock"></i> 登录</button>
          <hr>
          <div class="registration">
            还没有用户?<br/>
            <a class="" href="#">
              创建用户
              </a>
          </div>
        </div>
        <!-- Modal -->
        <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Forgot Password ?</h4>
              </div>
              <div class="modal-body">
                <p>Enter your e-mail address below to reset your password.</p>
                <input type="text" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">
              </div>
              <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
                <button class="btn btn-theme" type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <!-- modal -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {

    }
  },
  methods: {
    loginUser () {

    }
  }
}
</script>
<style>
</style>
