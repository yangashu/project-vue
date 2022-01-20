<template>
  <div class="body">
    <el-row :gutter="24" class="row1">
      <el-select v-model="a" class="select1">
        <el-option value="员工姓名">员工姓名</el-option>
        <el-option value="联系电话">联系电话</el-option>
      </el-select>
      <el-input
        style="width: 20%"
        class="input1"
        placeholder="请输入你要搜索的内容"
        v-model="b"
        @keyup.enter.native="selectLike()"
      ></el-input>
      <el-button type="danger" style="height: 30px" @click="selectLike()">
        <el-icon><search /></el-icon>
      </el-button>
    </el-row>
    <el-row :gutter="24">
      <el-table ref="mt" :data="staffData" style="width: 100%">
        <el-table-column prop="staffId" label="员工编号"></el-table-column>
        <el-table-column prop="personalName" label="姓名"></el-table-column>
        <el-table-column
          prop="personalPhone"
          label="联系电话"
        ></el-table-column>
        <el-table-column prop="signDate" label="上次打卡时间"></el-table-column>
        <el-table-column prop="signState" label="状态">
          <template #default="scope">
            <div v-if="scope.row.signState == 0" style="color: red">未打卡</div>
            <div v-if="scope.row.signState == 1" style="color: green">
              已打卡
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.signState == 0"
              type="primary"
              @click="ab()"
              >打卡</el-button
            >
            <el-button v-if="scope.row.signState == 1" type="danger" disabled
              >打卡</el-button
            >
            <el-button
              type="primary"
              @click="abb(scope.row.staffId, scope.row.personalName)"
              >查看本月考勤</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="24">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[2, 3, 5, 10]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </el-row>
    <el-dialog
      v-model="dialogVisible"
      title="识别人脸中。。。"
      center="true"
      width="30%"
      :before-close="stopNavigator"
    >
      <div class="camera_outer">
        <video
          id="videoCamera"
          :width="videoWidth"
          :height="videoHeight"
          autoplay
        ></video>
        <canvas
          style="display: none"
          id="canvasCamera"
          :width="videoWidth"
          :height="videoHeight"
        ></canvas>
      </div>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible1"
      title="本月考勤情况"
      center="true"
      width="30%"
    >
      <el-calendar ref="value" id="calendar" :data="canData">
        <template #header="daaa">
          <span>{{ daaa.date }}</span>

          <span
            >用户：<span style="color: green">{{ name }}</span></span
          >
        </template>

        <template #dateCell="{ data }">
          <p style="width: 100%; text-align: center">
            {{ data.day.split("-")[2] }}
          </p>
          <br />
          <div v-for="item in canData" :key="item">
            <div v-if="item.year == data.day.split('-')[0]">
              <p v-if="item.month == data.day.split('-')[1]">
                <span
                  v-if="item.day == data.day.split('-')[2]"
                  style="
                    width: 50%;
                    text-align: center;
                    color: green;
                    margin-left: 33%;
                  "
                  >✔️</span
                >
              </p>
            </div>
          </div>
        </template>
      </el-calendar>
    </el-dialog>
  </div>
</template>



<script>
import { Search } from "@element-plus/icons";
import qs from "qs";
import { ref } from "vue";
import request from '../../utils/request';
export default {
  data() {
    return {
      a: "员工姓名",
      b: "",
      name: "",
      staffData: [],
      daaa: new Date(),
      canData: [],
      pageInfo: {
        currentPage: 1,
        pagesize: 2,
        total: 0,
      },
      videoWidth: 250,
      videoHeight: 250,
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      dialogVisible: false,
      dialogVisible1: false,
      aaa: null,
      value: ref(),
    };
  },
  components: {
    search: Search,
  },
  methods: {
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      request
        .get("/satffsign/two", { params: this.pageInfo })
        .then(response => {
          // console.log("1-------------------------------------------")
          // console.log(response.data)
          this.staffData = response.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      // var _this=this
      this.pageInfo.pagesize = size;
      var ps = qs.stringify(this.pageInfo);
      // console.log(ps);
      request
        .get("http://localhost:9090/satffsign/two", { params: this.pageInfo })
        .then(response => {
          // console.log("2-------------------------------------------")
          // console.log(response.data)
          this.staffData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = "block";
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
        })
        .catch((err) => {
          console.log(err);
        });
      this.aaa = setInterval(() => {
        this.setImage();
      }, 3000);
    },
    //  绘制图片（拍照功能）
    setImage() {
      // canvas画图
      this.thisContext.drawImage(
        this.thisVideo,
        0,
        0,
        this.videoWidth,
        this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");

      var uu = this.dataURLtoFile(image);
      let fData = new FormData();
      fData.append("url", uu);
      request
        .post("http://localhost:9090/Face/one", fData)
        .then((response) => {
          // console.log(response)
          if (response.code == "0") {
            this.$message({
              type: "success",
              message: response.msg,
            });
            clearInterval(this.aaa);
            this.stopNavigator();
          } else {
            this.$message({
              type: "error",
              message: response.msg,
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //保存图片方法，此方法未用到
    aaa() {
      var img = document.getElementById("abc"); // 获取要下载的图片
      var url = img.src; // 获取图片地址
      var a = document.createElement("a"); // 创建一个a节点插入的document
      var event = new MouseEvent("click"); // 模拟鼠标click点击事件
      a.download = "111"; // 设置a节点的download属性值
      a.href = url; // 将图片的src赋值给a节点的href
      a.dispatchEvent(event); // 触发鼠标点击事件
    },
    // 关闭摄像头
    stopNavigator(done) {
      this.thisVideo.srcObject.getTracks()[0].stop();
      document.getElementById("videoCamera").style.display = "none";
      this.dialogVisible = false;
      clearInterval(this.aaa);
      this.handleCurrentChange(this.pageInfo.currentPage);
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename = "file") {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      // let suffix = mime.split('/')[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    ab() {
      this.dialogVisible = true;
      setTimeout(() => {
        this.getCompetence();
      }, 500);
    },
    abb(staffId, name) {
      this.dialogVisible1 = true;
      this.name = name;
      request
        .post("/one?staffId=" + staffId)
        .then((response) => {
          console.log(response);
          this.canData.length = 0;
          for (var i = 0; i < response.length; i++) {
            const ssign = { year: "", month: "", day: "", jg: "true" };
            ssign.year = response[i].attendanceDate.substring(0, 4);
            ssign.month = response[i].attendanceDate.substring(5, 7);
            ssign.day = response[i].attendanceDate.substring(8, 10);
            this.canData.push(ssign);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectLike() {
      //模糊查询方法
      var information = this.b;
      var mode = this.a;
      var mycurrentPage = this.pageInfo.currentPage;
      var mypagesize = this.pageInfo.pagesize;
      var mytotal = this.pageInfo.total;
      var obj = { information, mode, mycurrentPage, mypagesize, mytotal };
      request
        .get("http://localhost:9090/personal/one", { params: obj })
        .then((response) => {
          this.staffData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    request
      .get("/satffsign/two", { params: this.pageInfo })
      .then((response) => {
        this.staffData = response.records;
        this.pageInfo.total = response.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {},
};
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
  /* font-size: 20px; */
}
.body {
  width: 100%;
  height: 93vh; 
  background-color: rgb(245, 247, 250);
}
.row1 {
  width: 100%;
  margin-bottom: 1%;
}
.input1 {
  margin-left: 0.2%;
  display: inline-block;
}
.select1 {
  margin-left: 1%;
  width: 100px;
  display: inline-block;
}
#videoCamera {
  border-radius: 360px;
  margin: auto;
}
</style>