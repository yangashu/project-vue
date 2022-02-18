<template>
  <div>
    <el-row :gutter="24">
          <el-input
            style="width: 20%; margin-left: 0.7%"
            class="input1"
            placeholder="请根据姓名查询"
            v-model="pageInfo.like"
            @keyup.enter.native="selectLike()"
          ></el-input>
          <el-button
            type="danger"
            style="width: 100px; height: 30px; margin-left: 0.5%"
            @click="selectLike()"
          >
            查询&nbsp;&nbsp;<el-icon><search /></el-icon>
          </el-button>
        </el-row>
        <el-row>
          <el-table
            ref="mt"
            :data="personalData"
            style="width: 100%"
          >
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="员工姓名" prop="personalName"></el-table-column>
            <el-table-column label="性别" prop="personalSex"></el-table-column>
            <el-table-column label="年龄" prop="personalAge"></el-table-column>
            <el-table-column label="联系电话" prop="personalPhone"></el-table-column>
            <el-table-column label="邮箱" prop="personalMail"></el-table-column>
            <el-table-column label="学历" prop="personalEducation"></el-table-column>
            <el-table-column label="民族" prop="personalNfamily"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                  <el-button type="primary" @click="dialogEject(scope.row.staffId)">入职</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-sizes="[2, 3, 5, 10]"
            :page-size="pageInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
          >
          </el-pagination> 
        </el-row>
        <el-dialog
        >

        </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data() {
    return {
      personalData:[],
      pageInfo:{
        currentPage: 1,
        pagesize: 3,
        total: 0,
        like: "",
      },
    };
  },
  methods: {},
  created() {
    request.get("/sys-personal/notEmployed",{params:this.pageInfo})
    .then(response =>{
      this.personalData=response.data.records;
      this.pageInfo.total = response.data.total;
    })
    .catch(error =>{
      console.log(error)
    })

  },
  mounted() {}
};
</script>
<style scoped>
</style>