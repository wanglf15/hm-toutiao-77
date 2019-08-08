<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <Bread>素材管理</Bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group @change="changeCollect" size="small" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" size="small" style="float:right" type="success">添加素材</el-button>
      </div>
      <div class="img-list">
        <div :key="item.id" class="img-item" v-for="item in images">
          <img :src="item.url" />
          <div class="foot" v-show="!reqParams.collect">
            <span
              :class="{selected:item.is_collected}"
              @click="toggleCollect(item)"
              class="el-icon-star-off"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="changePager"
        background
        layout="prev, pager, next"
        v-if="total>reqParams.per_page"
      ></el-pagination>
      <el-dialog :visible.sync="dialogVisible" style="text-align:center" title="添加素材" width="300px">
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
        <span class="dialog-footer" slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  methods: {
    // 删除素材
    delImage (id) {
      this.$confirm(
        '老铁，此操作将永久删除该素材, 是否继续?',
        '温馨提示:老铁没毛病',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // 收藏与取消收藏
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    // 上传成功函数
    handleSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('亲！素材已上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    // 添加素材
    openDialog () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    // 页码改变事件
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style scoped lang="less">
.img-item {
  position: relative;
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 80px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  .foot {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    span {
      margin: 0 20px;
      &.selected {
        color: red;
      }
    }
  }
}
</style>
