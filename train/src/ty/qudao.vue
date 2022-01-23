<template>
  <div style="background: #f5f7fa; overflow: hidden">
    <div
      style="background: #fff; margin: 0px auto; width: 99%; margin-left: 0.5%"
    >
     
      <div style="margin-top: 10px; padding: 2%">
         <!-- 搜索框 -->
        <el-input
          style="width: 15%"
          v-model="shoushuokuan"
          placeholder="请输入学校名称"
        />

        <!-- 搜索按钮 -->
        <el-button
          style="background: #409eff"
          type="primary"
          @click="buttonselect()"
        >
          <el-icon>
            <search />
          </el-icon>
        </el-button>
        <!-- 添加渠道 -->
        <el-button
          @click="xinzhenqudao = true"
          style="background: #409eff; color: white; margin-left: 70%"
        >
          <el-icon><plus /></el-icon>
          添加渠道
        </el-button>
      </div>
    </div>
    <div style="background: white; margin-top: 1%">
      <!-- 
  =============================================================================================================================
        表格
     -->
      <div style="padding-top: 2%">
        <el-table
          class="qudaostable"
          :data="qudaotable"
          border
          style="width: 96%; margin: 0 auto"
        >
          <!-- <el-table-column prop="channelId" label="编号" width="380" /> -->
          <el-table-column prop="channelLoc" label="地址" width="380" />
          <el-table-column prop="channelName" label="学校" width="380" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="text"
                size="mini"
                @click="selectstudent(scope.$index, scope.row)"
                >查看学员</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button type="text" size="mini" @click="open(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--
=============================================================================================================================
       分页
     -->
      <div style="margin-left: 2%; padding-bottom: 1%">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 
 ===================================================================================================================
    新增渠道弹框      
     -->
    <el-dialog
      v-model="xinzhenqudao"
      title="渠道新增"
      width="35%"
      center
      :show-close="false"
      :close-on-click-modal="close_modal"
    >
      <el-form
        ref="xzqudao"
        :rules="rulequdao"
        :model="xzqudao"
        label-width="120px"
      >
        <el-form-item label="地址" prop="dz">
          <el-input v-model="xzqudao.dz" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="xx">
          <el-input
            v-model="xzqudao.xx"
            style="width: 70%; margin-top: 2%"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer" style="margin-top: -5%">
          <el-button @click="dmquxiao('xzqudao')">取消</el-button>
          <el-button type="primary" @click="dmonoff('xzqudao')">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 
================================================================================================================================
        查看学员渠道弹框
     -->

    <el-dialog
      v-model="selescstudent"
      title="查看学员"
      width="75%"
      center
      :show-close="false"
      :close-on-click-modal="close_modal"
    >
      <!-- 搜索框 -->
      <div
        style="border-bottom: 1px solid rgb(237, 240, 246); padding-bottom: 2%"
      >
        <el-input
          style="width: 15%"
          v-model="ckxyqudao.shoushuokuan"
          placeholder="请输入学员姓名"
        />

        <!-- 搜索按钮 -->
        <el-button
          style="background: #409eff"
          type="primary"
          @click="buttonlikeselect()"
        >
          <el-icon>
            <search />
          </el-icon>
        </el-button>
      </div>
      <!-- 查看学员表格 -->
      <div style="margin-top: 2%">
        <el-table
          class="studentFilestableData"
          :data="studentFilestableData"
          border
          style="width: 100%"
        >
          <el-table-column prop="studentfilesName" label="学员姓名" width="100">
          </el-table-column>
          <el-table-column prop="studentfilesSex" label="性别" width="70">
          </el-table-column>
          <el-table-column prop="studentfilesAge" label="年龄" width="70">
          </el-table-column>
          <el-table-column prop="studentfilesPhone" label="联系电话">
          </el-table-column>
          <el-table-column prop="parentPhone" label="家长联系电话">
          </el-table-column>
          <el-table-column prop="studentfilesSchool" label="学员毕业学校">
          </el-table-column>
          <el-table-column prop="studentfilesLoc" label="学生住址">
          </el-table-column>
          <el-table-column prop="studentfilesRemarks" label="备注">
          </el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              <span v-if="scope.row.studentfilesState==0">待跟进</span>
              <span v-else-if="scope.row.studentfilesState==1">已入学</span>
              <span v-else-if="scope.row.studentfilesState==2">已流失</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div style="padding-bottom: 1%">
        <el-pagination
          @size-change="studenthandleSizeChange"
          @current-change="studenthandleCurrentChange"
          :current-page="studentpageInfo.currentPage"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="studentpageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="studentpageInfo.total"
        >
        </el-pagination>
      </div>
      <template #footer>
        <div class="dialog-footer" style="margin-top: -3%">
          <el-button @click="ckqudao('ckxyqudao')">取消</el-button>
          <el-button type="primary" @click="ckqudao('ckxyqudao')"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
    <!-- 
