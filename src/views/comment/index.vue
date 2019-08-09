<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <Bread>评论管理</Bread>
      </div>
      <el-table :data="comments" style="width: 100%">
        <el-table-column label="标题" prop="title" width="400"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="changeStatus(scope.row)"
              size="mini"
              type="success"
              v-if="!scope.row.comment_status"
            >打开评论</el-button>
            <el-button @click="changeStatus(scope.row)" size="mini" type="danger" v-else>关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="changePager"
        background
        layout="prev, pager, next"
        style="margin-top:20px"
        v-if="total>reqParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      comments: [],
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // 获取评论列表
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data)
      this.comments = data.results
      this.total = data.total_count
    },
    // 分页按钮事件函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // 改变评论状态
    changeStatus (row) {
      const text1 = '老铁！您确认要打开该文章的评论功能吗？'
      const text2 =
        '老铁！关闭评论功能后用户将无法对该文章进行评论，您确认要关闭该文章的评论功能吗？'
      this.$confirm(row.comment_status ? text2 : text1, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          this.$message.success('修改成功！！！')
          row.comment_status = data.allow_comment
        })
        .catch(e => {
          console.log(e)
          this.$message.danger('服务器异常！！！')
        })
    }
  }
}
</script>

<style>
</style>
