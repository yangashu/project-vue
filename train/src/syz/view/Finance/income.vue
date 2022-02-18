<template>
  <div class="payheader">
    <span class="paysize">学员名称：</span>
    <el-input
      v-model="pageInfo.stuname"
      placeholder="请输入名字"
      style="margin-right: 30px"
    />
    <span class="paysize">收款方式：</span>
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
    <el-button @click="selectName">查询</el-button>
    <el-button>删除</el-button>
  </div>

  <el-table
    :data="payMoney"
    border
    style="width: 100%"
    @selection-change="handleCurrentChange"
  >
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column prop="paymoneyId" label="编号" width="120">
      <template #default="scope">{{ scope.row.paymoneyId }}</template>
    </el-table-column>
    <el-table-column prop="paymoneyState" label="收入状态" width="180">
      <template #default="scope">
        <span v-if="scope.row.paymoneyState==0">已到账</span>
        <span v-else>未到账</span>
      </template>
    </el-table-column>
    <el-table-column prop="paymoneyMoney" label="收入金额" width="180" />
    <el-table-column prop="paymoneyDate" label="收入时间" width="180" />
    <el-table-column prop="paymoneyMode" label="收款方式" width="180" />
    <el-table-column prop="staffName" label="收款人" width="180" />
    <el-table-column prop="studentfilesName" label="付款人" />
  </el-table>

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

export default {
  data() {
    return {
      payMoney: [],
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        stuname: ref(""),
        pay: ref("全部支付"),
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
    };
  },
  methods: {
    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/incomeVo/selectIncomeVo", {
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
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/incomeVo/selectIncomeVo", {
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
    //获取选中的值
    handleSelectionChange(sels) {
      this.sels = sels;
      console.log("选中的值：", this.sels);
    },

    //根据名字模糊查询
    //根据状态查询
    selectName() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/incomeVo/selectIncomeVo", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.payMoney = response.data.records;
          _this.pageInfo.total = response.data.total;
          _this.Refresh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //刷新方法
    Refresh() {
      let _this = this;
      this.axios
        .get("http://localhost:8088/TSM/incomeVo/selectIncomeVo", {
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
    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/incomeVo/selectIncomeVo", {
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
  /* border: 1px solid #000000; */
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
</style>
