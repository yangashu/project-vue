<template>
  <div class="max">
    <el-row :gutter="24">
      <el-input
        style="width: 20%; margin-left: 0.7%"
        class="input1"
        placeholder="请输入你要搜索的内容"
        v-model="a"
        @keyup.enter.native="selectLike()"
      ></el-input>
      <el-button
        type="danger"
        style="width: 100px; height: 30px; margin-left: 0.5%"
        @click="selectLike()"
      >
        查询&nbsp;&nbsp;<el-icon><search /></el-icon>
      </el-button>

      <el-button
        type="primary"
        style="width: 100px; height: 30px; margin-left: 53.1%"
        @click="
          dialogVisible = true;
          c = '';
        "
        >员工入职</el-button
      >
    </el-row>
    <el-row>
      <el-table ref="mt" :data="deptData" style="width: 100%">
        <el-table-column label="员工编号" prop=""></el-table-column>
        <el-table-column label="系统用户名" prop=""></el-table-column>
        <el-table-column label="员工姓名"></el-table-column>
        <el-table-column label="性别" prop=""></el-table-column>
        <el-table-column label="联系电话" prop=""></el-table-column>
        <el-table-column label="目前状态" prop=""></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              @click="
                dialogVisible1 = true;
                d = scope.row.deptName;
                id = scope.row.deptId;
              "
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="
                dialogVisible2 = true;
                d = scope.row.deptName;
                id = scope.row.deptId;
                rs = scope.row.count;
              "
              >辞退</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
*{
  margin: 0px;
  padding: 0px;
}
.max{
  width: 100%;
  height: 93vh; 
  background-color: rgb(245, 247, 250);
}
</style>