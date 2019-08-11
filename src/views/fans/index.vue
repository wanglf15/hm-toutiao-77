<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <Bread>粉丝管理</Bread>
      </div>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="粉丝列表" name="fansList">
          <div class="fans-list">
            <div :key="item.id.toString()" class="fans-item" v-for="item in fansList">
              <el-avatar :src="item.photo" style="width:80px;height:80px"></el-avatar>
              <p>{{item.name}}</p>
              <el-button plain size="mini">+ 关注</el-button>
            </div>
          </div>
          <el-pagination
            :current-page="fansData.page"
            :page-size="fansData.per_page"
            :total="total"
            @current-change="changePager"
            background
            layout="prev, pager, next"
            style="margin-top:20px"
            v-if="total>fansData.per_page"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="周访问量" name="weekVisits">
          <div ref="dom" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      fansData: {
        page: 1,
        per_page: 24
      },
      activeName: 'fansList',
      fansList: [],
      total: 0
    }
  },
  methods: {
    initBar () {
      const dom = this.$refs.dom
      const myChart = echarts.init(dom)
      const options = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myChart.setOption(options)
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', {
        params: this.fansData
      })
      // console.log(data)
      this.fansList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.fansData.page = newPage
      this.getFansList()
    }
  },
  mounted () {
    this.initBar()
  },
  created () {
    this.getFansList()
  }
}
</script>

<style scoped lang="less">
.fans-item {
  width: 120px;
  height: 165px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  box-sizing: border-box;
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 15px;
  p {
    font-size: 14px;
    margin: 5px 0;
  }
}
</style>
