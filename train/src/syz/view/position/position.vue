<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-popconfirm title="确定删除吗？" @confirm="deleteBatch">
        <template #reference>
          <el-button type="danger" :disabled="this.ids.length===0">批量删除</el-button>
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
      <el-button type="primary" style="margin-left: 5px" @click="load()"
        >查询</el-button
      >
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <!-- <el-table-column prop="positionId" label="ID" sortable> </el-table-column> -->
      <el-table-column prop="positionName" label="名称"> </el-table-column>
      <el-table-column prop="positionCode" label="唯一编码"> </el-table-column>
      <el-table-column prop="positionRemark" label="描述">
      </el-table-column>
      <el-table-column prop="positionState" label="状态" align="center">
        <template #default="scope">
          <span v-if="scope.row.positionState == 0" class="el-tag success"
            >正常</span
          >
          <span v-else class="el-tag danger">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="部门">
        <template #default="scope"> 
            <span v-for="item in scope.row.depts" :key="item">{{item.deptName}}</span>
        </template> 

      </el-table-column>
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <!-- <el-button type="primary" size="mini" @click="buy(scope.row.id)">购买</el-button> -->
          <el-button
            size="mini"
            type="text"
            @click="permHandle(scope.row)"
            >分配权限</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button size="mini" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(scope.row.positionId)"
          >
            <template #reference>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      
      <!-- 添加与编辑对话框 -->
      <el-dialog title="角色信息" v-model="dialogVisible" width="600px" @closed="resetForm('editForm')" center>
         <el-form :model="editForm" :rules="editFormRules" ref="editForm">
            <el-form-item label="部门菜单" prop="deptId" label-width="100px">
           <el-select v-model="editForm.deptId" placeholder="请选择部门">
             <template v-for="item in this.depts">
                     <el-option :label="item.deptName" :value="item.deptId">
                       <span>-&nbsp;&nbsp;{{item.deptName}}</span>
                     </el-option>
                  </template>
           </el-select>
            </el-form-item>
            <el-form-item label="角色名称" prop="positionName" label-width="100px">
               <el-input v-model="editForm.positionName"></el-input>
            </el-form-item>
            <el-form-item label="唯一编码" prop="positionCode" label-width="100px">
               <el-input v-model="editForm.positionCode"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="positionRemark" label-width="100px">
               <el-input v-model="editForm.positionRemark"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="positionState" label-width="100px">
               <el-radio-group v-model="editForm.positionState">
                  <el-radio label="1" value="1">禁用</el-radio>
                  <el-radio label="0" value="0">正常</el-radio>
               </el-radio-group>
            </el-form-item>
            
         </el-form>
         <div style="text-align: center;">
            <el-button @click="resetForm('editForm'),this.dialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="save('editForm')">确 定</el-button>
         </div>
      </el-dialog>

      <!-- 编辑 树形控件-->
      <el-dialog
        title="分配权限"
        v-model="permDialogFormVisible"
        width="600px"
        @closed="resetForm('permForm')"
      >
        <el-form :model="permForm" ref="permForm">
          <el-tree
            :data="permTreeData"
            show-checkbox
            ref="permTree"
            node-key="menuId"
            :default-expand-all="true"
            :default-expanded-keys="ids"
            :props="{children: 'children', label: 'menuName'}"
          >
          </el-tree>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('permForm')">取 消</el-button>
          <el-button type="primary" @click="submitPermForm('permForm')"
            >确 定</el-button
          >
          <el-button @click="getCheckedNodes">获取</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import request from "../../../utils/request.js";

