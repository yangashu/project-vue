<template>
  <div>
    <div style="padding: 15px;width:calc(100% - 32px)">
    
      <el-table border :data="users" style="width: 100%">
        <el-table-column prop="userId" label="编号" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="userPass" label="用户密码" />
        <el-table-column prop="headId" label="头像" />
        <el-table-column prop="deptId" label="部门" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import request from "../utils/request";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    sel() {
      request.get("/user-emp/selAll").then((res) => {
        if (res.data.code == "0") {
          for (let i = 0; i < res.data.data.data.length; i++)
            this.users.push(res.data.data.data[i]);
        } else {
          this.$message.error("哎呀，出错了！！！");
        }
      });
    },
  },
  created() {
    this.sel();
  },
};
</script>