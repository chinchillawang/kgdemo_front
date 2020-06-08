<template>
  <el-card class="box-card detail-panel" shadow="hover">
    <div slot="header" class="clearfix">
      <span>节点信息</span>
    </div>
    <div class="text item">
      <!-- <div>{{currentNode}}</div> -->
      <table>
        <tbody>
            <tr v-for="(v, k) in currentNode" :key="v.id">
              <td class="detail-info">{{k}}</td>
              <td class="detail-info">{{v}}</td>
            </tr>
        </tbody>
      </table>
      <el-form ref="form" label-width="80px" v-show="isShow">
          <el-select v-model="currentType" placeholder="请选择查询关系">
            <el-option v-for="(type, i) in relationshipTypes" :key="type" :label="type" :value="i"></el-option>
          </el-select>
          <el-button type="primary" @click="onSubmit" class="submit-bnt">查询关系</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DefaultPanel',
  data () {
    return {
      isShow: false,
      currentNode: {},
      currentType: '',
      relationshipTypes: ['ACTED_IN', 'DIRECTED', 'WROTE', 'PRODUCED', 'REVIEWED'],
      urls: ['actedby', 'directed', 'wrote', 'produced', 'reviewed']
    }
  },
  methods: {
    onSubmit () {
      var _this = this
      if (this.currentType === '') {
        this.$message.error('未选择任何类型')
        return
      } else {
        var url = 'person/query/' + _this.urls[_this.currentType] + '/' + _this.currentNode.name
        this.axios.get(url)
          .then(function (response) {
            if (response.status === 200) {
              _this.$emit('update', response.data, _this.currentNode, _this.relationshipTypes[_this.currentType])
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      console.log(this.currentType)
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
  width: 50%;
  font-size: 12px;
  font-weight: bolder;
}
.type-select{
  margin-top: 25px;
  height: 20px;
}
.submit-btn{
  width: 100%;
  height: 30px;
  line-height: 0px;
  margin-top: 10px;
}
</style>
