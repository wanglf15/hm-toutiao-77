<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse ? '64px' :'200px'">
      <div :class="{minlogo:isCollapse}" class="logo"></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        active-text-color="#409EFF"
        background-color="#002033"
        router
        text-color="#fff"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/content">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/picture">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-position"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-tooltip class="item" content="点击收缩侧边栏" placement="bottom-start">
          <span @click="toggleMenu" class="el-icon-s-fold" style="font-size:22px"></span>
        </el-tooltip>
        <span class="txt">江苏传智播客教育科技股份有限公司</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting()" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout()" icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      photo: '',
      name: ''
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      store.clearUser()
      this.$router.push('/login')
    },
    setting () {
      this.$router.push('/setting')
    }
  },
  created () {
    // 本地获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
    eventBus.$on('update', name => {
      this.name = name
    })
  },
  mounted () {
    eventBus.$on('updatePhoto', photo => {
      this.photo = photo
    })
  }
}
</script>

<style scoped lang='less'>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background: #002033;
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    padding-right: 20px;
    .el-icon-s-fold {
      vertical-align: middle;
      padding-right: 10px;
    }
    .txt {
      vertical-align: middle;
    }
    .el-dropdown {
      float: right;
      vertical-align: middle;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
      font-weight: 700;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
      140px auto;
  }
  .minlogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
}
</style>
