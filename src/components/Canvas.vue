<template>
  <div>
    <div class="container" width='1000px' height='100px'></div>
    <detail-panel ref="detailPanel"></detail-panel>
  </div>
</template>

<script>
import * as d3 from 'd3'
import DetailPanel from './DetailPanel'
export default {
  name: 'Canvas',
  components: {
    DetailPanel
  },
  data () {
    return {
      width: 600,
      height: 600,
      colorList: ['#6fce7a', '#ff8373', '#f9c62c', '#a5ca34', '#70d3bd', '#ea91b0'],
      links: [],
      nodes: [],
      nodesText: [],
      linksText: [],
      simulation: null,
      testGraph: {
        'nodes': [],
        'links': []
      }
    }
  },
  created () {
    this.getGraphData()
  },
  methods: {
    getGraphData () {
      var _this = this
      var url = 'person/all'
      // var url = 'person/Tom Cruise'
      this.axios.get(url)
        .then(function (response) {
          _this.testGraph['nodes'] = response.data
          _this.initGraph(_this.testGraph)
        })
        .catch(function (error) {
          console.log(error)
        })
    // this.initGraph(this.testGraph)
    },

    initGraph (data) {
      var _this = this
      const links = data.links.map(d => Object.create(d))
      const nodes = data.nodes.map(d => Object.create(d))

      _this.simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('collide', d3.forceCollide().radius(() => 80))
        .force('charge', d3.forceManyBody().strength(-10))
        .force('center', d3.forceCenter(_this.width / 2, _this.height / 2))

      const svg = d3.select('.container')
        .append('svg')
        .attr('viewBox', [0, 0, _this.width, _this.height])
      svg.call(d3.zoom().on('zoom', function () {
        g.attr('transform', d3.event.transform)
      }))

      // eslint-disable-next-line no-unused-vars
      const positiveMarker = svg.append('marker')
        .attr('id', 'positiveMarker')
        .attr('orient', 'auto')
        .attr('stroke-width', 2)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerUnits', 'userSpaceOnUse')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 35) // 30 + 5
        .attr('refY', 0)
        .attr('markerWidth', 12)
        .attr('markerHeight', 12)
        .append('path')
        .attr('d', 'M 0 -5 L 10 0 L 0 5')
        .attr('fill', '#999999')
        .attr('stoke-opacity', 0.6)

      // eslint-disable-next-line no-unused-vars
      const negativeMarker = svg.append('marker')
        .attr('id', 'negativeMarker')
        .attr('orient', 'auto')
        .attr('stroke-width', 2)
        .attr('markerUnits', 'strokeWidth')
        .attr('markerUnits', 'userSpaceOnUse')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', -25) // -30 + (5)
        .attr('refY', 0)
        .attr('markerWidth', 12)
        .attr('markerHeight', 12)
        .append('path')
        .attr('d', 'M 10 -5 L 0 0 L 10 5')
        .attr('fill', '#999999')
        .attr('stoke-opacity', 0.6)

      const g = svg.append('g')

      _this.links = g.append('g')
        .attr('stroke', '#999999')
        .attr('stroke-opacity', 0.6)
        // .attr('marker-end', 'url(#positiveMarker)')
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('stroke-width', d => Math.sqrt(d.value))
        .attr('class', 'link')
        // .attr('id', d => d.source + '_' + d.relationship + '_' + d.target)
        .attr('id', function (d) {
          if (typeof (d.source) === 'object') {
            return d.source.id + '_' + d.relationship + '_' + d.target.id
          } else {
            return d.source + '_' + d.relationship + '_' + d.target
          }
        })

      _this.linksText = g.append('g')
        .selectAll('text')
        .data(links)
        .join('text')
        .text(function (d) {
          return d.relationship
        })
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .style('font-size', '10px')
        .style('font-weight', 'bold')
        .style('text-anchor', function (d) {
          return 'middle'
        })
        .append('textPath')
        .attr('xlink:href', d => '#' + d.source + '_' + d.relationship + '_' + d.target)
        // .atter('class', 'link-text')

      _this.nodes = g.append('g')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 30)
        .attr('fill', _this.color)
        .call(_this.drag(_this.simulation))
        .on('click', _this.queryNode)

      _this.nodes.append('title')
        .text(d => d.id)

      _this.nodeText = g.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(function (d) {
          return d.id
        })
        .style('text-anchor', function (d) {
          return 'middle'
        })
        // .attr('dx', function () {
        //   return this.getBoundingClientRect().width / 2 * (-1)
        // })
        // .attr('dx', -50)
        .attr('dy', 45)
        .attr('class', 'node-text')

      _this.simulation.on('tick', () => {
        // _this.links
        //   .attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y)
        // line写法
        // .attr('x1', d => d.source.x)
        // .attr('y1', d => d.source.y)
        // .attr('x2', d => d.target.x)
        // .attr('y2', d => d.target.y)

        _this.links
          .attr('d', function (d) {
            if (d.source.x < d.target.x) {
              return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
            } else {
              return 'M ' + d.target.x + ' ' + d.target.y + ' L ' + d.source.x + ' ' + d.source.y
            }
          })
          .attr('marker-end', function (d) {
            if (d.source.x < d.target.x) {
              return 'url(#positiveMarker)'
            } else {
              return null
            }
          })
          .attr('marker-start', function (d) {
            if (d.source.x < d.target.x) {
              return null
            } else {
              return 'url(#negativeMarker)'
            }
          })

        _this.nodes
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)

        _this.nodeText
          .attr('x', d => d.x)
          .attr('y', d => d.y)
      })
    },

    updateGraph (data) {
      var _this = this
      const links = data.links
      const nodes = data.nodes

      _this.links = _this.links
        .data(links)
        .enter()
        .append('path')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.sqrt(d.value))
        .attr('marker-end', 'url(#positiveMarker)')
        .merge(_this.links)
        .attr('class', 'link')
        // .attr('id', d => d.source + '_' + d.relationship + '_' + d.target)
        .attr('id', function (d) {
          if (typeof (d.source) === 'object') {
            return d.source.id + '_' + d.relationship + '_' + d.target.id
          } else {
            return d.source + '_' + d.relationship + '_' + d.target
          }
        })

      _this.linksText = _this.linksText
        .data(links)
        .enter()
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'red')
        .style('font-size', '10px')
        .style('font-weight', 'bold')
        .append('textPath')
        .attr('xlink:href', d => '#' + d.source + '_' + d.relationship + '_' + d.target)
        .attr('startOffset', '50%')
        .merge(_this.linksText)
        .text(function (d) {
          return d.relationship
        })
        .attr('class', 'link-text')

      _this.nodes = _this.nodes
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 30)
        .attr('fill', _this.color)
        .merge(_this.nodes)
        .on('click', _this.queryNode)
        .call(_this.drag(_this.simulation))

      _this.nodes.append('title')
        .text(d => d.id)

      _this.nodeText = _this.nodeText
        .data(nodes)
        .enter()
        .append('text')
        .merge(_this.nodeText)
        .text(function (d) {
          return d.id
        })
        .style('text-anchor', function (d) {
          return 'middle'
        })
        // .attr('dx', function () {
        //   return this.getBoundingClientRect().width / 2 * (-1)
        // })
        // .attr('dx', -50)
        .attr('dy', 45)
        .attr('class', 'node-text')

      _this.simulation.nodes(nodes)
      _this.simulation.force('link').links(links)
      _this.simulation.alpha(1).restart()
    },

    color (d) {
      // const scale = d3.scaleOrdinal(d3.schemeCategory10)
      // return scale(d.group)

      return this.colorList[d.group]
    },

    drag (simulation) {
      function dragstarted (d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged (d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended (d) {
        if (!d3.event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    },

    queryNode (d) {
      var _this = this
      let data = {}
      for (var element in d.object) {
        let isArray = d.object[element] instanceof Array
        if (!isArray) {
          data[element] = d.object[element]
        }
      }
      _this.$refs.detailPanel.currentNode = data
      // console.log(_this.$refs.detailPanel.currentNode)
      // console.log(d.object)
      var url = 'person/actedby/' + d.id
      this.axios.get(url)
        .then(function (response) {
          if (response.status === 200) {
            for (var i = 0; i < response.data.length; i++) {
              let flag = true
              for (var j = 0; j < _this.testGraph.nodes.length; j++) {
                if (_this.testGraph.nodes[j].id === response.data[i].id) {
                  flag = false
                  break
                }
              }
              if (flag) {
                _this.testGraph.nodes.push(response.data[i])
                _this.testGraph.links.push({
                  'source': d.id,
                  'target': response.data[i].id,
                  'value': 5,
                  'relationship': 'ACTED_IN'
                })
              }
            }
            _this.updateGraph(_this.testGraph)
            // console.log(_this.testGraph)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .node{
    stroke: #000000;
    stroke-width:1;
    cursor: pointer;
  }
  .node:hover{
    stroke-width:5;
  }
</style>
