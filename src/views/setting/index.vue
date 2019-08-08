<template>
  <div>
    <el-card>
      <div slot="header">
        <Bread>个人设置</Bread>
      </div>
      <el-form label-width="110px">
        <el-form-item label="编号:">{{id}}</el-form-item>
        <el-form-item label="手机:">{{name}}</el-form-item>
        <el-form-item label="媒体名称:">
          <el-input placeholder="请输入媒体名称"></el-input>
        </el-form-item>
        <el-form-item label="媒体介绍:">
          <el-input :rows="2" placeholder="请输入内容" resize="none" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      id: '',
      photo: '',
      name: ''
    }
  },
  created () {
    // 本地获取用户信息
    console.log(store.getUser())
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
    this.id = user.id
  }
}
</script>

<style>
</style>
