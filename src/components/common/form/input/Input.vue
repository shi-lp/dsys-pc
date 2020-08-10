<template>
  <div>
    <!-- <label class="col-sm-2 col-sm-2 control-label"> -->
    <label for="name" class="col-sm-1 control-label">
      <slot name="input-text"></slot>
    </label>
    <div class="col-sm-5">
      <slot name="input-box"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input'
}
</script>
<style>
</style>
