<template>
  <div style="padding:15px">
  <el-table border :data="tableData" style="width: 99%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
</style>