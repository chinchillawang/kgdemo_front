<template>
  <div class="nav-bar">
  </div>
</template>

<script>
export default {
  name: 'PatentList',
  data () {
    return {
      result: []
    }
  },
  mounted () {
    var url = '/patent/add'
    var _this = this
    this.axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          _this.result = response.data
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
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
