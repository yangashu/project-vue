<template>
  <div>
      <el-upload
    class="avatar-uploader"
    action="http://localhost/9090/files/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
  </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
        imageUrl:''
    };
  },
  methods: {
      handleAvatarSuccess(res){
          console.log(res);
          this.imageUrl=res.data
      }
  },
  created() {},
  mounted() {}
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
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>