<template>
  <!-- 包所有的内容 -->
  <div>
    <!-- 订单信息 -->
    <div>
      <!-- 订单信息 -->
      <div style="padding-top: 2%; margin-left: 6%; padding-bottom: 1%">
        <span
          style="
            background-color: #409eff;
            width: 0.5%;
            height: 0.5%;
            margin-left: 2%;
          "
          >&nbsp;</span
        >
        <div style="margin-top: -1.5%; margin-left: 3.5%">
          <span style="color: #303133; font-size: 14px; font-weight: 700"
            >订单信息</span
          >
        </div>
      </div>
      <!-- 订单信息表格 -->
      <div>
        <el-table
          class="tableOne"
          :data="tableData"
          stripe="true"
          border
          style="width: 84%; margin-left: 2%; margin-top: 2%; margin: 0 auto"
        >
          <el-table-column
            prop="courname"
            style="margin: 0 auto"
            label="课程名称"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="couramount" label="课程金额" width="180">
          </el-table-column>
          <el-table-column prop="courhours" label="课时数量" width="180">
          </el-table-column>
          <el-table-column prop="courprice" label="课时单价" width="180">
          </el-table-column>
          <el-table-column prop="courbook" label="书本费" width="180">
          </el-table-column>
          <el-table-column prop="courpayable" label="应付金额" width="186">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 支付信息 -->
    <div>
      <!-- 支付信息 -->
      <div style="padding-top: 2%; margin-left: 6%; padding-bottom: 1%">
        <span
          style="
            background-color: #409eff;
            width: 0.5%;
            height: 0.5%;
            margin-left: 2%;
          "
          >&nbsp;</span
        >
        <div style="margin-top: -1.5%; margin-left: 3.5%">
          <span style="color: #303133; font-size: 14px; font-weight: 700"
            >支付信息</span
          >
        </div>
      </div>
      <!-- 支付信息内容 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div style="border: 1px solid #eee; width: 84%; margin-left: 8%">
          <!-- 学员姓名 -->
          <div style="margin-top: 1.5%; margin-left: 2%; width: 16%">
            <span style="font-size: 14px; color: #606266">学员姓名</span>
            <span style="margin-left: 12%; color: #303133; font-size: 14px"
              >aaaa</span
            >
          </div>
          <!-- 应付价格 -->
          <div style="margin-left: 19%; margin-top: -2%">
            <span style="font-size: 14px; color: #606266">应付价格</span>
            <span style="color: red; margin-left: 2%">￥ 4500元</span>
          </div>
          <!-- 经办人 -->
          <el-form-item
            label="经办人"
            prop="handler"
            style="margin-top: 1%; margin-left: -1%"
          >
            <el-select
              v-model="ruleForm.handler"
              placeholder="请选择经办人"
              size="small"
              style="width: 26%"
            >
              <el-option label="张三" value="shanghai"></el-option>
              <el-option label="李四" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 支付方式 -->
          <el-form-item label="支付方式" prop="payment">
            <el-button-group
              v-model="ruleForm.payment"
              placeholder="请选择支付方式"
            >
              <el-button size="small" style="margin: 0 2px"
                ><img
                  src="../tyimg/微信图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span style="padding-left: 5px">微信</span></el-button
              >
              <!-- 支付宝 -->
              <el-button size="small" style="margin: 0 10px"
                ><img
                  src="../tyimg/支付宝图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span style="padding-left: 5px">支付宝</span></el-button
              >
              <!-- 现金 -->
              <el-button size="small"
                ><img
                  src="../tyimg/现金图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span style="padding-left: 5px">现金</span></el-button
              >
              <!-- 刷卡 -->
              <el-button size="small" style="margin: 0 10px"
                ><img
                  src="../tyimg/银行卡图标.png"
                  style="height: 18px; width: 18px; vertical-align: middle"
                /><span style="padding-left: 5px">刷卡</span></el-button
              >
            </el-button-group>
          </el-form-item>
          <!-- 支付金额 -->
          <el-form-item label="支付金额" prop="pamount">
            <el-input
              v-model="ruleForm.pamount"
              size="small"
              style="width: 15%"
              class="textright"
            ></el-input
            >元
            <el-button
              size="small"
              style="
                background: #fff0e6;
                border-color: #ffc299;
                color: #f60;
                margin: 0 15px;
              "
              id="payfull"
              >全额付款</el-button
            >
          </el-form-item>
        <!-- 支付时间 -->
        <el-form-item prop="value3" label="支付时间" class="demonstration">
       <div class="block">
    <el-date-picker
      v-model="ruleForm.value3"
      type="datetime"
      placeholder="选择支付时间"
      :default-time="defaultTime"
      size="small"
    >
    </el-date-picker>
  </div>
        </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 支付时间
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      // 订单信息
      tableData: [
        {
          courname: "java",
          couramount: "2300",
          courhours: "23",
          courprice: "100",
          courbook: "800",
          courpayable: "40000",
        },
      ],
      // 支付信息内容表单
      ruleForm: {
        // 经办人
        handler: "",
        // 支付方式
        payment: "",
        // 支付金额
        pamount: "0",
        // 支付时间
        value3:"",
      },
      rules: {
        // 经办人
        handler: [
          { required: true, message: "请选择经办人", trigger: "change" },
        ],
        // 支付方式
        payment: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        // 支付金额
        pamount: [
          { required: true, message: "请填写支付金额", trigger: "blur" },
        ],
        // 支付时间
        value3: [
          { required: true, message:"选择支付时间", trigger: "blur"}
        ],
      },
    };
  },
  methods: {
    // 点击”全额付款“按钮变颜色
    //  payfull() {
    //   document.getElementById("payfull").style.background = "#f60";
    // },
  },
  created() {},
  mounted() {},
};
</script>
<style>
/* 表格 */
.tableOne.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.textright .el-input__inner {
  text-align: right;
}
</style>