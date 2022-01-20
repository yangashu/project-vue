<template>
  <div style="margin-top:2%;">
    <!-- 基础信息 -->
    <div style="">
      <!-- 基础信息头部 -->
      <div class="information">
        <span style="background-color: #409eff; width: 0.5%; height: 0.5%"
          >&nbsp;</span
        >
        <span style="padding-left: 1%">基础信息</span>
      </div>
      <!-- 基础信息内容部分 -->
      <div
        style="
          color: #606266;
          border: 1px solid #eee;
          width: 75%;
          margin: 0 auto;
          margin-top: -1%;
        "
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 姓名 -->
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                label="姓名"
                prop="inforname"
                style="margin-top: 3%"
              >
                <el-input
                  v-model="ruleForm.inforname"
                  style="width: 60%"
                  placeholder="请填写学员姓名"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 性别 -->
              <el-form-item
                label="性别"
                prop="inforsexs"
                style="margin-top: 2.5%">
                <el-radio-group v-model="ruleForm.inforsexs">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 联系方式 -->
          <el-row :gutter="24">
            <el-col :span="12">
          <el-form-item label="联系方式" prop="infocontact">
            <el-input v-model="ruleForm.infocontact" size="small" placeholder="请填写手机号码" style="width:60%"></el-input>
          </el-form-item>
            </el-col>
          <!-- 年龄和出生年月 -->
          <el-col :span="12">
          <el-form-item label="年龄" prop="date1">
            <el-date-picker
              v-model="form.date1"
              type="date"
              size="small"
              placeholder="Pick a date"
              style="width: 50%"
              @change="suan"
            ></el-date-picker>
            <el-input
              v-model="form.age"
              style="width: 20%; margin-left: 5%; color: black;"
              size="small"
              :disabled="true"
            ></el-input>
          </el-form-item>
          </el-col>
            </el-row>
            <el-row :gutter="24">
            <el-col :span="12">
            <!-- 家长联系方式 -->
            <el-form-item label="家长联系方式" prop="information">
            <el-input v-model="ruleForm.information" size="small" placeholder="请填写家长手机号码" style="width:60%"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业学校" prop="infoschool">
            <el-input v-model="ruleForm.infoschool" size="small" placeholder="请填写毕业学校" style="width:60%"></el-input>
          </el-form-item>
            </el-col>
            </el-row>
            <el-form-item label="家庭地址" prop="infoaddress">
            <el-input v-model="ruleForm.infoaddress" size="small" placeholder="请填写家庭地址" style="width:90%"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单验证
      ruleForm: {
        // 姓名
        inforname: "",
        // 性别
        inforsexs: "男",
        // 联系方式
        infocontact: "",
        // 家长联系方式
        information: "",
        // 家庭地址
        infoaddress: "",
        // 毕业学校
        infoschool: "",
      },
      // 新增访客弹框出生日期
      form: {
        date1: "",
        age: 0,
      },
      rules: {
        inforname: [
          { required: true, message: "请填写学员姓名", trigger: "blur" },
        ],
        inforsexs: [
          { required: true, message: "请选择性别", trigger: "change" },
        ],
        infocontact:[
          { required:true, min: 11, max: 11, message: '长度在11位数', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    //   表单的确定和取消，暂时没使用
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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
  },
};
</script>
<style>
/* 基础信息头部 */
.information {
  padding-top: 1.5%;
  padding-bottom: 1%;
  border: 1px solid #eee;
  width: 75%;
  margin: 1% auto;
  font-weight: 700;
  font-size: 14px;
}
</style>