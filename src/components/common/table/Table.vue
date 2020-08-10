<template>
  <div  class="row">
    <div class="col-md-12">
      <div class="content-panel">
        <h4><i class="fa fa-angle-right"></i></h4>
        <hr>
        <table class="table">
          <slot name="tab-head"></slot>
          <slot name="tab-body"></slot>
          <slot name="page-control"></slot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table'
}
</script>
<style>
</style>
