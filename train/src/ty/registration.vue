<template>
  <div style="background: #f5f7fa;overflow:hidden;">
    <!-- 咨询登记页面头部 -->
    <div style="background: #fff;margin: 0px auto;width:99%;margin-left:0.5%;">
      <div style="margin-top: 8px">
        &nbsp;&nbsp;&nbsp;请选择：
        <!-- 搜索下拉框 -->
        <el-select
          v-model="value"
          placeholder="请选择"
          style="width: 100px; margin-top: 14px"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- 搜索文本框 -->
        <el-input
          style="width: 120px"
          placeholder="请输入内容"
          v-model="tbss.input"
          clearable
          size="small"
        >
        </el-input>
        <!-- 搜索按钮 -->
        <el-button
          type="primary"
          style="height: 8px"
          size="small"
          @click="selectpotion"
        >
        <el-icon>
            <search />
          </el-icon>
        </el-button>
        <!-- 文字链接     重置 -->
        &nbsp;&nbsp;&nbsp;
        <el-link :underline="false" style="color: #409eff" @click="cz">重&nbsp;置</el-link>
        <!-- 新增咨询登记按钮 -->
        <el-button
          type="primary"
          style="margin-left: 55%"
          @click="centerDialogVisible = true"
          >新增访客</el-button
        >
      </div>

      <!-- 下拉框选择搜索 -->
      <div>
        <!-- 访客状态 -->
        <el-select
          v-model="tbss.downone"
          clearable
          placeholder="访客状态"
          class="dowone"
          id="downone"
          @change="downone()"
        >
          <el-option
            v-for="item in selectionone"
            :key="item.downOne"
            :label="item.label"
            :value="item.downOne"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
        <!-- 跟进人 -->
        <el-select
          v-model="tbss.dowtwo"
          clearable
          placeholder="跟进人"
          class="dowtwo"
          id="downtwo"
          @change="downtwo()"
        >
          <el-option
            v-for="item in selectiontwo"
            :key="item"
            :label="item.staffName"
            :value="item.staffId"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
        <!-- 意向课程 -->
        <el-select
          v-model="tbss.dowthree"
          clearable
          placeholder="意向课程"
          class="dowthree"
          id="downthree"
          @change="downthree()"
        >
          <el-option
            v-for="item in selectionthree"
            :key="item"
            :label="item.courseName"
            :value="item.courseId"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
      </div>
    </div>
    <!-- 表格 -->
    <div style="background: #fff; width: 99%; margin: 0px auto; margin-top: 1%;margin-left:0.5%;">
      <div style="padding-top: 1%; padding-bottom: 1%">
       
        <el-table
        class="tableData"
          :data="tableData"
          border
          style="width: 98%; margin: 0px auto"
        >
        
          <el-table-column fixed type="selection" width="55%">
          </el-table-column>
          <el-table-column fixed prop="studentFiles_name" label="姓名" width="80%">
          </el-table-column>
          <el-table-column prop="studentFiles_age" label="年龄" width="80%">
          </el-table-column>
          <el-table-column prop="studentFiles_sex" label="性别" width="80%">
          </el-table-column>
          <el-table-column prop="studentFiles_phone" label="联系方式" width="140%">
          </el-table-column>
          <el-table-column prop="studentFiles_loc" label="学生住址" width="330%">
          </el-table-column>
          <el-table-column prop="course_name" label="咨询课程" width="100%">
          </el-table-column>
          <el-table-column prop="staff_NAME" label="接待人" width="90%">
          </el-table-column>
          <el-table-column prop="studentFiles_school" label="学员毕业学校" width="230%">
          </el-table-column>
          <el-table-column prop="studentFiles_remarks" label="备注" width="120%">
          </el-table-column>
          <el-table-column label="状态" width="120%" prop="studentFiles_state">
            <template #default="scope">
              <span v-if="scope.row.studentFiles_state==0">待跟进</span>
              <span v-else-if="scope.row.studentFiles_state==1">已入学</span>
              <span v-else-if="scope.row.studentFiles_state==2">已流失</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200%">
            <template #default>
              <div style="margin: 0 auto">
                &nbsp; <el-button type="text">报名</el-button>&nbsp;
                <el-button type="text">添加跟进</el-button>&nbsp;&nbsp;
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多<i-icon class="el-icon--right"><arrowdown /></i-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>跟进记录</el-dropdown-item>
                      <el-dropdown-item>跟进分配</el-dropdown-item>
                      <el-dropdown-item>流失</el-dropdown-item>
                      <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="margin-left: 1%">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-sizes="pageInfo.sizes"
            :page-size="pageInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 新增访客弹框 -->
      <el-dialog
        v-model="centerDialogVisible"
        width="45%"
        title="新增访客信息"
        style="backgroud-color: #f5f7fa"
        destroy-on-close
        center
      >
        <!-- 姓名文本框 -->
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="ruleForm.name"
                class="nametext"
                placeholder="请填写学员姓名"
                style="width: 99%"
                size="small"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 性别单选框 -->
          <el-col :span="12">
            <span style="margin-left: 20%">性别：</span>
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </el-col>
        </el-row>
        <!-- 年龄和出生年月 -->
        <el-form-item label="年龄：" prop="date1" style="margin-top:1%;">
          <el-date-picker
            v-model="form.date1"
            type="date"
            size="small"
            placeholder="Pick a date"
            style="width: 38%"
            @change="suan"
          ></el-date-picker>
          <el-input
            v-model="form.age"
            style="width: 20%; margin-left: 5%; color: black"
            size="small"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <br />
        <!-- 联系方式 -->
        <el-row :gutter="24">
          <el-col :span="12">
        <el-form-item
          label="联系方式："
          prop="phone"
          style="margin-left: 0%; margin-top: -4%;"
        >
          <el-input
            v-model.number="ruleForm.phone"
            class="nametext"
            placeholder="请填写学员联系电话"
            style="width: 99%;"
            size="small"
            type="phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
          </el-col>
        <!-- 咨询课程 -->
        <el-col :span="12">
          
        <el-form-item label="咨询课程：" prop="course" style="margin-top:-3%;">
          <el-select v-model="ruleForm.course" placeholder="请选择咨询课程" size="small">
            <el-option label="java" value="java"></el-option>
            <el-option label="python" value="python"></el-option>
          </el-select>
        </el-form-item>
       
        </el-col>
        </el-row>
        <!-- 家长联系方式 -->
         <el-row :gutter="24">
          <el-col :span="12">
        <el-form-item
          label="家长电话："
          prop="parentphone"
          style=""
        >
          <el-input
            v-model.number="ruleForm.parentphone"
            class="nametext"
            placeholder="请填写家长联系电话"
            style="width: 99%"
            size="small"
            type="phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">

          </el-col>
         </el-row>

        <template #footer>
          <el-form-item>
            <span class="visitorstyle">
              <el-button @click="centerDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确认</el-button>
            </span>
          </el-form-item>
        </template>
      </el-dialog>
    </el-form>
  </div>
