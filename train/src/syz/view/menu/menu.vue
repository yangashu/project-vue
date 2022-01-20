<template>
  <div>
    <!-- 表单 -->
    <div>
       <div style="margin: 10px 0">
      <el-input v-model="keyword" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button icon="search" type="primary" style="margin-left: 5px;padding:0px 15px" @click="paging()" >查询</el-button>
      <el-button icon="plus" type="primary" @click="dialogVisible = true" style="padding:0 15px">新增</el-button>
    </div>
      

      <el-dialog
        v-model="dialogVisible"
        title="新增"
        width="30%"
        center
        :before-close="handleClose"
      >
   
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="父级菜单">
              <el-select v-model="ruleForm.menuPid" placeholder="父级菜单">
                <template v-for="item in this.menuForm">
                     <el-option :label="item.menuName" :value="item.menuId"></el-option>
                     <template v-for="child in item.children">
                        <el-option :label="child.menuName" :value="child.menuId">
                           <span style="padding:20px">{{ '- ' + child.menuName }}</span>
                        </el-option>
                     </template>
                  </template>
                <!-- <el-option
                  v-for="form in menulist"
                  :key="form"
                  :label="form.menuName"
                  :value="form.menuId"
                >
               
                </el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="权限名称" prop="menuName">
              <el-input v-model="ruleForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="权限编码" prop="menuPerms">
              <el-input v-model="ruleForm.menuPerms"></el-input>
            </el-form-item>

            <el-form-item label="菜单URL" prop="menuUrl">
              <el-input v-model="ruleForm.menuUrl"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="menuIcon">
              <el-input v-model="ruleForm.menuIcon"></el-input>
            </el-form-item>
            <el-form-item label="菜单组件" prop="menuComponent">
              <el-input v-model="ruleForm.menuComponent"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="ruleForm.menuType">
                <el-radio label=0 value="0">目录</el-radio>
                <el-radio label=1 value="1">菜单</el-radio>
                <el-radio label=2 value="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="ruleForm.menuState">
                <el-radio label="0" value="0">正常</el-radio>
                <el-radio label="1" value="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>

        <template #footer>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="dialogVisible = false,this.ruleForm={}"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </template>
      </el-dialog>
    </div>
    <!-- 表格数据显示 -->
       <el-table
      :data="menulist"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      border
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column prop="menuId" label="编号" row-key="menuId"> </el-table-column> -->
      <el-table-column prop="menuName" label="名称" row-key="menuId" align="center"> </el-table-column>
      <el-table-column prop="menuPerms" label="权限编码" align="center"> </el-table-column>
      <el-table-column prop="menuIcon" label="图标" align="center"></el-table-column>
        
      <el-table-column prop="menuType" label="类型" align="center">
        <template #default="scope">
          <span v-if="scope.row.menuType == 0" class="el-tag">目录</span>
          <span v-else-if="scope.row.menuType == 1" class="el-tag success"
            >菜单</span
          >
          <span v-else class="el-tag info">按钮</span>
        </template>
      </el-table-column>
      <el-table-column prop="menuUrl" label="菜单URL" align="center"> </el-table-column>
      <el-table-column prop="menuComponent" label="菜单组件" align="center"> </el-table-column>
      <el-table-column prop="menuState" label="状态" align="center">
        <template #default="scope">
          <span v-if="scope.row.menuState == 0" class="el-tag success"
            >正常</span
          >
          <span v-else class="el-tag danger">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          type="text"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.menuId)">
            <template #reference>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
  </div>
</template>

<script>
import request from '../../../utils/request';
export default {
  data() {
    return {
      currentPage:1,//页码
      pageSize:10,//每页条数
      total:0,//总条数
      keyword:undefined,
      menulist:[],//表格数据
      dialogVisible: false,//弹窗值
      menuForm:[],
      ruleForm:{},
      rules: {
        menuName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        menuPerms: [
          { required: true, message: "请确认权限编码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //重置from表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    // 查询
    list(){
      request.get("/sys-menu/list").then(res=>{
        this.menuForm=res.data;
      })
    },
    // 分页
    paging(){
      request.get("/sys-menu/paging",{params:{
      currentPage:this.currentPage,
      pageSize:this.pageSize,
      keyword:this.keyword

    }}).then(res=>{
      if(res.code==="0"){
          this.menulist=res.data.records
          this.pageSize=res.data.size
          this.currentPage=res.data.current
          this.total=res.data.total
      }else{
        this.$message.error(res.msg)
      }
    })
    },
    // 改变当前每页的个数
     handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.paging()
    },
    // 改变当前页码
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum
      this.paging()
    },
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sava()
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     handleClose(done) {
      this.dialogVisible=false
      this.ruleForm={}
        // this.$confirm('你所填写的数据将会被清空，您确认关闭吗？')
        //   .then(_ => {
            
        //     done();
        //   })
        //   .catch(_ => {});
      },
    // 编辑
    handleEdit(index,row){
    // this.dialogVisible=true
    // row.menuType=JSON.stringify(row.menuType)
    // row.menuState=JSON.stringify(row.menuState)
    // this.ruleForm=row
    request.get("/sys-menu/findByid",{params:{id:row.menuId}}).then(res=>{
      res.data.menuType=JSON.stringify(res.data.menuType)
      res.data.menuState=JSON.stringify(res.data.menuState)
      this.ruleForm=res.data
      this.dialogVisible=true
    })
  },
  // 删除
handleDelete(id) {
      request.delete("/sys-menu/deleteByid",{params:{id:id}}).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.paging()  // 删除之后重新加载表格的数据
      })
    },
  //添加及修改
  sava(){
    request.post(this.ruleForm.menuId==null?'/sys-menu/insert':'/sys-menu/update',this.ruleForm).then(res=>{
      this.paging()
      this.handleClose()
    })
  }
  },
  created () {
    this.paging();
    this.list()
  }
};
</script>

<style scoped>
.el-tag {
  background-color: #ecf5ff;
  border-color: #d9ecff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;

  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}
.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

th {
  text-align: center;
}
</style>