export default {
  data() {
    return {
      user: {},
      loading: true,
      form: {},
      dialogVisible: false,
      permDialogFormVisible: false,
      checkStrictly: false,
      search: undefined,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      permTreeData: [],
      permForm: [],
      treeCheckedKeys: [],
      showCheckArr:[],
      editForm:{},
      depts:[],
      // filesUploadUrl: "http://" + window.server.filesUploadUrl + ":9090/files/upload",
      ids: [],

      editFormRules: {
               positionName: [
                  {required: true, message: '请输入名称', trigger: 'blur'}
               ],
               positionCode: [
                  {required: true, message: '请输入唯一编码', trigger: 'blur'}
               ],
               positinonStatu: [
                  {required: true, message: '请选择状态', trigger: 'blur'}
               ]
            },
            role_id:undefined,
    };
  },
  created() {
    // let userStr = sessionStorage.getItem("user") || "{}"
    // this.user = JSON.parse(userStr)
    // // 请求服务端，确认当前登录用户的 合法信息
    // request.get("/user/" + this.user.id).then(res => {
    //   if (res.code === '0') {
    //     this.user = res.data
    //   }
    // })

    this.load();
    this.finddept();
    this.findmenu()
  },
  methods: {
    // 清除表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.editForm = {};
      this.dialogFormVisible = false;
      this.permDialogFormVisible = false;
      this.checkStrictly=true
    },
    // 沙箱支付
    buy(bookId) {
      request.get("/order/buy/" + bookId).then((res) => {
        // 请求成功跳转沙箱支付的页面
        window.open(res.data);
      });
    },
    // 批量删除
    deleteBatch() {
      if (!this.ids.length) {
        this.$message.warning("请选择数据！");
        return;
      }
      request.post("/sys-position/deleteBatchIds", this.ids).then((res) => {
        if (res.code === "200") {
          this.$message.success(res.msg);
          this.search=""
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleSelectionChange(val) {
      this.ids = val.map((v) => v.positionId); // [{id,name}, {id,name}] => [id,id]
    },
    // 根据id删除
    handleDelete(id) {
      request
        .delete("/sys-position/deleteByid", { params: { id: id } })
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
          this.search=""
          this.load(); // 删除之后重新加载表格的数据
        });
    },
    filesUploadSuccess(res) {
      this.form.cover = res.data;
    },
    // 查询
    load() {
      this.loading = true;
      request
        .get("/sys-position/paging", {
          params: {
            page: this.currentPage,
            size: this.pageSize,
            keyword: this.search,
          },
        })
        .then((res) => {
          if(res.code=="200"){
             this.loading = false;
          this.tableData = res.data.records;
          this.total = res.data.total;
          }else{
            this.$message.error(res.msg)
          }
         
        });
    },
    handleSizeChange(pageSize) {
      // 改变当前每页的个数触发
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      // 改变当前页码触发
      this.currentPage = pageNum;
      this.load();
    },
    add() {
      this.dialogVisible = true;
      this.form = {};
      if (this.$refs["upload"]) {
        this.$refs["upload"].clearFiles(); // 清除历史文件列表
      }
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
      if(valid){
       
        this.editForm.deptId=this.editForm.deptId==0?'':this.editForm.deptId
         request.post(this.editForm.positionId==null?'/sys-position/insert':'/sys-position/update',this.editForm).then(res=>{
        if(res.code=='0'){
          this.$message.success(res.msg)
          this.dialogVisible=false;
          this.load()
        }else{
          this.$message.error(res.msg)
        }
        
      })
      }else{
        return false
      }
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      this.$nextTick(() => {
        if (this.$refs["upload"]) {
          this.$refs["upload"].clearFiles(); // 清除历史文件列表
        }
      });
    },
    //查询全部权限
    findmenu(){
      request.get("/sys-position-menu/find").then(res=>{
        this.permTreeData=res.data
      })
    },
    // 根据id查角色拥有那些权限
    permHandle(row) {
      this.permDialogFormVisible = true;
      this.findmenu()
      this.role_id=row.positionId
      request.get("/sys-position-menu/menu",{params:{id:row.positionId}}).then(res=>{
        var menuids=[];
        res.data.forEach(item => {
          item.menus.forEach(menus=>{
            menuids.push(item.menuId);
            if(menus.children!=null){
               menus.children.forEach(children=>{
             menuids.push(children.menuId)
             children.children.forEach(child=>{
               menuids.push(child.menuId)
             })
          })
            }
         
          })
          
        //  this.checkStrictly=false
        });
        this.$refs.permTree.setCheckedKeys(menuids);
      })
    },

    // 根据id查询并编辑
    edit(row){
      this.dialogVisible=true
      request.get("/sys-position/findByid",{params:{id:row.positionId}}).then(res=>{
        if(res.code=='0'){
          res.data.positionState=JSON.stringify(res.data.positionState)
          this.editForm=res.data
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    // 查询所有部门信息
    finddept(){
      request.get("/sys-dept/list").then(res=>{
        this.depts=res.data
      })
    },
    // 分配权限
    submitPermForm(formName) {
            var menuIds = []
            menuIds = this.$refs.permTree.getCheckedKeys()
            // menuIds = menuIds.concat(this.$refs.permTree.getHalfCheckedKeys()) // 半选中状态的父节点
            console.log(menuIds)
            console.log(this.role_id)
            request.post("/sys-position-menu/perm/" + this.role_id, menuIds).then(res => {
               this.$message({
                  showClose: true,
                  message: '恭喜你，操作成功',
                  type: 'success',
                  onClose: () => {
                     this.resetForm(formName)
                  }
               });
               this.permDialogFormVisible = false
            })
         },
  },
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
</style>