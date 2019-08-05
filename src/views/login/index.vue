<template>
  <div class="container">
    <el-card class="box-card">
      <img alt src="../../assets/images/logo_index.png" />
      <el-form :model="formLogin" :rules="loginRules" ref="formLogin" status-icon>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="formLogin.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px;"
            v-model="formLogin.code"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="width:100%;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Store from '@/store'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号！！！'))
      }
      callback()
    }
    return {
      formLogin: {
        mobile: '17635373547',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.formLogin.validate(async valid => {
        if (valid) {
          //   this.$http
          //     .post('/authorizations', this.formLogin)
          //     .then(({ data }) => {
          //       // console.log(data)
          //       // console.log(data)
          //       Store.setUser(data.data)
          //       this.$router.push('/')
          //     })
          //     .catch(() => {
          //       this.$message.error('手机号或验证码不正确！！！')
          //     })
          // }
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.formLogin)
            Store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码不正确！！！')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  // 背景图定位 / 背景图尺寸 contain 等比缩放完整在容器内显示  cover  等比缩放完全铺面容器
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 400px;
  height: 350px;
  img {
    display: block;
    width: 200px;
    margin: 0 auto 20px;
  }
}
</style>
