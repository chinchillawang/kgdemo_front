<template>
  <div class="nav-bar">
    <el-menu
      :default-active="'/home'"
      class="el-menu-demo"
      mode="horizontal"
      router=""
      active-text-color="#25567A">
      <el-menu-item v-for="(item, i) in navList" :index="item.url" :key="i">
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        { name: '首页', url: '/home' },
        { name: '专利列表', url: '/patent_list' },
        { name: '知识图谱', url: '/patent_kg' }
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {

    }
  }
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
