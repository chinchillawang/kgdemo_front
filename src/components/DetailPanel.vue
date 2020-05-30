<template>
  <el-card class="box-card detail-panel" shadow="hover">
    <div slot="header" class="clearfix">
      <span>节点信息</span>
    </div>
    <div class="text item">
      <!-- <div>{{currentNode}}</div> -->
      <div v-for="(v, k) in currentNode" :key="v.id" class="detail-info">{{k}}:{{v}}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DefaultPanel',
  data () {
    return {
      currentNode: {
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail-panel{
  position: fixed;
  right: 10px;
  top: 40px;
  border-radius: 4px;
  width: 200px;
  cursor: pointer;
}
.detail-info{
  text-align: left;
}
</style>
