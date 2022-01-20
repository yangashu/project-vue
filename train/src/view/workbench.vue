<template>
  <div id="max">
    <el-row :gutter="24" id="row1">
      <el-col :span="4" id="col1">
        <div class="d1"></div>
        <p style="margin-left: 5px">今日统计</p>
      </el-col>
      <el-divider></el-divider>
    </el-row>
    <el-row :gutter="24" id="row2">
      <el-col :span="6">
        <el-card shadow="hover" body-style="{padding:0px}" @click="mythree" class="card">
          <p class="aaa">员工考勤</p>
          <el-divider></el-divider>
          <div style="text-align: center">
            <p>实到{{ a }}人 / 应到{{ b }}人</p>
            <el-progress
              :text-inside="true"
              :stroke-width="30"
              :percentage="c"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-style="{padding:0px}" class="card">
          <p class="aaa">学员签到</p>
          <el-divider></el-divider>
          <div id="abc1" style="width: 100%; height: 100%"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-style="{padding:0px;}" class="card">
          <p class="aaa">课务情况</p>
          <el-divider style="margin-bottom:0px;"></el-divider>
          <div class="aa">
            <p class="a1 a">已上课数：0</p>
            <p class="a2 a" style="margin-left: 28%">应上课数：0</p>
            <br />
            <p class="a3 a">布置作业：0次</p>
            <p class="a4 a" style="margin-left: 23%">上传附件：0次</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-style="{padding:0px}" class="card">
          <p class="aaa">消息通知</p>
          <el-divider></el-divider>
          <div
            id="abc2"
            style="width: 100%; height: 100%; margin-top: -10px"
          ></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="row3" :gutter="24">
      <el-col :span="12" id="col3">
        <div id="d1"></div>
        <p>快捷入口</p>
        <el-divider></el-divider>
        <div class="ccs">
          <el-card shadow="hover" class="cc cc1">
            <img
              src="http://m.tlybond.com/img/xinshengbaoming.e973470c.png"
              class="myImg"
            />
            <p class="spa">新生报名</p>
          </el-card>
          <el-card shadow="hover" class="cc cc2">
            <img
              src="	http://m.tlybond.com/img/kebiaochakan.5954b044.png"
              class="myImg"
            />
            <p class="spa">课表查看</p>
          </el-card>
          <!--  -->
          <el-card shadow="hover" class="cc cc2">
            <img
              src="http://m.tlybond.com/img/kuaisupaike.2c703d99.png"
              class="myImg"
            />
            <p class="spa">快速排课</p>
          </el-card>
          <el-card shadow="hover" class="cc cc1">
            <img
              src="http://m.tlybond.com/img/dingdanguanli.055d0c16.png"
              class="myImg"
            />
            <p class="spa">订单管理</p>
          </el-card>

          <el-card shadow="hover" class="cc cc3">
            <img
              src="http://m.tlybond.com/img/qiankedengji.35f46912.png"
              class="myImg"
            />
            <p class="spa">潜客登记</p>
          </el-card>
          <el-card shadow="hover" class="cc cc3">
            <img
              src="http://m.tlybond.com/img/laoshibeike.f686fdac.png"
              class="myImg"
            />
            <p class="spa">老师备课</p>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12" id="col4">
        <div id="d1"></div>
        <p>机构统计</p>
        <el-divider></el-divider>
        <div class="ccs">
          <el-card shadow="hover" class="ccc">
            <div
              class="qqq"
              style="background-color: rgba(103, 194, 58, 0.2); color: #67c23a"
            >
              <el-icon>
                <user class="use"></user>
              </el-icon>
            </div>
            <h2 class="pp">{{zd}}</h2>
            <p class="ppx">在读学员</p>
          </el-card>
          <el-card shadow="hover" class="ccc ccc2">
            <div
              class="qqq"
              style="background-color: rgba(245, 108, 108, 0.2); color: #f56c6c"
            >
              <el-icon>
                <coin class="use"></coin>
              </el-icon>
            </div>
            <h2 class="pp">5</h2>
            <p class="ppx">总订单数</p>
          </el-card>
          <!--  -->
          <el-card shadow="hover" class="ccc">
            <div
              class="qqq"
              style="background-color: rgba(64, 158, 255, 0.2); color: #409eff"
            >
              <el-icon>
                <scaletooriginal class="use"></scaletooriginal>
              </el-icon>
            </div>
            <h2 class="pp">5</h2>
            <p class="ppx">开设班级</p>
          </el-card>
          <el-card shadow="hover" class="ccc ccc2">
            <div
              class="qqq"
              style="background-color: rgba(255, 102, 0, 0.2); color: #f60"
            >
              <el-icon>
                <money class="use"></money>
              </el-icon>
            </div>
            <h2 class="pp">5</h2>
            <p class="ppx">订单总金额</p>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row id="row4" :gutter="24">
      <el-col :span="12" id="col5">
        <el-card shadow="none" style="height: 400px">
          <div style="width: 100%; height: 30px; margin-top: -30px">
            <div id="d1" style="display: inline-block"></div>
            <p style="display: inline-block; margin-left: 5px">新增咨询</p>
          </div>
          <div id="abc3" style="width: 100%; height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12" id="col6">
        <el-card shadow="none" style="height: 400px">
          <div style="width: 100%; height: 30px; margin-top: -30px">
            <div id="d1" style="display: inline-block"></div>
            <p style="display: inline-block; margin-left: 5px">新增学员</p>
          </div>
          <div id="abc4" style="width: 100%; height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="row5" :gutter="24">
      <el-col id="col7" :span="24">
        <el-card shadow="none" style="height: 400px">
          <div id="abc5" style="width: 100%; height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { User, ScaleToOriginal, Coin, Money } from "@element-plus/icons";
