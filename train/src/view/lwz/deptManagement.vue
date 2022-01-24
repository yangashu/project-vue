<template>
  <div id="max">
    <el-row :gutter="24">
      <el-input
        style="width: 20%; margin-left: 0.7%"
        class="input1"
        placeholder="请输入你要搜索的内容"
        v-model="a"
        @keyup.enter.native="selectLike()"
      ></el-input>
      <el-button
        type="danger"
        style="width: 100px; height: 30px; margin-left: 0.5%"
        @click="selectLike()"
      >
        查询&nbsp;&nbsp;<el-icon><search /></el-icon>
      </el-button>

      <el-button
        type="primary"
        style="width: 100px; height: 30px; margin-left: 53.1%"
        @click="
          dialogVisible = true;
          c = '';
        "
        >新增部门</el-button
      >
    </el-row>
    <el-row>
      <el-table ref="mt" :data="deptData" style="width: 100%">
        <el-table-column label="部门编号" prop="deptId"></el-table-column>
        <el-table-column label="部门名称" prop="deptName"></el-table-column>
        <el-table-column label="所属院校">培训机构</el-table-column>
        <el-table-column label="部门人数" prop="count"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              @click="
                dialogVisible1 = true;
                d = scope.row.deptName;
                id = scope.row.deptId;
              "
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="
                dialogVisible2 = true;
                d = scope.row.deptName;
                id = scope.row.deptId;
                rs = scope.row.count;
              "
              >删除</el-button
            >
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
      title="添加部门"
      center="true"
      width="30%"
    >
      <el-row :gutter="24">
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <span style="width: 100px">部门名称：</span>
          <el-input style="width: 50%" v-model="c"></el-input>
        </div>
      </el-row>
      <el-row :gutter="24">
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <span style="width: 100px">部门所属：</span>
          <el-select v-model="b" style="width: 50%">
            <el-option value="培训机构">培训机构</el-option>
          </el-select>
        </div>
      </el-row>
      <el-row :gutter="24">
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <el-button type="primary" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="addDept()">确定</el-button>
        </div>
      </el-row>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible1"
      title="编辑部门"
      center="true"
      width="30%"
    >
      <el-row :gutter="24">
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <span style="width: 100px">部门名称：</span>
          <el-input style="width: 50%" v-model="d"></el-input>
        </div>
      </el-row>
      <el-row :gutter="24">
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <span style="width: 100px">部门所属：</span>
          <el-select v-model="b" style="width: 50%">
            <el-option value="培训机构">培训机构</el-option>
          </el-select>
        </div>
      </el-row>
      <el-row :gutter="24">
        <div
          style="
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
          "
        >
          <el-button type="primary" @click="dialogVisiblle1 = false"
            >取消</el-button
          >
          <el-button type="primary" @click="updateDept">确定</el-button>
        </div>
      </el-row>
    </el-dialog>
    <el-dialog v-model="dialogVisible2" title="警告" width="30%">
      <span style="font-size: 20px"
        >你确定要删除<span style="color: red">{{ d }}</span
        >吗？</span
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible2 = false"
            >取消</el-button
          >
          <el-button type="danger" @click="deleteDept()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons";
import qs from "qs";
import request from '../../utils/request'
export default {
  data() {
    return {
      a: "",
      b: "培训机构 ",
      c: "",
      d: "",
      id: "",
      rs: "",
      deptData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        like: "",
      },
    };
  },
  components: {
    search: Search,
  },
  methods: {
    //分页方法页数
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      request
        .get("/sys-dept/one", { params: this.pageInfo })
        .then((response) => {
          // console.log("1-------------------------------------------")
          // console.log(response.data)
          this.deptData = response.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分页方法显示多少条
    handleSizeChange(size) {
      // var _this=this
      this.pageInfo.pagesize = size;
      var ps = qs.stringify(this.pageInfo);
      // console.log(ps);
      request
        .get("/sys-dept/one", { params: this.pageInfo })
        .then((response) => {
          // console.log("2-------------------------------------------")
          // console.log(response.data)
          this.deptData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分页方法刷新页面
    aaa() {
      request
        .get("/sys-dept/one", { params: this.pageInfo })
        .then((response) => {
          this.deptData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //添加部门
    addDept() {
      if(this.c==""){
        this.$message({
          type: "error",
          message: "部门名字不可以为空！",
        });
      }else{
        request
        .get("/sys-dept/two?deptName=" + this.c)
        .then((response) => {
          if (response.code == "0") {
            this.$message({
              type: "success",
              message: response.msg,
            });
            this.dialogVisible = false;
            this.aaa();
          } else {
            this.$message({
              type: "error",
              message: response.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
    },
    //修改方法
    updateDept() {
      if(this.d==""){
        this.$message({
          type: "error",
          message: "部门名字不可以为空！",
        });
      }else{
      var dept = { id: this.id, deptName: this.d };
      request
        .get("/sys-dept/three", { params: dept })
        .then((response) => {
          if (response.code == "0") {
            this.$message({
              type: "success",
              message: response.msg,
            });
            this.dialogVisible1 = false;
            this.aaa();
          } else {
            this.$message({
              type: "error",
              message: response.msg,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    //删除方法
    deleteDept() {
      if (this.rs == 0) {
        request
          .get("/sys-dept/four?id=" + this.id)
          .then((response) => {
            if (response.code == "0") {
              this.$message({
                type: "success",
                message: response.msg,
              });
              this.dialogVisible2 = false;
              this.aaa();
            } else {
              this.$message({
                type: "error",
                message: response.msg,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$message({
          type: "error",
          message: "人数不为空，无法删除哦!",
        });
      }
    },
    //模糊查询方法
    selectLike() {
      this.pageInfo.like = this.a;
      request
        .get("/sys-dept/five", { params: this.pageInfo })
        .then((response) => {
          this.deptData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  },
  created() {
    request
      .get("/sys-dept/one", { params: this.pageInfo })
      .then((response) => {
        this.deptData = response.records;
        this.pageInfo.total = response.total;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {},
};
</script>
<style>
#max {
  width: 100%;
  height: 93vh;
  background-color: rgb(245, 247, 250);
}
* {
  margin: 0px;
  padding: 0px;
}
</style>