</template>


<script lang="ts">
//更多的箭头图标
import { ArrowDown } from "@element-plus/icons";
// 新增访客弹框
import { defineComponent, ref } from "vue";
import qs from "qs";
import request from '../utils/request';
export default {
  data() {
    return {
      tbss:{
        //   搜索文本框
      input: "",
        downone:"",
        dowtwo:"",
        dowthree:"",
      },
      tableData:[],
      // 访客状态
      selectionone:[
           {
          downOne: 0,
          label: "待跟进",
        },
        {
          downOne: 1,
          label: "已入学",
        },
        {
          downOne: 2,
          label: "已流失",
        }
      ],
      // 新增访客弹框默认性别
      radio: "1",
      // 新增访客弹框
      centerDialogVisible: ref(false),
      
      
      value1: "",
      value2: "",
      //   搜索下拉框
      options: [
        {
          value: "姓名",
          label: "姓名",
        },
        {
          value: "毕业学校",
          label: "毕业学校",
        },
      ],
      // 下拉框默认值
      value: "姓名",
      // 跟进人下拉框
      selectiontwo: [],
     
      // 意向课程下拉框
      selectionthree: [],
      // 分页
      pageInfo:{
      sizes: [1, 2, 3, 4],
      size: 1,
      currentPage: 1,
      total:1,
      },
      // 更多 图标
      components: {
        arrowdown: ArrowDown,
      },
      // 新增访客信息弹框
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        phone: "",//联系方式
        parentphone:"",//家长联系方式
        course:"",//课程
      },
      // 新增访客弹框出生日期
      form: {
        date1: "",
        age: 0,
      },
      // 新增访客弹框设置文本框内容不为空
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
        phone: [
          { type: "number", message: "年龄必须为数字值" },
        ],
        parentphone: [
          { type: "number", message: "年龄必须为数字值" },
        ],
        course:[
          { required: true, message: "请选择咨询的课程", trigger: "blur"}
        ],
      },
    };
  },

  methods: {
    // 下拉框模糊查询
    selectpotion(){
      
      console.log(this.value);
      
      // this.pageInfo.currentPage=this.tbss.currentPage
      // this.pageInfo.size=this.tbss.size
      request.get("/studentfiles/likeselectipton",{
        params:{
          page:this.pageInfo.currentPage,
          size:this.pageInfo.size,
          input:this.tbss.input,
          downone:this.tbss.downone,
          dowtwo:this.tbss.dowtwo,
          dowthree:this.tbss.dowthree,
          value:this.value,
        }
      }
      ).then(res =>{
        console.log(res);
        
       this.tableData=res.records;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
       this.pageInfo.total = res.total;

        
      }).catch(error =>{
        console.log(error);
        
      })
    },
    // 重置
    cz() {
      this.tbss.input="";
     this.tbss.downone="";
     this.tbss.dowtwo="";
     this.tbss.dowthree="";
    //  document.getElementById("downone").style.color = "gary";
    //  document.getElementById("downtwo").style.color = "gary";
    //  document.getElementById("downthree").style.color = "gary";
     this.tbss.checked=false;
     this.selectpage();
    },
    // 新增访客信息弹框
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.centerDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //日期转换成年龄
    suan() {
      console.log("ssssss");
      const birthStr = this.form.date1;
      console.log(birthStr);
      let d = new Date();
      let age =
        d.getFullYear() -
        birthStr.getFullYear() -
        (d.getMonth() < birthStr.getMonth() ||
        (d.getMonth() == birthStr.getMonth() &&
          d.getDate() < birthStr.getDate())
          ? 1
          : 0);
      this.form.age = age;
      console.log("年龄", age);
    },
    // 访客状态下拉框样式：使点击的字体变蓝色
    downone() {
      this.selectpotion();
      document.getElementById("downone").style.color = "#409eff";
    },
    downtwo() {
      this.selectpotion();
      document.getElementById("downtwo").style.color = "#409eff";
    },
    // 跟进人查询
    selectgjr(){
      request.get("/staff/selectgjr").then((res) =>{
        this.selectiontwo = res;
      })
    },
    // 意向课程查询
    selectyxkc(){
       request.get("/course/selectkechen").then((res) =>{
        this.selectionthree = res;
      })
    },
    downthree() {
      this.selectpotion();
      document.getElementById("downthree").style.color = "#409eff";
    },
    // 表格
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(size) {
      var _this = this;
      this.pageInfo.size = size;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.selectpotion()
    },
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.selectpotion()
    },
      // 分页查询
  selectpage(){
    request.get("/studentfiles/selectpage",{
    params:{currentPage:this.pageInfo.currentPage,
            size:this.pageInfo.size
    }
  }).then(res=>{
    this.tableData = res.records;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    this.pageInfo.total = res.total;                                                               
  })
  },
  },
  //直接查询
  created() {
    // this.selectpotion()
  this.selectpage();
  // 跟进人下拉框查询   咨询师的员工名字
  this.selectgjr();
  // 意向课程下拉框查询
  this.selectyxkc();
  },
};
</script>
<style>
.dowone {
  margin-top: 1%;
  width: 8%;
}
.dowone .el-input__inner {
  border: none;
}
.dowtwo {
  margin-top: 1%;
  width: 8%;
}
.dowtwo .el-input__inner {
  border: none;
}
.dowthree {
  margin-top: 1%;
  width: 8%;
}
.dowthree .el-input__inner {
  border: none;
}
.timeOne.el-range-editor.el-input__inner {
  margin-left: 8%;
}
/* 表格样式 */
.el-table th.el-table__cell {
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  color: black;
  font-size: 13px;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
  font-size: 13px;
}
/* 更多下拉菜单样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.i-arrow-down {
  font-size: 12px;
}
/* 新增访客信息 */
.el-dialog__header {
  background-color: #f5f7fa;
 }
/* 新增访客信息弹框的字体样式 */
.visitorstyle {
  /* dialog-footer; */
  font-size: 14px;
  color: #606266;
  color: #606266;
}
/* 新增访客信息弹框姓名文本框*/
.nametext {
  color: #606265;
}
/* 新增访客信息弹框姓名文本框判断不允许为空 */
.nametextnull {
  color: #f56c6c;
  font-size: 12px;
  margin-left: 13%;
  margin-top: 35px;
}
.tableData.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 去除文本框的*号 */

</style>