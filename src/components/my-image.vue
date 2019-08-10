<template>
  <div class="my-image">
    <div @click="openDialog" class="img-btn">
      <img :src="value || defaultUrl" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width:700px>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="changeCollect" size="mini" v-model="reqParams.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img-list">
            <div
              :class="{selected:selectedImageUrl===item.url}"
              :key="item.id"
              @click="selectImage(item.url)"
              class="img-item"
              v-for="item in images"
            >
              <img :src="item.url" alt />
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
        </el-tab-pane>
        <el-tab-pane label="上传素材" name="upload" style="text-align:center">
          <el-upload
            :headers="uploadHeaders"
            :on-success="handleSuccess"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            class="avatar-uploader"
            name="image"
          >
            <img :src="uploadimageUrl" class="avatar" v-if="uploadimageUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="confirmImage()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultUrl from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      dialogVisible: false,
      activeName: 'image',
      selectedImageUrl: null,
      uploadimageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      defaultUrl
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadimageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功事件
    handleSuccess (res) {
      //   console.log(res)
      this.uploadimageUrl = res.data.url
    },
    // 图片选中状态
    selectImage (url) {
      this.selectedImageUrl = url
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      this.getImages()
      this.uploadimageUrl = null
      this.selectedImageUrl = null
    },
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换收藏与全部
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 页码改变
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style scoped lang="less">
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-list {
  margin-top: 20px;
}
.img-item {
  position: relative;
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
  //   选中样式
  &.selected {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
