<template>
  <div>
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="this.userfromdialogVisible = true,this.title='用户添加'"
        >新增</el-button
      >
      <el-popconfirm title="确定删除这些记录吗？" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>

    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
      ></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="paging()"
        >查询</el-button
      >
    </div>
    <!--列表-->
    <el-table
      ref="multipleTable"
      border
      stripe
      :data="userData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="头像" width="50">
        <template #default="scope">
          <el-avatar v-if="scope.row.personal.personalAvatar==null" size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-avatar v-else size="small" :src="scope.row.personal.personalAvatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="staffName" label="用户名" width="120">
      </el-table-column>
      <el-table-column label="角色名称" width="180">
        <template #default="scope">
          <el-tag
            style="margin-right: 5px"
            size="small"
            type="info"
            v-for="item in scope.row.positions"
            >{{ item.positionName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="personal.personalMail" label="邮箱">
      </el-table-column>
      <el-table-column prop="personal.personalPhone" label="手机号"> </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.staffState == 0" size="small" type="success"
            >正常</el-tag
          >
          <el-tag
            v-else-if="scope.row.staffState == 1"
            size="small"
            type="danger"
            >禁用</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="personal.personalInterview" label="创建时间" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text">分配角色</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="useredit(scope.row),this.title='用户信息'">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            title="确定删除这些记录吗？"
            @confirm="handleDelete(scope.row.staffId)"
          >
            <template #reference>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--页码-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[5, 10, 15]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog
      v-model="userfromdialogVisible"
      :title="title"
      width="30%"
      @closed="handleClose('userfrom')"
      center
    >
      <el-card style="margin: 10px">
        <el-form
          ref="userfrom"
          :model="userfrom"
          :rules="userfrom"
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
                v-if="userfrom.personal.personalAvatar"
                :src="userfrom.personal.personalAvatar"
                class="avatar avatar-uploader-icon"
              />
              <el-icon v-else :src="userfrom.personal.personalAvatar" class="avatar-uploader-icon"><plus /></el-icon>
              <!-- <i v-else class="avatar-uploader-icon"><i-plus /></i> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="staffName">
            <el-input v-model="userfrom.staffName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="staffPass">
            <el-input v-model="userfrom.staffPass" show-password></el-input>
          </el-form-item>
          <el-col :span="24">
            <el-form-item label="出生日期" prop="personalBirthday">
              <el-date-picker
                v-model="userfrom.personal.personalBirthday"
                type="date"
                placeholder="选择日期"
                @change="getAge()"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-form-item label="年龄" prop="personalAge">
            <el-input v-model="userfrom.personal.personalAge"></el-input>
          </el-form-item>

          <el-form-item label="身份证" prop="personalIdcard">
            <el-input v-model="userfrom.personal.personalIdcard"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="personalPhone">
            <el-input v-model="userfrom.personal.personalPhone"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="personalMail">
            <el-input v-model="userfrom.personal.personalMail"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="personalMail">
            <el-select  v-model="ids" filterable  multiple placeholder="请选择">
              <el-option
                v-for="item in roleoption"
                :key="item.positionId"
                :label="item.positionName"
                :value="item.positionId"
              >
              </el-option>
            </el-select>
        
          </el-form-item>
          <el-form-item label="性别" prop="personalSex">
            <el-radio-group v-model="userfrom.personal.personalSex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="staffState">
            <el-radio-group v-model="userfrom.staffState">
              <el-radio label="1" value="1">禁用</el-radio>
              <el-radio label="0" value="0">正常</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="text-align: center">
            <el-button @click="update">取消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
          </div>
        </el-form>
      </el-card>
    </el-dialog>

    <!-- 分配角色对话框 -->
    
  </div>
</template>

<script>
import request from "../../../utils/request";
export default {
  data() {
    return {
        headers: {
         "dataType":"jsonp",
        "constnet-type": "multipart/form-data;boundary=" + new Date().getTime(),
        "token": localStorage.getItem("token"),
        "isNative":true,
      },
      title:"",
      userData: [],
      userfrom: {personal:{}},
      roleoption:[],
      current: 1,
      size: 10,
      total: 11,
      search: "",
      ids: [],
      userfromdialogVisible: false,
    };
  },
  methods: {
    // 关闭弹窗
    handleClose(){
      this.userfrom={personal:{}}
      this.ids=[]
    },
    // 计算年龄
    getAge() {
      let birthdays = new Date(this.userfrom.personalBirthday);
      let d = new Date();
      this.userfrom.personalAge =
        d.getFullYear() -
        birthdays.getFullYear() -
        (d.getMonth() < birthdays.getMonth() ||
        (d.getMonth() == birthdays.getMonth() &&
          d.getDate() < birthdays.getDate())
          ? 1
          : 0);
    },
    handleAvatarSuccess(res, file) {
      this.userfrom.personal.personalAvatar = res.data;
    },
    //限制上传时的文件格式大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 和 Png 或Gif 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 3MB!");
        return false;
      }
    },
    //分页
    handleSizeChange(val) {
      this.size = val;
      this.paging();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.paging();
    },
    
    // 分页查询
    paging() {
      request
        .get("/sys-staff/paging", {
          params: {
            page: this.current,
            size: this.size,
            search: this.search,
          },
        })
        .then((res) => {
          if(res.code=="0"){
            this.userData = res.data.records;
          this.current = res.data.current;
          this.size = res.data.size;
          this.total = res.data.total;
          }else{
            this.$message.error(res.msg)
          }
          
        });
    },
     // 根据id删除
    handleDelete(id) {
      request
        .delete("/sys-staff/deleteByid", { params: { id: id } })
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              type: "success",
              message: res.msg,
            });
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
          this.paging(); // 删除之后重新加载表格的数据
        });
    },
    // 批量删除
    deleteBatch() {
      if (!this.ids.length) {
        this.$message.warning("请选择数据！");
        return;
      }
      request.post("/sys-staff/deleteBatchIds", this.ids).then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.$message.success(res.msg);
          this.paging();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 获取选中的数据
    handleSelectionChange(val) {
      this.ids = val.map((v) => v.staffId); // [{id,name}, {id,name}] => [id,id]
    },
    useredit(row){
      this.findrole()
      this.userfromdialogVisible=true;
      request.get("/sys-staff/findByid",{params:{id:row.staffId}})
      .then(res=>{
        res.data.staffState=JSON.stringify(res.data.staffState)
      res.data.positions.forEach(element => {
        this.ids.push(element.positionId)
      });
      console.log(res.data);
      this.userfrom=res.data
      })
      
    },
    // 添加
    save() {
      request.post("/sys-staff/insert",{staff:this.userfrom,ids:this.ids}).then((res) => {
        console.log(res);
        if (res.code == "200") {
          this.userfromdialogVisible = false;
          this.$message.success(res.msg);
          this.paging();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err=>{
 this.$message.error("操作有误！！！");
      });
    },
    // 查询全部角色
    findrole(){
      request
        .get("/sys-position/paging", {
          params: {
            page: 1,
            size: 9999,
            keyword: this.search,
          },
        })
        .then((res) => {
         this.roleoption=res.data.records
        });
    },
  },
  created() {
    this.paging();
    // this.findrole();
  },
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