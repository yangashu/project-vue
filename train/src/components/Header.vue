<template>
  <div
    style="
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
    "
  >
    <div
      style="
        width: 200px;
        padding-left: 30px;
        font-weight: bold;
        color: dodgerblue;
      "
    >
      后台管理
    </div>
    <div style="flex: 1">
    </div>
    <div style="width: 150px;">
        <el-dropdown>
        <!-- <span class="el-dropdown-link"> -->
          <!-- 头像 -->
          <el-avatar :size="40" :src="user.portraitUrl" style="vertical-align:middle;"></el-avatar>
        <!-- </span> -->
         
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="user-filled"><span @click="this.dialogVisible=true">个人信息</span></el-dropdown-item>
           <router-link to="/login" style="text-decoration: none;"> <el-dropdown-item icon="close-bold">
              退出登录
              
            </el-dropdown-item></router-link>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span style="font-size:14px;margin-left:10px;color:red">{{user.staff.staffName}}</span>
    </div>
    
  <el-dialog
        v-model="dialogVisible"
        title="新增"
        width="30%"
        center
        :before-close="handleClose"
      >  
<div>
    <el-card style="margin: 10px">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item style="text-align: center" label-width="0">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="user.portraitUrl" :src="user.portraitUrl" class="avatar avatar-uploader-icon">
            <el-icon v-else class="avatar-uploader-icon"><i-plus /></el-icon>
            <!-- <i v-else class="avatar-uploader-icon"><i-plus /></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          
          <el-input  disabled v-model="user.staffName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" >
         <el-input v-model="user.personalName"/>
        </el-form-item>
        

         
           <el-col :span="7">
    <el-form-item label="年龄">
     <el-input v-model="user.personalAge"></el-input>
    </el-form-item>
   </el-col>
   
   <el-form-item label="出生日期"> 
   <el-col>
    <el-date-picker v-model="user.personalBirthday" type="date" placeholder="选择日期" style="width: 115%"
     @change="suan"></el-date-picker>
   </el-col>
  </el-form-item>
        
        <el-form-item label="性别">
       <el-radio-group v-model="user.personalSex">
                <el-radio label="男" value="男">男</el-radio>
                <el-radio label="女" value="女">女</el-radio>
              </el-radio-group>
        </el-form-item>
        <el-form-item label="地址">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password></el-input>
        </el-form-item>
        <el-form-item label="余额(￥)">
          <el-input show-password></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-card>

  </div>
  </el-dialog>
  </div>
</template>

<script>
import request from '../utils/request';
export default {
  name: "Header",
  //   props: ['user'],
  data() {
    return {
      dialogVisible:false,
      user:JSON.parse(sessionStorage.getItem("user")),
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("文件",file.result);
      console.log("历史头像",this.user.portraitUrl);
      this.user.portraitUrl = window.URL.createObjectURL(file.raw)
      
      console.log("当前头像",this.user.portraitUrl);
    },
    beforeAvatarUpload(file) {
      this.$message.success(file.result)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    },
    update(){
request.put("/portrait/put",this.user.data).then(res=>{
  console.log("编辑：",res);
  if(res.data.code==="0"){
    this.$message.success(res.data.msg)
    this.dialogVisible=false
  }
})
    }
  },
  created() {},
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px solid rgb(240, 235, 235);
  border-radius: 50%;
}
.avatar-uploader-icon svg {
  padding: 70px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