export default {
  data() {
    return {
      a: 0,
      b: 0,
      c: null,
      optionAll: null,
      myChartAll: null,
      zd:0
    };
  },
  components: {
    user: User,
    scaletooriginal: ScaleToOriginal,
    coin: Coin,
    money: Money,
  },
  methods: {
    myEchart1() {
      this.optionAll = {
        tooltip: {
          trigger: "item",
          // show:'true'
        },
        legend: {
          orient: "vertical",
          x: "left",
          y: "center",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            left: "70%",
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 10,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 0, name: "应到" },
              { value: 0, name: "实到" },
              { value: 0, name: "请假" },
            ],
          },
        ],
      };
      var chartDom = document.getElementById("abc1");
      this.myChartAll = echarts.init(chartDom);
      this.myChartAll.showLoading();  

      this.axios
        .get("http://localhost:9090/student/one")
        .then((response) => {
          this.optionAll.series[0].data[0].value = parseInt(response.data);
          this.zd=parseInt(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.axios
        .get("http://localhost:9090/studentattend/one")
        .then((response) => {
          this.optionAll.series[0].data[2].value = parseInt(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.axios
        .get("http://localhost:9090/studentattend/two")
        .then((response) => {
          this.optionAll.series[0].data[1].value = parseInt(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    myEchart2() {
      var chartDom = document.getElementById("abc2");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          x: "left",
          y: "center",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "80%",
            left: "70%",
            top: "10px",
            label: {
              show: false,
            },
            // top: "10px",
            data: [
              { value: 1, name: "通知" },
              { value: 2, name: "个人收件箱" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    myEchart3() {
      var chartDom = document.getElementById("abc3");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: [
            "10/01",
            "",
            "",
            "10/04",
            "",
            "",
            "10/07",
            "",
            "",
            "10/10",
            "",
            "",
            "10/13",
            "",
            "",
            "10/16",
            "",
            "",
            "10/19",
            "",
            "",
            "10/22",
            "",
            "",
            "10/25",
            "",
            "",
            "10/28",
            "",
            "",
            "10/31",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              1,
              1,
              1,
              1,
              ,
              0,
              0,
              2,
              3,
              0,
              6,
              1,
              0,
              2,
              0,
              3,
              0,
              0,
              2,
              0,
              0,
              3,
              4,
              0,
              4,
              3,
              6,
              2,
              4,
              5,
              5,
            ],
            type: "bar",
            barWidth: 10,
          },
        ],
      };
      myChart.setOption(option);
    },
    myEchart4() {
      var chartDom = document.getElementById("abc4");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: "category",
          data: [
            "10/01",
            "",
            "",
            "10/04",
            "",
            "",
            "10/07",
            "",
            "",
            "10/10",
            "",
            "",
            "10/13",
            "",
            "",
            "10/16",
            "",
            "",
            "10/19",
            "",
            "",
            "10/22",
            "",
            "",
            "10/25",
            "",
            "",
            "10/28",
            "",
            "",
            "10/31",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 4, 3, 6, 2, 4, 5, 5,
            ],
            type: "bar",
            barWidth: 10,
          },
        ],
      };
      myChart.setOption(option);
    },
    myEchart5() {
      var chartDom = document.getElementById("abc5");
      var myChart = echarts.init(chartDom);
      var option;

      const colors = ["#5470C6", "#EE6666"];
      option = {
        color: colors,
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {},
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1],
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Precipitation  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            // prettier-ignore
            data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0],
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Precipitation  " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            // prettier-ignore
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Precipitation(2015)",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
              focus: "series",
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "Precipitation(2016)",
            type: "line",
            smooth: true,
            emphasis: {
              focus: "series",
            },
            data: [
              3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3,
              0.7,
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
    myone() {
      this.axios
        .get("http://localhost:9090/staff/one")
        .then((response) => {
          this.b = parseInt(response.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.axios
        .get("http://localhost:9090/satffsign/one")
        .then((response) => {
          this.a = parseInt(response.data);
          this.c = ((this.a / this.b) * 100).toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    mytwo() {
      this.myChartAll.setOption(this.optionAll);
      this.myChartAll.hideLoading();
    },
    mythree(){
      this.$router.push("/punch");
    }
  },
  computed: {
  },
  mounted() {
    this.myone();
    this.myEchart1();
    this.myEchart2();
    this.myEchart3();
    this.myEchart4();
    this.myEchart5();
    setInterval(() => {
      this.mytwo()
    }, 500);
  },
  created() {},
};
</script>
<style>
*{
    margin: 0;
    padding: 0;
    
}
#max{
    width: 100%;
    height:93vh;
    /* border: 1px solid red; */
    overflow: hidden;
    /* overflow-y:auto; */
    background-color: rgb(245,247,250);
}
#row1{
    height: 20px;
    width: 100%;
    margin-bottom: 20px;
}
#row1>.el-divider{
    margin-top: 3px;
    margin-left: 0.5%;
    width: 100%;
}
#col1{
    height: 20px;
    /* width: 1200px; */
}
#col1>div{
    border-radius: 360px;
    background-color: coral;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0px;
}
#col1>p{
    width: 100px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
}
.card{
    height:200px;
}
.el-card{
    line-height: 70px;
    /* height:200px; */
    text-align: left;
}
.aaa{
    height: 50px;
    position: absolute;
    top: 0px;
}
.aa{
    height: 100%;
    width: 100%;
}
.a{
    display: inline;
    width: 100px;
}
#d1{
    border-radius: 360px;
    background-color: coral;
    display: inline-block;
    width: 10px;
    height: 10px;
}
#row2{
  width: 100%;
  margin-bottom: 20px;
}
#row3{
  width: 100%;
}
#col3{
  margin-top: 0px;
  width: 100%;
  height: 100%;
}
#col3>p{
    height: 20px;
    line-height: 20px;
    display: inline-block;
    margin-left: 0.5%;
}
#col3>.el-divider{
    width: 100%;
    margin-top: 0px;
    margin-bottom: 1%;
}
#col4{
    margin-top: 0px;
    width: 100%;
    height: 100%;
}
#col4>p{
    height: 20px;
    line-height: 20px;
    display: inline-block;
    margin-left: 0.5%;
}
#col4>.el-divider{
    width: 100%;
    margin-top: 0px;
    margin-bottom: 1%;
}
.myImg{
    width: 50px;
    height: 50px;
    display: inline-block;
    /* margin-bottom: 5%; */
}
.ccs{
    width: 100%;
    height: 100%;
}
.cc{
    line-height: 130px;
    text-align: center;
    height: 130px;
    margin-bottom: 10px;
    padding: 0px;
    width: 32%;
    float: left;
}
.cc2,.cc3{
    margin-left: 1.5%;
}
.spa{
    width: 100px;
    height: 30px;
    text-align: left;
    display: inline-block;
    line-height: 30px;
    position: relative;
    top: -18px;
}
.ccc{
    text-align: center;
    height: 130px;
    margin-bottom: 10px;
    width: 48.2%;
    float: left;  
}
.ccc2{
  margin-left: 2.9%;
}
.qqq{
    width: 50px;
    height: 50px;
    border-radius: 360px;
    display: inline-block;
    line-height: 60px;
    text-align: center;
}
.use{
    font-size: 25px;
    display: inline-block;
    margin-left: -5px;
}
.pp{
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: relative;
    top: -30px;
    display: inline-block;
}
.ppx{
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: relative;
    top: -80px;
    display: inline-block;
}
#row4{
    height: 400px;
    width: 100%;
    margin-bottom: 20px;
}
#row5{
  width: 100%;
  height: 400px;
}
</style>