<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <Bread>发布文章</Bread>
      </div>
      <el-form label-width="90px">
        <el-form-item label="标题">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor :options="quillOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn">
            <img alt src="../../assets/images/default.png" />
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import quillConfig from '@/quill-config/quill-config.js'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        quillOption: quillConfig
      }
    }
  }
}
</script>

<style scoped lang="less">
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
