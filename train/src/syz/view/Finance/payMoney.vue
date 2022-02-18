<template>
  <div class="payheader">
    <span class="paysize">学员名称：</span>
    <el-input
      v-model="pageInfo.stuname"
      placeholder="请输入名字"
      style="margin-right: 30px"
    />
    <span class="paysize">到账状态：</span>
    <el-select
      v-model="pageInfo.payState"
      placeholder="微信/现金/支付宝"
      @change="selectName"
    >
      <el-option
        v-for="item in Arrival"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <span class="paysize">支付方式：</span>
    <el-select
      v-model="pageInfo.pay"
      placeholder="微信/现金/支付宝"
      @change="selectName"
    >
      <el-option
        v-for="item in payMode"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button @click="selectName()">查询</el-button>
    <el-button @click="updateState()">审核通过</el-button>
  </div>

  <el-table
    :data="payMoney"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column prop="paymoneyId" label="编号">
      <template #default="scope">{{ scope.row.paymoneyId }}</template>
    </el-table-column>
    <el-table-column prop="paymoneyMoney" label="缴费金额" />
    <el-table-column prop="paymoneyDate" label="缴费时间" width="180px" />
    <el-table-column prop="paymoneyMode" label="缴费方式" />
    <el-table-column prop="courseName" label="课程名字" />
    <el-table-column prop="courseMoney" label="课程金额">
      <template #default="scope">{{
        scope.row.courseHour * scope.row.coursePrice
      }}</template>
    </el-table-column>
    <el-table-column prop="courseHour" label="课时时间" />
    <el-table-column prop="coursePrice" label="课时价格" />
    <el-table-column prop="bookFee" label="教材金额" />
    <el-table-column prop="studentfilesName" label="缴费学员" />
    <el-table-column prop="staffName" label="收款人" />
    <el-table-column prop="paymoneyState" label="到账状态">
      <template #default="scope">
        <span v-if="scope.row.paymoneyState == '0'">已到账</span>
        <span v-else>未到账</span>
      </template>
    </el-table-column>
  </el-table>
  <div class="statistics">
    <span
      >缴费金额：<span>{{ totalMoney }}</span></span
    >
    <span
      >到账金额：<span>{{ stateMoney }}</span></span
    >
    <span
      >未到账金额：<span>{{ stateMoney2 }}</span></span
    >
  </div>

  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="[2, 3, 6, 10]"
      :page-size="pageInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import qs from "qs";
import { ref, defineComponent } from "vue";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      sels: [],
      payMoney: [],
      totalMoney: 0,
      stateMoney: 0,
      stateMoney2: 0,
      pageInfo: {
        stuname: ref(""),
        currentPage: 1,
        pagesize: 3,
        total: 0,
        pay: ref("全部支付"),
        payState: ref(2),
      },
      payMode: ref([
        {
          value: "全部支付",
          label: "全部支付",
        },
        {
          value: "微信支付",
          label: "微信支付",
        },
        {
          value: "支付宝支付",
          label: "支付宝支付",
        },
        {
          value: "现金支付",
          label: "现金支付",
        },
      ]),
      Arrival: ref([
        {
          value: 2,
          label: "全部状态",
        },
        {
          value: 0,
          label: "已到账",
        },
        {
          value: 1,
          label: "未到账",
        },
      ]),
    };
  },
  methods: {
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/selectPayMoneyVo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.payMoney = response.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //总页数
    handleSizeChange(size) {
      var _this = this;
      this.pageInfo.pagesize = size;
      var ps = qs.stringify(this.pageInfo);
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/selectPayMoneyVo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.payMoney = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //根据名字模糊查询
    //根据状态查询
    selectName() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/selectPayMoneyVo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.refundDate = response.data.records;
          _this.pageInfo.total = response.data.total;
          _this.Refresh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //统计总金额
    countMoney() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/countAllMoney")

        .then(function (response) {
          // console.log(response);
          _this.totalMoney = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //根据状态统计到账的总金额
    countMoneyByState() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/countMoneyByState")
        .then(function (response) {
          // console.log(response);
          _this.stateMoney = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //根据状态统计未到账的总金额
    countMoneyByState2() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/countMoneyByState2")
        .then(function (response) {
          // console.log(response);
          _this.stateMoney2 = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取选中的值
    handleSelectionChange(sels) {
      this.sels = sels;
      console.log("选中的值：", this.sels);
    },
    // 批量修改状态
    updateState() {
      var a = this.sels;
      if (a == 0) {
        ElMessage({
          message: "请选中你要修改的一行",
          type: "error",
        });
      } else {
        for (var i = 0; i < a.length; i++) {
          this.editState(a[i]);
        }
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      }
    },

    //修改状态
    editState(row) {
      var _this = this;
      console.log(row.paymoneyId);
      this.axios
        .post("http://localhost:8088/TSM/payMoney/updateStateById", {
          paymoneyId: row.paymoneyId,
        })
        .then(function (response) {
          console.log(response.data.data);
          _this.Refresh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //刷新方法
    Refresh() {
      this.countMoney();
      this.countMoneyByState();
      this.countMoneyByState2();
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/payMoneyVo/selectPayMoneyVo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response);
          _this.payMoney = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.countMoney();
    this.countMoneyByState();
    this.countMoneyByState2();
    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/payMoneyVo/selectPayMoneyVo", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response);
        _this.payMoney = response.data.records;
        _this.pageInfo.total = response.data.total;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.paysize {
  font-size: 16px;
  margin-right: 5px;
  font-weight: 500;
  margin-left: 10px;
}

.payheader .el-select .el-input__inner {
  height: 36px;
  color: #000000;
}

.payheader .el-select {
  margin-right: 30px;
}
.payheader {
  margin-top: 40px;
  margin-bottom: 15px;
  background-color: white;
  width: 1295px;
  height: 64px;
  line-height: 64px;
}

.paybox {
  margin-top: 30px;
}
.payheader .el-button {
  width: 100px;
  background: #f60;
  color: white;
  border: 1px solid white;
  text-align: center;
}
.payheader .el-button:hover {
  background: #ff5500;
}

.statistics span {
  margin-right: 30px;
}
</style>
