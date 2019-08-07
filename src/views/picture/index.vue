<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <Bread>素材管理</Bread>
      </div>
      <div style="margin-bottom:20px">
        <el-button-group>
          <el-button size="small" type="primary">全部</el-button>
          <el-button size="small">收藏</el-button>
        </el-button-group>
        <el-button size="small" style="float:right" type="success">添加素材</el-button>
      </div>
      <div>
        <el-image :src="src"></el-image>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
