<template>
  <div>
    <h3>这是主页</h3>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    this.deleteGraphData()
  },
  methods: {
    deleteGraphData () {
      // var _this = this
      // var url = '/patent_kg/delete'
      var url = '/patent_kg/query/人工智能'
      this.axios.get(url)
        .then(function (response) {
          // _this.testGraph['nodes'] = [response.data]
          // _this.initGraph(_this.testGraph)
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    // this.initGraph(this.testGraph)
    }
  }
}
</script>

<style scoped>

</style>
