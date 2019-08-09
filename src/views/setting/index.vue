<template>
  <div>
    <el-card style="clearfix">
      <div slot="header">
        <Bread>个人设置</Bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="reqParams" label-width="110px">
            <el-form-item label="编号:">{{reqParams.id}}</el-form-item>
            <el-form-item label="手机:">{{reqParams.mobile}}</el-form-item>
            <el-form-item label="媒体名称:">
              <el-input placeholder="请输入媒体名称" style="width:500px" v-model="reqParams.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input
                :rows="4"
                placeholder="请输入内容"
                style="width:500px"
                type="textarea"
                v-model="reqParams.intro"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input placeholder="请输入邮箱" style="width:500px" v-model="reqParams.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            :headers="uploadHeaders"
            :on-success="handleSuccess"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            class="avatar-uploader"
            name="image"
          >
            <img :src="imageUrl" class="avatar" v-if="imageUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        id: null,
        photo: null,
        name: null,
        intro: null,
        email: null,
        mobile: null
      },
      imageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.reqParams = data
    },
    handleSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('亲！头像修改成功！！！')
    }
  }
}
</script>

<style scoped lang="less">
.avatar-uploader {
  position: relative;
  bottom: 430px;
  right: -730px;
}
</style>
