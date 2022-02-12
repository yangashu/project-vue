<template>
  <div class="payheader">
    <span class="paysize">学员名称：</span>
    <el-input
      v-model="pageInfo.stuname"
      placeholder="请输入名字"
      style="margin-right: 30px"
    />
    <span class="paysize">退费状态：</span>
    <el-select
      v-model="pageInfo.state"
      placeholder="全部状态"
      @change="selectState"
    >
      <el-option
        v-for="item in refundState"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <span class="kong"></span>

    <el-button @click="selectState()">查询</el-button>
    <el-button @click="updateState()">审核通过</el-button>
  </div>

  <el-table
    ref="tableDate"
    :data="refundDate"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="50"></el-table-column>
    <el-table-column prop="refundId" label="编号" width="100">
      <template #default="scope">{{ scope.row.refundId }}</template>
    </el-table-column>
    <el-table-column prop="refundDate" label="退费时间" width="180" />
    <el-table-column prop="refundMoney" label="退费金额" width="100">
      <template #default="scope">{{
        scope.row.courseMoney + scope.row.bookFee
      }}</template>
    </el-table-column>
    <el-table-column prop="refundState" label="退费状态" width="100">
      <template #default="scope">
        <span v-if="scope.row.refundState == '1'">未退</span>
        <span v-else>已退</span>
      </template>
    </el-table-column>
    <el-table-column prop="studentName" label="学员名字" />
    <el-table-column prop="courseName" label="退费课程" />
    <el-table-column prop="courseMoney" label="课程金额">
      <template #default="scope">{{
        scope.row.courseHour * scope.row.coursePrice
      }}</template>
    </el-table-column>
    <el-table-column prop="courseHour" label="退费课时" />
    <el-table-column prop="coursePrice" label="课时单价" />
    <el-table-column prop="bookFee" label="教材费" />
    <el-table-column prop="staffName" label="批准人" />
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
      totalMoney: 0,
      stateMoney: 0,
      stateMoney2: 0,
      refundDate: [],
      pageInfo: {
        stuname: ref(""),
        currentPage: 1,
        pagesize: 3,
        total: 0,
        state: ref(2),
      },
      refundState: ref([
        {
          value: 2,
          label: "全部状态",
        },
        {
          value: 1,
          label: "未退",
        },
        {
          value: 0,
          label: "已退",
        },
      ]),
      sels: [],
    };
  },
  methods: {
    // 统计所有的金额
    countMoney() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/refundVo/countAllMoney")
        .then(function (response) {
          // console.log(response);
          _this.totalMoney = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 统计已退费的金额
    countStateMoney() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/refundVo/countByStateMoney")

        .then(function (response) {
          // console.log(response);
          _this.stateMoney = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 统计未退费的金额
    countStateMoney2() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/refundVo/countByStateMoney2")

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
          message: "请选中你要修改一行",
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
      this.axios
        .post("http://localhost:8088/TSM/refund/updateState", {
          refundId: row.refundId,
        })
        .then(function (response) {
          console.log(response.data.data);
          _this.Refresh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleCurrentChange(page) {
      var _this = this;
      this.pageInfo.currentPage = page;
      var ps = qs.stringify(this.pageInfo);
      console.log(ps);
      this.axios
        .get("http://localhost:8088/TSM/refundVo/selectRefundVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data.data);
          _this.refundDate = response.data.records;
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
        .get("http://localhost:8088/TSM/refundVo/selectRefundVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.refundDate = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //根据状态查询
    selectState() {
      var _this = this;
      this.axios
        .get("http://localhost:8088/TSM/refundVo/selectRefundVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.Refresh();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //刷新方法
    Refresh() {
      var _this = this;
      this.countMoney();
      this.countStateMoney();
      this.countStateMoney2();
      this.axios
        .get("http://localhost:8088/TSM/refundVo/selectRefundVoAll", {
          params: this.pageInfo,
        })
        .then(function (response) {
          console.log(response.data);
          _this.refundDate = response.data.records;
          _this.pageInfo.total = response.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.countMoney();
    this.countStateMoney();
    this.countStateMoney2();
    var _this = this;
    this.axios
      .get("http://localhost:8088/TSM/refundVo/selectRefundVoAll", {
        params: this.pageInfo,
      })
      .then(function (response) {
        console.log(response.data);
        _this.refundDate = response.data.records;
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

.kong {
  width: 235px;
  display: inline-block;
}
</style>
