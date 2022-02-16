<template>
  <div>
      <el-row :gutter="24">
          <el-input
            style="width: 20%; margin-left: 0.7%"
            class="input1"
            placeholder="请根据姓名查询"
            v-model="pageInfo.like"
            @keyup.enter.native="selectLike()"
          ></el-input>
          <el-button
            type="danger"
            style="width: 100px; height: 30px; margin-left: 0.5%"
            @click="selectLike()"
          >
            查询&nbsp;&nbsp;<el-icon><search /></el-icon>
          </el-button>
        </el-row>
        <el-row>
          <el-table
            ref="mt"
            :data="staffData"
            style="width: 100%"
          >
            <el-table-column label="员工编号" prop="staffId"></el-table-column>
            <el-table-column label="系统用户名" prop="staffName"></el-table-column>
            <el-table-column label="员工姓名" prop="personalName"></el-table-column>
            <el-table-column label="性别" prop="personalSex"></el-table-column>
            <el-table-column label="联系电话" prop="personalPhone"></el-table-column>
            <el-table-column label="邮箱" prop="personalMail"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                  <el-button type="primary" @click="dialogEject(scope.row.staffId)">更新</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
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
        title="录入新人脸"
        center="true"
        :before-close="dialogClose"
        width="40%">
          <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
          <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
        </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data() {
    return {
        videoWidth: 250,
        videoHeight: 250,
        imgSrc: "",
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        openVideo:false,
        aaa:null,
      //========================================================================================
        dialogVisible:false,
        id:0,
        staffData:[],
        pageInfo:{
        currentPage: 1,
        pagesize: 3,
        total: 0,
        like: "",
      },
    };
  },
  methods: {
    //分页刷新方法
    Refresh(){
      request.get("/sys-staff/two",{params:this.pageInfo})
      .then(response =>{
        this.staffData=response.records;
        this.pageInfo.total = response.total;
      })
      .catch(error =>{
        console.log(error)
      })
    },
    //分页方法页数
    handleCurrentChange(page) {
      this.pageInfo.currentPage = page;
      request
        .get("/sys-staff/two", { params: this.pageInfo })
        .then((response) => {
          this.staffData = response.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分页方法显示多少条
    handleSizeChange(size) {
      this.pageInfo.pagesize = size;
      // console.log(ps);
      request
        .get("/sys-staff/two", { params: this.pageInfo })
        .then((response) => {
          this.staffData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     //模糊查询
    selectLike(){
      request.get("/sys-staff/five",{params:this.pageInfo})
      .then(res =>{
        this.staffData=res.records;
        this.pageInfo.total=res.total;
      })
      .catch(error =>{
        console.log(error)
      })
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function(e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
	  setImage() {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      
      var uu=this.dataURLtoFile(image);
      let fData=new FormData()
      fData.append('url',uu)
      this.axios.post("http://localhost:8080/two",fData)
      .then(function(response){
        console.log(response)
        if(response.data.code=="0"){
          _this.$message({
            type:"success",
            message:response.data.msg
          })
          clearInterval(_this.aaa)
          _this.stopNavigator()
        }else{
          _this.$message({
            type:"error",
            message:response.data.msg
          })
        }
      }).catch(function(err){
        console.log(err)
      })
    },
    // base64转文件，此处没用到
    dataURLtoFile(dataurl, filename='file') {
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
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
      document.getElementById("videoCamera").style.display="none"
    },
    //弹窗方法
    dialogEject(staffId){
      this.dialogVisible=true;
      this.id=staffId;
      this.getCompetence();
    },
    //关闭弹窗
    dialogClose(){
      this.dialogVisible=false;
      this.stopNavigator();
    },
    //人脸更新
    updateFace(){

    }
  },
  created() {
      request.get("/sys-staff/faceOne",{params:this.pageInfo})
    .then(response =>{
      this.staffData=response.records;
      this.pageInfo.total = response.total;
    })
    .catch(error =>{
      console.log(error)
    })
  },
  mounted() {}
};
</script>
<style>
#videoCamera{
    border-radius: 360px;
    margin: auto;
}
.button{
    position: relative;
    top: -200px;
}
</style>