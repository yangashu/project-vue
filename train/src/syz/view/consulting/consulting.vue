<template>
   
  <div>
       
    <!-- 头部搜索框 -->
       
    <div class="toubuone">
           
      <!-- 搜索条件下拉框 -->
          <span>快速检索：</span>    
      <el-select v-model="value" clearable placeholder="请选择">
             
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
               
        </el-option>
           
      </el-select>
          &nbsp;    
      <!-- 搜索文本框 -->
         
      <el-input
        class="texboxone"
        placeholder="请输入内容"
        v-model="input"
        clearable
      >
           
      </el-input>
          &nbsp;    
      <!-- 搜索按钮 -->
          <el-button icon="i-search" circle></el-button>     &nbsp;    
      <!-- 添加按钮 -->
         
      <el-button type="primary" round @click="dialogVisible = !dialogVisible"
        >增加</el-button
      >
         
      <!-- &nbsp;-->
         
      <!-- 删除按钮 -->
         
      <!-- <el-button type="primary" round>删除</el-button> -->
         
    </div>
       
    <!-- 表格部分 -->
       
    <div>
           
      <el-table :data="tableData" border style="width: 100%">
           
        <el-table-column fixed prop="numberone" label="编号">
             
        </el-table-column>
           
        <el-table-column prop="channel" label="生源渠道">
             
        </el-table-column>
           
        <el-table-column prop="consultation" label="咨询日期">
             
        </el-table-column>
           
        <el-table-column prop="ConsultationName" label="咨询人">
             
        </el-table-column>
           
        <el-table-column prop="sexs" label="性别">
             
        </el-table-column>
           
        <el-table-column prop="conte" label="咨询内容">
             
        </el-table-column>
           
        <el-table-column prop="phone" label="联系电话">
             
        </el-table-column>
           
        <el-table-column prop="contekec" label="咨询课程">
             
        </el-table-column>
           
        <el-table-column prop="counselor" label="接待人">
               
        </el-table-column>
             
        <el-table-column prop="state" label="状态">
             
        </el-table-column>
           
        <el-table-column fixed="right" label="操作" width="180px">
               
          <template #default>
                   
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
                    <el-button type="text" size="small">编辑</el-button>      
          </template>
             
        </el-table-column>
         
      </el-table>
         
    </div>
    <!-- 新增咨询信息弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增咨询登记信息"
      width="60%"
      :before-close="handleClose"
    >
         
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
             &nbsp;&nbsp;学校名称：<el-input
          style="width: 30%"
          v-model="sizeForm.name"
          placeholder="请输入学校名称"
        ></el-input>
           
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             咨询人：<el-input
          style="width: 30%"
          placeholder="请输入咨询人姓名"
        ></el-input>
             <br />
             &nbsp;&nbsp;电话号码：<el-input
          style="width: 30%; padding-top: 25px"
          placeholder="请输入电话号码"
        ></el-input>
           
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             咨询课程：<el-input
          style="width: 30%"
          placeholder="请输入咨询课程"
        ></el-input>
             <br />
             &nbsp;&nbsp;接待人：<el-input
          style="width: 30%; padding-top: 25px"
          placeholder="请输入接待人"
        ></el-input>
           
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             电话号码：<el-input
          style="width: 30%; padding-top: 25px"
          placeholder="请输入电话号码"
        ></el-input>
             <br />
             &nbsp;&nbsp;咨询日期：
        <el-date-picker
          style="margin-top: 25px"
          v-model="value1"
          type="date"
          placeholder="选择日期"
        >
             
        </el-date-picker>
      </el-form>
         
      <template #footer>
           
        <el-button
          type="primary"
          @click="submitForm('sizeForm'), (dialogVisible = false)"
          >提交</el-button
        >
            <el-button @click="resetForm('sizeForm')">重置</el-button>        <!-- <el-form-item size="large"> -->
           
        <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button> -->
         
        <!-- </el-form-item> -->
           
      </template>
       
    </el-dialog>
           
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      input: "",
      options: [
        {
          value: "选项1",
          label: "咨询人",
        },
        {
          value: "选项2",
          label: "接待人",
        },
        {
          value: "选项3",
          label: "联系电话",
        },
      ],
      tableData: [
        {
          numberone: "1",
          channel: "先锋高中",
          consultation: "2016-05-04",
          ConsultationName: "王五",
          sexs: "男",
          conte: "dfghfdfgvbfgdfcvfbgnhgfdfg",
          phone: 204573319247,
          contekec: "java",
          counselor: "李四",
          state: "未在读",
        },
        {
          numberone: "1",
          channel: "先锋高中",
          consultation: "2016-05-04",
          ConsultationName: "王五",
          sexs: "男",
          conte: "dfghfdfgvbfgdfcvfbgnhgfdfg",
          phone: 204573319247,
          contekec: "java",
          counselor: "李四",
          state: "未在读",
        },
        {
          numberone: "1",
          channel: "先锋高中",
          consultation: "2016-05-04",
          ConsultationName: "王五",
          sexs: "男",
          conte: "dfghfdfgvbfgdfcvfbgnhgfdfg",
          phone: 204573319247,
          contekec: "java",
          counselor: "李四",
          state: "未在读",
        },
        {
          numberone: "1",
          channel: "先锋高中",
          consultation: "2016-05-04",
          ConsultationName: "王五",
          sexs: "男",
          conte: "dfghfdfgvbfgdfcvfbgnhgfdfg",
          phone: 204573319247,
          contekec: "java",
          counselor: "李四",
          state: "未在读",
        },
      ],
      value: "", //  ruleForm: { //   pass: '', //   checkPass: '', //   age: '', // }, // rules: { //   pass: [{  trigger: 'blur' }], //   checkPass: [{  trigger: 'blur' }], //   age: [{ trigger: 'blur' }], // }, // 新增咨询信息弹框表单
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      }, // 时间选择器 // 时间选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(sizeForm) {
      this.$refs[sizeForm].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(sizeForm) {
      this.$refs[sizeForm].resetFields();
    }, // 新增咨询信息弹框
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style scoped>
.texboxone {
  width: 200px;
}
.toubuone {
  width: 50%;
  height: 100px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: -30px;
}
.tkname {
  width: 250px;
}
.tkzixun {
  width: 250px;
}
</style>