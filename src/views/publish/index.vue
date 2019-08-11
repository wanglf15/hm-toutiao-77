<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <Bread>{{articleId? '修改文章':'发布文章'}}</Bread>
      </div>
      <el-form
        :model="articleForm"
        :rules="publishRules"
        label-width="90px"
        ref="articleForm"
        status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group @change="changeType" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面组件位置 -->
          <div v-if="articleForm.cover.type === 0">
            <p>老铁！您已选择无图模式</p>
          </div>
          <div v-if="articleForm.cover.type === -1">
            <p>老铁！您已选择自动模式</p>
          </div>
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button @click="submit(false)" type="primary">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="update(false)" type="primary">保存</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标题不能为空'))
      } else if (value.length < 5) {
        callback(new Error('标题不能少于5个字符'))
      } else {
        callback()
      }
    }
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            ['link', 'image', 'video'], // 链接、图片、视频
            ['clean'] // 清除文本格式
          ]
        },
        placeholder: '老铁！请输入内容......'
      },
      publishRules: {
        title: [{ validator: checkTitle, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) this.getArticle()
  },
  watch: {
    // 不仅仅是data中的数据才可以去监听 $route实例的数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    changeType () {
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/content')
    },
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleId}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '修改存入草稿成功' : '文章修改成功')
      this.$router.push('/content')
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
