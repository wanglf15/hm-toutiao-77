<template>
  <div>
    <el-card class="box-card card-header">
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
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
            <el-select placeholder="请选择" v-model="value">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in options"
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
        <span>根据筛选条件共查询到 0 条结果：</span>
      </div>
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="封面" prop="date"></el-table-column>
          <el-table-column label="标题" prop="name"></el-table-column>
          <el-table-column label="状态" prop="address"></el-table-column>
          <el-table-column label="发布时间" prop="address"></el-table-column>
          <el-table-column label="操作" prop="address"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      form: {
        status: null
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
      tableData: [],
      value: '',
      value1: ''
    }
  },
  methods: {
    goWelcome () {
      this.$router.push('/')
    }
  },
  created () {
    this.$http.get('articles').then(res => {
      console.log(store.getUser())
    })
  }
}
</script>

<style scoped lang="less">
.card-header {
  margin-bottom: 20px;
}
</style>
