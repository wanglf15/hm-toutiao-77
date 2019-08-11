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
              <el-button @click="saveUserInfo" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            :http-request="myUpload"
            :show-file-list="false"
            action
            class="avatar-uploader"
          >
            <img :src="reqParams.photo" class="avatar" v-if="reqParams.photo" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
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
      imageUrl: null
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    myUpload (res) {
      console.log(res)
      const formData = new FormData()
      formData.append('photo', res.file)
      this.$http.patch('user/photo', formData).then(({ data: { data } }) => {
        console.log(data)
        this.$message.success('亲！头像已修改成功')
        this.reqParams.photo = data.photo
        store.setUser({ photo: this.reqParams.photo })
        eventBus.$emit('updatePhoto', this.reqParams.photo)
      })
    },
    async saveUserInfo () {
      await this.$http.patch('user/profile', {
        name: this.reqParams.name,
        intro: this.reqParams.intro,
        email: this.reqParams.email
      })
      this.$message.success('修改成功')
      store.setUser({ name: this.reqParams.name })
      eventBus.$emit('update', this.reqParams.name)
    },
    async getProfile () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      console.log(data)
      this.reqParams = data
    }
  }
}
</script>

<style scoped lang="less">
.avatar-uploader {
  text-align: center;
  margin-bottom: 20px;
}
</style>
