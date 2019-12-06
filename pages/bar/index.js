import * as echarts from '../../ec-canvas/echarts';

let chart = null;

Page({
  data: {
    tab: ["昨日","本周","本月"],
    showIndex: 1,  //当前点击  默认为本周
    sector: {
      lazyLoad: true // 延迟加载
    },
    bar: {
      lazyLoad: true // 延迟加载
    },
    zhexian: {
      lazyLoad: true // 延迟加载
    }
  },
  onLoad() {
    //初始化渲染柱形图
    this.barComponent = this.selectComponent("#mychart-dom-bar");
    this.init_bar();
  },
  //初始化饼状图
  init_sector: function () {
    this.sectorComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getSectorOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },

  //饼状图接口
  getSectorOption: function () {
    //return 请求数据
    return {
      color: ["#7088EC", "#EE6F3C"],
      legend: {         //图标
        data: ['上传台量', '成交台量']
      },
      grid: {
        containLabel: true
      },
      series: [{
        label: {
          normal: {
            fontSize: 10
          }
        },
        type: 'pie',
        center: ['50%', '50%'],    //图定位
        radius: [0, '50%'],
        data: [{
          value: 65,
          name: '65%'
        }, {
          value: 35,
          name: '35%'
        }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    }
  },

  //初始化柱状图
  init_bar: function () {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  //柱状图接口
  getBarOption: function(){
    //模拟数据
    var $data = [
      { "time": "11-02", "sc": "30", "cj": "90" },
      { "time": "11-03", "sc": "40", "cj": "80" },
      { "time": "11-04", "sc": "50", "cj": "70" },
      { "time": "11-05", "sc": "60", "cj": "60" },
      { "time": "11-06", "sc": "70", "cj": "50" },
      { "time": "11-07", "sc": "80", "cj": "40" },
      { "time": "11-08", "sc": "90", "cj": "30" },
    ]
    //填在echarts的数据和天数
    var $source = [
      ['product', '上传台量', '成交台量'],
    ];
    for (var i = 0; i < $data.length; i++) {
      $source.push([
        $data[i].time,
        $data[i].sc,
        $data[i].cj
      ])
    }
    console.log($source);
    return {
      legend: {},
      tooltip: {},
      dataset: {
        source: $source
      },
      xAxis: [{   //X轴
        type: 'category',
        axisTick: "true",   //是否显示刻度
        axisLabel: {
          textStyle: {       //坐标轴字体大小
            fontSize: 8
          }
        }
      }],
      yAxis: [{    //Y轴
        axisTick: "false",   //是否显示刻度
        axisLabel: {
          formatter: function () {
            return "";   //坐标轴字体为空
          }
        }

      }],
      series: [
        {
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#7088EC',     //柱形图颜色
              label: {
                show: true,          //是否在顶部显示
                position: 'top',     //定位
                textStyle: {         //顶部字体样式
                  color: '#333',
                  fontSize: 10
                }
              }
            }
          },
        },
        {
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#EE6F3C',
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#333',
                  fontSize: 10
                }
              }
            }
          },
        },
      ]
    }
  },

  //初始化折线图
  init_line: function(){
    this.lineComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getLineOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  //折线图接口
  getLineOption: function(){
    return {
      title: {
        left: 'center'
      },
      color: ["#7088EC", "#EE6F3C"],
      legend: {
        data: ['上传台量', '成交台量']
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisTick: "false",   //是否显示刻度
        axisLabel: {
          formatter: function () {
            return "";   //坐标轴字体为空
          }
        }
      },
      series: [{
        name: '上传台量',
        type: 'line',
        smooth: true,
        data: [10, 35, 65, 27, 78, 40, 33, 11, 36, 65, 30, 65, 40, 33]
      }, {
        name: '成交台量',
        type: 'line',
        smooth: true,
        data: [10, 47, 58, 34, 67, 60, 20, 42, 50, 22, 56, 74, 83, 50]
      }]
    }
  },

  //根据状态判断渲染哪个图
  judgeState: function(state){
    if (state == 0) {   //饼状
      this.sectorComponent = this.selectComponent('#mychart-dom-sector');
      this.init_sector();
    } else if (state == 1){   //柱状
      this.barComponent = this.selectComponent("#mychart-dom-bar");
      this.init_bar();
    }else if(state == 2){   //折线
      this.lineComponent = this.selectComponent("#mychart-dom-line");
      this.init_line();
    }
  },

  //点击事件
  click: function(e){
    if (this.data.showIndex === e.target.dataset.index) {
      return false;
    } else {
      this.setData({
        showIndex: e.target.dataset.index
      })
      this.judgeState(e.target.dataset.index);   //重新渲染
    } 
  }
});
