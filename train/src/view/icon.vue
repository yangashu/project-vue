<template>
  <div>
      
    <div id="mian" :style="{ width: '600px', height: '400px' }"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent
} from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
export default{

methods: {
    a(){
        echarts.use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
  RadarChart,
  CanvasRenderer
]);

var myChart = echarts.init(document.getElementById('mian'));
var option;

option = {
  backgroundColor: '#6a7985',
  title: {
    text: '财务统计',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 274, name: 'Union Ads' },
        { value: 235, name: 'Video Ads' },
        { value: 400, name: 'Search Engine' }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgba(255, 255, 255, 0.3)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};

option && myChart.setOption(option);

    }
    
},
mounted () {
    this.a()
}
}
</script>
<style scoped>
</style>