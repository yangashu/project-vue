<template>
  <div style="background: #f5f7fa">
    <!-- 班级管理页面头部 -->
    <div style="background: #fff; width: 99%; margin: 0px auto">
      <div style="margin-top: 8px">

        <!-- 搜索文本框 -->
        <el-input
          style="width: 15%;margin-left:1%;margin-top:1%;"
          placeholder="请输入班级名称"
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
        <!-- 文字链接     重置 -->
        &nbsp;&nbsp;&nbsp;
        <el-link :underline="false" style="color: #409eff">重&nbsp;置</el-link>
        <!-- 添加班级按钮 -->
        <el-button
          type="primary"
          style="margin-left: 63%;"
          @click="centerDialogVisible = true"
          >添加班级</el-button
        >
      </div>

      <!-- 下拉框选择搜索 -->
      <div>
        <!-- 班主任 -->
        <el-select
          v-model="downOne"
          clearable
          placeholder="班主任"
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
        <!-- 上课老师 -->
        <el-select
          v-model="downTwo"
          clearable
          placeholder="上课老师"
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
        <!-- 教室 -->
        <el-select
          v-model="downThree"
          clearable
          placeholder="教室"
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
      </div>
    </div>
    <!-- 表格 -->
    <div style="background: #fff; width: 99%; margin: 0px auto; margin-top: 1%">
      <div style="padding-top: 2%; padding-bottom: 1%">
        <el-table
          :data="tableData.slice((currentPage - 1) * size, currentPage * size)"
          border
          style="width: 95%; margin: 0px auto"
        >
          <el-table-column fixed prop="classname" label="班级名称" width="165%">
          </el-table-column>
          <el-table-column prop="classaa" label="教室" width="165%">
          </el-table-column>
          <el-table-column prop="headmaster" label="班主任" width="165%">
          </el-table-column>
          <el-table-column prop="classnumber" label="班级人数" width="165%">
          </el-table-column>
          <el-table-column prop="teacher" label="上课老师" width="165%">
          </el-table-column>
          <el-table-column prop="opening" label="开班时间" width="180%">
          </el-table-column>
          <el-table-column label="操作" width="220%">
            <template #default>
              <div style="margin: 0 auto">
                &nbsp; <el-button type="text">本班学员</el-button>&nbsp;
                <el-button type="text">本班课表</el-button>&nbsp;&nbsp;
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多<i-icon class="el-icon--right"><arrowdown /></i-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item>结课</el-dropdown-item>
                      <el-dropdown-item>上课记录</el-dropdown-item>
                      <el-dropdown-item>学员考勤</el-dropdown-item>
                      <el-dropdown-item>教材领取</el-dropdown-item>
                      <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="margin-left: 2%">
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
      //   搜索文本框
      input: "",
      // 访客状态下拉框
      selectionone: [
        {
          downOne: "选项1",
          label: "张三",
        },
        {
          downOne: "选项2",
          label: "李四",
        },
        {
          downOne: "选项3",
          label: "王五",
        },
      ],
      // 下拉框默认值
      downOne: "班主任",
      // 上课老师下拉框
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
      downTwo: "上课老师",
      // 教室下拉框
      selectionthree: [
        {
          downThree: "选项1",
          label: "TR02201",
        },
        {
          downThree: "选项2",
          label: "TR02202",
        },
        {
          downThree: "选项3",
          label: "TTR02203",
        },
      ],
      // 下拉框默认值
      downThree: "教室",
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
          classname: "TR02201",
          classaa: "TR02202",
          headmaster: "张三",
          classnumber: "20",
          teacher: "李四",
          opening: "2021-12-14",
        },
        {
           classname: "TR02201",
          classaa: "TR02202",
          headmaster: "张三",
          classnumber: "20",
          teacher: "李四",
          opening: "2021-12-14",
        },
        {
           classname: "TR02201",
          classaa: "TR02202",
          headmaster: "张三",
          classnumber: "20",
          teacher: "李四",
          opening: "2021-12-14",
        },
        {
          classname: "TR02201",
          classaa: "TR02202",
          headmaster: "张三",
          classnumber: "20",
          teacher: "李四",
          opening: "2021-12-14",
        },
      ],
     
    };
  },

  methods: {
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
</style>