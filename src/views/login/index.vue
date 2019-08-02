<template>
    <div class='container'>
        <el-card class="box-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-input class="ipt" v-model="input" placeholder="请输入手机号"></el-input>
            <el-input class="ipt2" v-model="input1" placeholder="请输入验证码"></el-input>
            <el-button>发送验证码</el-button>
            <el-checkbox v-model="checked" class="cbx">同意该用户条款</el-checkbox>
            <el-button type="primary" class="log" :disabled="!checked">登录</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      input1: '',
      checked: false
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  // 背景图定位 / 背景图尺寸 contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover
}
.box-card{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    width: 400px;
    height: 350px;
    img {
        display: block;
        width: 200px;
        margin: 0 auto;
    }
    .ipt {
        width: 320px;
        margin-left: 22px;
        margin-top: 30px;
    }
    .ipt2 {
        width: 200px;
        margin-left: 22px;
        margin-right: 10px;
        margin-top: 30px;
    }
    .cbx {
        display: block;
        margin-top: 30px;
        margin-left: 22px;
    }
    .log{
        width: 320px;
        margin-left: 22px;
        margin-top: 20px;
    }
}
</style>
