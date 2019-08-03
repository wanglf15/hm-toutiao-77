<template>
  <div>
    <el-card class="box-card card-header">
      <div slot="header" class="clearfix">
        <el-link :underline="false" @click="goWelcome">首页</el-link>
        <span class="el-icon-arrow-right"></span>
        <span class="content">内容管理</span>
      </div>
      <div class="text item">
        <el-form>
          <el-form-item label="状态 :">
            <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道 :">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期 :">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <el-button type="primary">筛选</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到 53383 条结果：</span>
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="封面"></el-table-column>
          <el-table-column prop="name" label="标题"></el-table-column>
          <el-table-column prop="address" label="状态"></el-table-column>
          <el-table-column prop="address" label="发布时间"></el-table-column>
          <el-table-column prop="address" label="操作"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        resource: ''
      },
      options: [
        {
          value: '选项1',
          label: '前端开发'
        },
        {
          value: '选项2',
          label: 'PHP开发'
        },
        {
          value: '选项3',
          label: '数据库'
        },
        {
          value: '选项4',
          label: '区块链'
        },
        {
          value: '选项5',
          label: '架构师'
        },
        {
          value: '选项6',
          label: '产品经理'
        },
        {
          value: '选项7',
          label: '开发者资讯'
        },
        {
          value: '选项8',
          label: '人工智能'
        }
      ],
      value: '',
      value1: ''
    }
  },
  methods: {
    goWelcome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.card-header {
  margin-bottom: 20px;
  .el-link {
    font-weight: 700;
    vertical-align: middle;
  }
  .el-icon-arrow-right {
    padding: 0 10px;
    vertical-align: middle;
  }
  .content {
    font-size: 14px;
    vertical-align: middle;
  }
  .text {
    padding: 0 40px;
  }
  .el-button {
    margin-left: 50px;
  }
}
</style>
