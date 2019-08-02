<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse ? '64px' :'200px'">
      <div class="logo" :class="{minlogo:isCollapse}"></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-position"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleMenu" class="el-icon-s-fold" style="font-size:22px"></span>
        <span class="txt">江苏传智播客教育科技股份有限公司</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt />
            黑猫警长
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
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
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleMenu () {
      console.log(123)
      this.isCollapse = !this.isCollapse
    }
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
    // background-color: #409eff;
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
