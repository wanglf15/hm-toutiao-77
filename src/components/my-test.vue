<template>
  <div>
    <div class="header">header</div>
    <div class="content">
      <slot name="content">后备内容</slot>
      <slot name="footer">后备内容</slot>
      <slot msg="组件内部的数据" name="con">con</slot>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
