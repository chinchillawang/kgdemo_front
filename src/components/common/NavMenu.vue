<template>
  <div class="nav-bar">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#25567A">
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="2">专利列表</el-menu-item>
      <el-menu-item index="3">个人中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu'
}
</script>

<style scoped>
.nav-bar{
    width: 100%;
    left: 0px;
    top: 0px;
  }
.el-menu-item{
  font-weight: bolder!important;
}
.el-menu--horizontal>.el-menu-item {
  height: 35px!important;
  line-height: 35px!important;
}
.el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 35px!important;
  line-height: 35px!important;
}
</style>
