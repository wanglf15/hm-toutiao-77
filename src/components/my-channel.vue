<template>
  <el-select :value="value" @change="fn" clearable placeholder="请选择">
    <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in channelOptions"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  methods: {
    // 获取频道列表
    async getchannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  },
  created () {
    this.getchannelOptions()
  }
}
</script>

<style>
</style>
