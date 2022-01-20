<template>


  <div>
    <img src="http://localhost:9090/files/e0851e00939241a08bb26e775aebc2d4" alt="">
      <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="id" label="编号" />
     <el-table-column label="头像">
        <template #default="scope">
          {{scope.row.avatar}}
          <el-avatar v-if="scope.row.avatar==null" size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-avatar v-else size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
  </el-table>
  
  <el-form
          ref="userfrom"
          :model="from"
          :rules="from"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item style="text-align: center" label-width="0">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:9090/files/upload"
              :headers="headers"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="from.avatar"
                :src="from.avatar"
                class="avatar avatar-uploader-icon"
              />
                <!-- <el-image
              v-if="tableData.avatar"
                :src="tableData.avatar"
                class="avatar avatar-uploader-icon">
          </el-image> -->
              <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
              <!-- <i v-else class="avatar-uploader-icon"><i-plus /></i> -->
            </el-upload>
          </el-form-item>
        <el-form-item style="text-align: center" label-width="0">
            <template #default="scope">
          <el-button @click="update()">保存</el-button>
        </template>
          </el-form-item>
  </el-form>
  </div>
</template>

<script>
import request from '../../../utils/request';
export default {
   computed: {
        Myhead: function () {
      //    let  headers={
      //   "constnet-type": "multipart/form-data;boundary=" + new Date().getTime(),
      //   "Authorization": localStorage.getItem("token"),
      //   "isNative":true,
      // },
             return {token: localStorage.getItem("token")}
        }
    },
  data() {
    return {
      tableData:[],
      from:{},
       headers: {
         "dataType":"jsonp",
        "constnet-type": "multipart/form-data;boundary=" + new Date().getTime(),
        "token": localStorage.getItem("token"),
        "isNative":true,
      },
    };
  },
  methods: {
    edit(row){
      console.log(row.id);
      request.get("/Avatar/findByid",{params:{id:row.id}}).then(res=>{
        if(res.code=="0"){
          this.$message.success(res.msg)
          this.from=res.data
        }
      })
    },
    update(){
      request.post("/Avatar/update",this.from).then(res=>{
        if(res.code=="0"){
          this.a()
        }
      })
    },
    a(){request.get("/Avatar/list").then(res=>{
     this.tableData=res.data
   }) },

    handleAvatarSuccess(res){
      console.error(res);
      this.from.avatar=res.data
    },
   
  },
  created () {
   this.a()
  }
};
</script>

<style>
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