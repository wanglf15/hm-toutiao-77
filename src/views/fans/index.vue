<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <Bread>粉丝管理</Bread>
      </div>
      <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
        <el-tab-pane label="粉丝列表" name="first">粉丝列表</el-tab-pane>
        <el-tab-pane label="周访问量" name="second">周访问量</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
