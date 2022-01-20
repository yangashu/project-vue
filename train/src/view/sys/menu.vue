<template>
  <div>
    <div>
      <el-input
        v-model="input"
        placeholder="Please input"
        clearable
        style="width: 20%; padding: 0 10px 10px 0"
      />
      <el-button icon="i-search" type="primary">查询</el-button>
      <el-button icon="i-plus" type="primary" @click="dialogVisible = true"
        >新增</el-button
      >

      <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <template #footer>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </template>
      </el-dialog>
    </div>

    {{ menulist }}
    <el-table
      :data="menulist"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      border
    >
      <el-table-column prop="menuId" label="编号"> </el-table-column>
      <el-table-column prop="menuName" label="名称"> </el-table-column>
      <el-table-column prop="menuPerms" label="权限编码"> </el-table-column>
      <el-table-column prop="menuType" label="类型">
        <template #default="scope">
          <span v-if="scope.row.menuType == 0" class="el-tag">目录</span>
          <span v-else-if="scope.row.menuType == 1" class="el-tag success"
            >菜单</span
          >
          <span v-else class="el-tag info">按钮</span>
        </template>
      </el-table-column>
      <el-table-column prop="menuPerms" label="菜单URL"> </el-table-column>
      <el-table-column prop="menuComponent" label="菜单组件"> </el-table-column>
      <el-table-column prop="menuState" label="状态">
        <template #default="scope">
          <span v-if="scope.row.menuState == 0" class="el-tag success"
            >正常</span
          >
          <span v-else class="el-tag danger">禁用</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      dialogVisible: false,
      input: undefined,
      menulist: [],
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, message: "请确认密码", trigger: "blur" }],
        age: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询
    findbyPid() {
      request.get("/menu/findbyPid").then((res) => {
        if (res.data.code == "0") {
          this.$message.success(res.data.msg);
          res.data.data.forEach((item) => {
            this.menulist.push(item);
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查询子级
    findchildren() {
      request.get("/menu/findbyId").then((res) => {
        if (res.data.code == "0") {
          this.menulist.forEach((item) => {
            const list = {
              menu_id: item.menuId,
              menu_pid: item.menuPid,
              menu_name: item.menuName,
              menu_url: item.menuUrl,
              menu_perms: item.menuPerms,
              menu_component: item.menuComponent,
              menu_type: item.menuType,
              menu_icon: item.menuIcon,
              menu_orderNum: item.menuOrderNum,
              menu_created: item.menuCreated,
              menu_updated: item.menuUpdated,
              menu_state: item.menuState,
              menu_describe: item.menuDescribe,
              deleted: item.deleted,
              children:[]
            };
            
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    this.findbyPid();
  },
};
</script>

<style scoped>
.el-tag {
  background-color: #ecf5ff;
  border-color: #d9ecff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;

  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}
.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

th {
  text-align: center;
}
</style>