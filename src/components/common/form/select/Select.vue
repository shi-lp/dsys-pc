<template>
  <div>
    <label class="col-sm-1 control-label">
      <slot name="select-text"></slot>
    </label>
    <div class="col-sm-5">
      <slot name="select-box"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select'
}
</script>
<style>
</style>
