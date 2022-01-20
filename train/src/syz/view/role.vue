<template>
  <div style="padding:15px">
  <el-table border :data="tableData.slice((page-1)*size,page*size)" style="width: 99%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
import request from '../utils/request.js';
export default {
  data() {
    return {
      role:[],
      
    };
  },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
 created () {
   request.get("/position/paging")
 }

  
};
</script>
<style lang="scss" scoped>
</style>