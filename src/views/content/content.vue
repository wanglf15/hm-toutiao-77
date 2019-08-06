<template>
  <div>
    <el-card class="box-card card-header">
      <div slot="header">
        <Bread>内容管理</Bread>
      </div>
      <div class="text item">
        <el-form label-width="80px" size="small">
          <el-form-item label="状态 :">
            <el-radio-group v-model="form.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道 :">
            <el-select placeholder="请选择" v-model="form.channel_id">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in channelOptions"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期 :">
            <div class="block">
              <el-date-picker
                end-placeholder="结束日期"
                range-separator="至"
                start-placeholder="开始日期"
                type="daterange"
                v-model="value1"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <!-- scope.row代表的就是表格一行的数据，想要输出images,就写scope.row.images
              如果我要循环输出guardianName的数组，那就要在循环输出的那一列中建立组建template，
              设置slot-scope="scope"(""里面是一个名字 写scope12345都可以)-->
              <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
                <!-- slot = error可自定义加载失败内容 -->
                <div slot="error">
                  <img alt height="75" src="../../assets/images/error.gif" width="100" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 0">草稿</el-tag>
              <el-tag v-if="scope.row.status === 1">待审核</el-tag>
              <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
              <el-tag type="warning" v-if="scope.row.status === 3">审核失败</el-tag>
              <el-tag type="danger" v-if="scope.row.status === 4">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row.id)"
                circle
                icon="el-icon-edit"
                plain
                type="primary"
              ></el-button>
              <el-button
                @click="del(scope.row.id)"
                circle
                icon="el-icon-delete"
                plain
                type="danger"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:center; margin-top:20px">
        <el-pagination :total="1000" background layout="prev, pager, next"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import store from '@/store'
// import MyBread from '@/components/my-bread'
export default {
  // components: { MyBread },
  data () {
    return {
      form: {
        status: null,
        channel_id: null
      },
      channelOptions: [
        {
          value: '选项1',
          label: '前端开发'
        }
      ],
      tableData: [],
      value1: [],
      total: ''
    }
  },
  methods: {
    goWelcome () {
      this.$router.push('/')
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { parmas: this.form })
      this.total = data.total_count
      this.tableData = data.results
      console.log(data)
    },
    del (id) {
      this.$confirm('亲！，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(id)
          await this.$http.delete(`/articles/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getArticles()
        })
        .catch(e => {
          console.log(e)
          this.$message.error('服务器请求超时')
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped lang="less">
.card-header {
  margin-bottom: 20px;
}
</style>
