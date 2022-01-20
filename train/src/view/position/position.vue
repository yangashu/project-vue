<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column
        prop="date"
        label="date"
        sortable
        width="180"
        row-key="id"
      />
      <el-table-column prop="name" label="Name" sortable width="180" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "wangxiaohu",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "wangxiaohu",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "wangxiaohu",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "wangxiaohu",
              children: [
                {
                  id: 32,
                  date: "2016-05-01",
                  name: "wangxiaohu",
                },
              ],
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "wangxiaohu",
        },
      ],
    };
  },
};
</script>
<style scoped>
</style>