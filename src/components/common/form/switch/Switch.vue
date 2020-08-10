<template>
  <div>
    <label for="name" class="col-sm-1 control-label">
      <slot name="switch-text"></slot>
    </label>
    <div class="col-sm-5">
      <div class="weui-div" @click.stop="toggle">
        <span class="weui-switch" :class="{'weui-switch-on': me_checked}" ></span>
        <div v-if='!me_checked' class="weui-div-2">停用</div>
        <div v-if='me_checked' class="weui-div-1">启用</div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'SwitchComponent',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    handle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      me_checked: false
    }
  },
  watch: {
    value () {
      this.me_checked = this.value
    }
  },
  methods: {
    toggle () {
      // 是否可点击
      if (this.handle === true) {
        this.me_checked = !this.me_checked
        this.$emit('changeSwitch', this.me_checked)
      }
      //  else {
      //   this.me_checked = this.value
      //   this.$emit('changeSwitch', this.me_checked)
      // }
    }
  }
}
</script>
<style>
  .weui-div{
    position:relative;
    font-weight: bold;
    cursor:pointer;
    width: 82px;
    height: 32px;
  }
  .weui-div-1{
    position:absolute;
    left:10px;
    top:0;
    line-height:32px;
    font-size:12px;
    color:#333333;
  }
  .weui-div-2{
    position:absolute;
    right:11px;
    top:0;
    line-height:32px;
    font-size:12px;
    color:#999999;
  }
  .weui-switch {
    display: block;
    position: relative;
    width: 82px;
    height: 32px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }
  .weui-switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    background-color: #E6E6E6;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .weui-switch:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .weui-switch-on {
    border-color: #F2DC37;
    background-color: #F2DC37;
  }
  .weui-switch-on:before {
    border-color: #F2DC37;
    background-color: #F2DC37;
  }
  .weui-switch-on:after {
    transform: translateX(50px);
  }
</style>