================================================================================================================================
        编辑渠道弹框
     -->

    <el-dialog
      v-model="xiugaiqudao"
      title="渠道新增"
      width="35%"
      center
      :show-close="false"
      :close-on-click-modal="close_modal"
    >
      <el-form
        ref="xgqudao"
        :rules="rulequdao1"
        :model="xgqudao"
        label-width="120px"
      >
        <el-form-item label="地址" prop="channelLoc">
          <el-input v-model="xgqudao.channelLoc" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="channelName">
          <el-input
            v-model="xgqudao.channelName"
            style="width: 70%; margin-top: 2%"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer" style="margin-top: -5%">
          <el-button @click="xgqdquxiao('xgqudao')">取消</el-button>
          <el-button type="primary" @click="xgqdonoff('xgqudao')"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  ArrowLeft,
  Edit,
  Share,
  Delete,
  ArrowRight,
  Close,
  Apple,
  Search,
  ArrowDown,
  Plus,
} from "@element-plus/icons";
import { ElMessage } from "element-plus";
import qs from "qs";
import request from "../utils/request";
export default {
  components: {
    search: Search,
    aplus: Plus,
  },
  props: {},
  data() {
    return {
      //点击弹框外不取消弹框
      close_modal: false,
      //排课分页
      pageInfo: {
        total: 0,
        size: 2,
        currentPage: 1,
      },
      // 查看学员分页
      studentpageInfo: {
        channelid:0,
        total: 0,
        size: 2,
        currentPage: 1,
      },
      //搜索框
      shoushuokuan: "",
      // 查看学员
      selescstudent: false,
      //修改渠道
      xiugaiqudao: false,
      //新增渠道
      xinzhenqudao: false,
      qudaotable: [],
      //渠道添加
      xzqudao: [
        {
          dz: "",
          xx: "",
        },
      ],
      //渠道修改
      xgqudao: [
        {
          channelId: "",
          channelLoc: "",
          channelName: "",
        },
      ],
      // 查看学员
      ckxyqudao: {
        shoushuokuan: "", //搜索文本框
      },
      // 查看学员表格
      studentFilestableData: [],

      //渠道新增规则
      rulequdao: {
        dz: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur",
          },
        ],
        xx: [
          {
            required: true,
            message: "学校不能为空",
            trigger: "blur",
          },
        ],
      },
      rulequdao1: {
        channelLoc: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur",
          },
        ],
        channelName: [
          {
            required: true,
            message: "学校不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 查看学员
    selectstudent(index, row) {
      this.selescstudent = true;
      this.studentpageInfo.channelid=row.channelId;
      request
        .get("/studentfiles/selectstudentfiles", {
          params: this.studentpageInfo,
        })
        .then((res) => {
          this.studentFilestableData = res.records;
          this.studentpageInfo.total = res.total;
          console.log("aaa", res);
        });
    },
    //修改赋值
    handleEdit(index, row) {
      this.xiugaiqudao = true;
      this.xgqudao = Object.assign({}, row); // 这句是关键！！！
    },
    // 分页查询
    tangyidashabi() {
      request
        .get("/channel/chenlpage", {
          params: this.pageInfo,
        })
        .then((res) => {
          this.qudaotable = res.records;
          this.pageInfo.total = res.total;
          console.log("aaa", res);
        });
    },
    // 分页
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.tangyidashabi();
    },
    handleSizeChange(size) {
      var _this = this;
      this.pageInfo.size = size;
      var ps = JSON.stringify(this.pageInfo);
      console.log(ps);
      this.tangyidashabi();
    },
    //按钮查询

    buttonselect() {
      var _this = this;
      request
        .get("/channel/likeselect", {
          params: {
            size: _this.pageInfo.size,
            currentPage: _this.pageInfo.currentPage,
            shoushuokuan: _this.shoushuokuan,
          },
        })
        .then((res) =>{ 
          _this.qudaotable = res.records;
          _this.pageInfo.total = res.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //新增渠道开关
    dmonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request
            .post("/channel/addqudao", {
              channelLoc: this.xzqudao.dz,
              channelName: this.xzqudao.xx,
            })
            .then((res) => {
              console.log(res);
              this.crea();
              this.$refs[formName].resetFields();
              this.xinzhenqudao = false;
              ElMessage({
                showClose: true,
                message: "添加成功",
                type: "success",
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dmquxiao(formName) {
      this.$refs[formName].resetFields();
      this.xinzhenqudao = false;
    },
    //修改渠道开关
    xgqdonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request
            .post("/channel/updatequdao", {
              channelId: this.xgqudao.channelId,
              channelLoc: this.xgqudao.channelLoc,
              channelName: this.xgqudao.channelName,
            })
            .then((response) => {
              console.log(response.data);
              this.crea();
              this.$refs[formName].resetFields();
              this.xiugaiqudao = false;
              ElMessage({
                showClose: true,
                message: "修改成功",
                type: "success",
              });
            })
            .catch(function () {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    xgqdquxiao(formName) {
      this.ckxyqudao = {};
      this.xiugaiqudao = false;
    },
    // 查看学员弹框
    ckqudao(formName) {
      this.ckxyqudao = {};
      this.selescstudent = false;
    },
    // 分页
    studenthandleCurrentChange(page) {
      var _this = this;
      this.studentpageInfo.currentPage = page;
      var ps = qs.stringify(this.studentpageInfo);
      console.log(ps);
      request
        .get("/studentfiles/selectstudentfiles", {
          params: this.studentpageInfo,
        })
        .then((res) => {
          this.studentFilestableData = res.records;
          this.studentpageInfo.total = res.total;
          console.log("aaa", res);
        });
    },
    studenthandleSizeChange(size) {
      var _this = this;
      this.studentpageInfo.size = size;
      var ps = JSON.stringify(this.studentpageInfo);
      console.log(ps);
      request
        .get("/studentfiles/selectstudentfiles", {
          params: this.studentpageInfo,
        })
        .then((res) => {
          this.studentFilestableData = res.records;
          this.studentpageInfo.total = res.total;
          console.log("aaa", res);
        });
    },
    // 渠道删除弹框
    open(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletequdao(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //渠道删除
    deletequdao(row) {
      console.log("1233"+row.channelId);
      request
        .post("/channel/delectchannel", {
          channelId: row.channelId,
        })
        .then((res) => {
          let _this = this;
          this.$message({
            
            type: "success",
            message: "删除成功!",
          });
          _this.crea();
        })
        .catch(function (error) {
          console.log(error);
          console.log("删除失败");
        });
    },
    // 查看学员弹框模糊查询
    buttonlikeselect() {
      var _this = this;
      console.log("nnnn"+this.ckxyqudao.shoushuokuan);
      console.log("aaaaaaaa"+this.studentpageInfo.channelid);
      request
        .get("/studentfiles/likeselectstudent", {
          params: {
            size: _this.studentpageInfo.size,
            currentPage: _this.studentpageInfo.currentPage,
            shoushuokuan: _this.ckxyqudao.shoushuokuan,
             channelid: _this.studentpageInfo.channelid,
          },
        })
        .then((res) =>{ 
          _this.studentFilestableData = res.records;
          _this.studentpageInfo.total = res.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    crea() {
      let _this = this;
      request 
        .get("/channel/chenlpage", {
          params: _this.pageInfo,
        })
        .then((res) => {
          console.log(res);
          this.qudaotable = res.records;
          this.pageInfo.total = res.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  //直接查询
  created() {
    this.tangyidashabi();
  },
  mounted() {},
};
</script>
<style>
/* // 表格样式 */
.qudaostable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.studentFilestableData.el-table--border th.el-table__cell {
  background: #ebeff3;
}
</style>