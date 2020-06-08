<template>
  <div>
    <el-row :gutter="10">
      <el-col :xl="6" :lg="6" :sm="24" v-for="patent in visiblePatents" :key="patent.id">
        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{patent.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div>
            <tbody>
              <tr v-for="(v, k) in patent" :key="v">
                <td class="detail-info">{{k}}</td>
                <td class="detail-info">{{v}}</td>
              </tr>
            </tbody>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="page">
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="patents.length"
        @current-change="handelPageChange">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PatentList',
  data () {
    return {
      patents: [],
      visiblePatents: [],
      currentPage: 1,
      pageSize: 12
    }
  },
  mounted () {
    var url = '/patent/all'
    var _this = this
    this.axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          _this.patents = response.data
          // console.log(response.data)
          for (var i = _this.pageSize * (_this.currentPage - 1); i < (_this.pageSize) * (_this.currentPage); i++) {
            if (i >= _this.patents.length) {
              break
            }
            _this.visiblePatents.push(_this.patents[i])
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    showPatents (patents) {
      this.visiblePatents = []
      for (var i = this.pageSize * (this.currentPage - 1); i < (this.pageSize) * (this.currentPage); i++) {
        if (i >= this.patents.length) {
          break
        }
        this.visiblePatents.push(this.patents[i])
      }
      console.log(this.visiblePatents)
    },

    // restrict (abs) {
    //   if (abs === '' || abs == null) {
    //     return ''
    //   }
    //   if (abs.length < 48) {
    //     return abs
    //   } else {
    //     return abs.substring(0, 48) + '...'
    //   }
    // },

    handleClick (tab, event) {
      console.log(tab, event)
    },

    handelPageChange (pageBack) {
      this.currentPage = pageBack
      this.visiblePatents = []
      for (var i = this.pageSize * (this.currentPage - 1); i < (this.pageSize) * (this.currentPage); i++) {
        if (i >= this.patents.length) {
          break
        }
        this.visiblePatents.push(this.patents[i])
      }
      console.log(this.visiblePatents)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card{
    display: inline-block;
    width: 95%;
    margin-left: 5px;
    margin-right: 5px;
  }
  .note-title{
    font-weight: bolder;
  }
  .note-abs{
    font-size: 12px;
    height: 50px;
    cursor: pointer;
  }
  .note-operation{
    float: right;
    padding: 3px 0;
    margin-right: 2px;
    margin-left: 2px!important;
  }
  .el-card__header {
    padding: 9px 20px!important;
    height: 40px!important;
  }
  .page{
    text-align: center;
    position:fixed;
    margin:auto;
    left:0;
    right:0;
    bottom:0;
    width:200px;
    height:50px;
  }
</style>
