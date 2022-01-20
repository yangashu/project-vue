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
          v-model="input"
          clearable
          size="small"
        >
        </el-input>
        <!-- 搜索按钮 -->
        <el-button
          type="primary"
          icon="i-search"
          style="height: 8px"
          size="small"
        ></el-button>
        <!-- <el-button icon="i-search" style="background-color:#f60;"></el-button> -->
        <!-- 时间选择器 -->
        <el-date-picker
          class="timeOne"
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          size="small"
        >
        </el-date-picker>
        <!-- 文字链接     重置 -->
        &nbsp;&nbsp;&nbsp;
        <el-link :underline="false" style="color: #409eff">重&nbsp;置</el-link>
        <!-- 新增咨询登记按钮 -->
        <el-button
          type="primary"
          style="margin-left: 22%"
          @click="centerDialogVisible = true"
          >新增访客</el-button
        >
      </div>

      <!-- 下拉框选择搜索 -->
      <div>
        <!-- 访客状态 -->
        <el-select
          v-model="downOne"
          clearable
          placeholder="访客状态"
          class="dowone"
          id="dowone"
          @click="dowone()"
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
          v-model="downTwo"
          clearable
          placeholder="跟进人"
          class="dowtwo"
          id="dowtwo"
          @click="dowtwo()"
        >
          <el-option
            v-for="item in selectiontwo"
            :key="item.downTwo"
            :label="item.label"
            :value="item.downTwo"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
        <!-- 意向课程 -->
        <el-select
          v-model="downThree"
          clearable
          placeholder="意向课程"
          class="dowthree"
          id="dowthree"
          @click="dowthree()"
        >
          <el-option
            v-for="item in selectionthree"
            :key="item.downThree"
            :label="item.label"
            :value="item.downThree"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
        <!-- 单选框查询是否报名的学员 -->
        <el-checkbox v-model="checked">备选项</el-checkbox>
      </div>
    </div>
    <!-- 表格 -->
    <div style="background: #fff; width: 99%; margin: 0px auto; margin-top: 1%;margin-left:0.5%;">
      <div style="padding-top: 1%; padding-bottom: 1%">
        <el-table
          :data="tableData.slice((currentPage - 1) * size, currentPage * size)"
          border
          style="width: 98%; margin: 0px auto"
        >
          <el-table-column fixed type="selection" width="55%">
          </el-table-column>
          <el-table-column fixed prop="nameone" label="姓名" width="80%">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="80%">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="80%">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" width="140%">
          </el-table-column>
          <el-table-column prop="address" label="学生住址" width="330%">
          </el-table-column>
          <el-table-column prop="course" label="咨询课程" width="100%">
          </el-table-column>
          <el-table-column prop="receptionist" label="接待人" width="90%">
          </el-table-column>
          <el-table-column prop="school" label="学员毕业学校" width="230%">
          </el-table-column>
          <el-table-column prop="remarks" label="备注" width="120%">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="120%">
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
            :current-page="currentPage"
            :page-sizes="sizes"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="4"
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
        width="40%"
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
        <el-form-item label="年龄：" prop="date1">
          <el-date-picker
            v-model="form.date1"
            type="date"
            size="small"
            placeholder="Pick a date"
            style="width: 36%"
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
          style="margin-left: 0%; margin-top: -4%;background-color:red;"
        >
          <el-input
            v-model.number="ruleForm.phone"
            class="nametext"
            placeholder="请填写学员联系电话"
            style="width: 99%"
            size="small"
            type="phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
          </el-col>
        <!-- 咨询课程 -->
        <el-col :span="12">
        <el-form-item label="咨询课程：" prop="course">
          <el-select v-model="ruleForm.course" placeholder="请选择咨询课程" size="small">
            <el-option label="java" value="java"></el-option>
            <el-option label="python" value="python"></el-option>
          </el-select>
        </el-form-item>
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
export default {
  data() {
    return {
      // 新增访客弹框默认性别
      radio: "1",
      // 新增访客弹框
      centerDialogVisible: ref(false),
      //单选框查询是否报名的学员
      checked: false,
      //   搜索文本框
      input: "",
      // 头部  时间选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      //   搜索下拉框
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      // 下拉框默认值
      value: "黄金糕",
      // 访客状态下拉框
      selectionone: [
        {
          downOne: "选项1",
          label: "待跟进",
        },
        {
          downOne: "选项2",
          label: "已报名",
        },
        {
          downOne: "选项3",
          label: "已流失",
        },
      ],
      // 下拉框默认值
      downOne: "访客状态",
      // 跟进人下拉框
      selectiontwo: [
        {
          downTwo: "选项1",
          label: "张三",
        },
        {
          downTwo: "选项2",
          label: "李四",
        },
        {
          downTwo: "选项3",
          label: "王五",
        },
      ],
      // 下拉框默认值
      downTwo: "跟进人",
      // 意向课程下拉框
      selectionthree: [
        {
          downThree: "选项1",
          label: "java",
        },
        {
          downThree: "选项2",
          label: "c++",
        },
        {
          downThree: "选项3",
          label: "python",
        },
      ],
      // 下拉框默认值
      downThree: "意向课程",
      // 分页
      sizes: [1, 2, 3, 4],
      size: 1,
      currentPage: 1,
      // 更多 图标
      components: {
        arrowdown: ArrowDown,
      },
      // 表格
      tableData: [
        {
          nameone: "张三",
          age: "19",
          sex: "男",
          phone: "12345467890",
          address: "湖南省株洲市荷塘区人工智能职业技术学校",
          course: "java",
          receptionist: "王五",
          school: "株洲人工智能职业技术学校",
          remarks: "qqqqqqq",
          state: "未在读",
        },
        {
          nameone: "张三",
          age: "19",
          sex: "男",
          phone: "12345467890",
          address: "湖南省株洲市荷塘区人工智能职业技术学校",
          course: "java",
          receptionist: "王五",
          school: "株洲人工智能职业技术学校",
          remarks: "qqqqqqq",
          state: "未在读",
        },
        {
          nameone: "张三",
          age: "19",
          sex: "男",
          phone: "12345467890",
          address: "湖南省株洲市荷塘区人工智能职业技术学校",
          course: "java",
          receptionist: "王五",
          school: "株洲人工智能职业技术学校",
          remarks: "qqqqqqq",
          state: "未在读",
        },
        {
          nameone: "张三",
          age: "19",
          sex: "男",
          phone: "12345467890",
          address: "湖南省株洲市荷塘区人工智能职业技术学校",
          course: "java",
          receptionist: "王五",
          school: "株洲人工智能职业技术学校",
          remarks: "qqqqqqq",
          state: "未在读",
        },
      ],
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
        phone: "",
        course:"",
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
          { required: true, message: "请填写联系方式" },
          { type: "number", message: "年龄必须为数字值" },
        ],
        course:[
          { required: true, message: "请选择咨询的课程", trigger: "blur"}
        ],
      },
    };
  },

  methods: {
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
    dowone() {
      document.getElementById("dowone").style.color = "#409eff";
    },
    dowtwo() {
      document.getElementById("dowtwo").style.color = "#409eff";
    },
    dowthree() {
      document.getElementById("dowthree").style.color = "#409eff";
    },
    // 表格
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.size = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
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
</style>