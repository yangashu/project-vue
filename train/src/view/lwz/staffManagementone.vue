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
            :data="staffData"
            style="width: 100%"
          >
            <el-table-column label="员工编号" prop="staffId"></el-table-column>
            <el-table-column label="系统用户名" prop="staffName"></el-table-column>
            <el-table-column label="员工姓名" prop="personalName"></el-table-column>
            <el-table-column label="性别" prop="personalSex"></el-table-column>
            <el-table-column label="联系电话" prop="personalPhone"></el-table-column>
            <el-table-column label="邮箱" prop="personalMail"></el-table-column>
            <el-table-column label="状态">
              <template #default="scope">
                <span v-if="scope.row.staffState==0">在职</span>
                <span v-else-if="scope.row.staffState==1">离职</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" @click="rowClick(scope.row)">详情</el-button>
                <el-button type="danger" v-if="scope.row.staffState==0" @click="dialogVisible2=true;thisRow=scope.row">辞退</el-button>
                <el-button type="primary" v-else @click="dialogVisible3=true;thisRow=scope.row">恢复</el-button>
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
      v-model="dialogVisible"
      title="员工详情"
      center="true"
      width="40%"
      :before-close="dialogClose"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <span>系统账号： {{thisRowView.staffName}}</span>
          <br>
          <br>
          <span>出生日期：</span>
          <el-date-picker style="width:50%;" v-model="thisRowView.personalBirthday" type="date" @change="calculationAge" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :disabled="disabled">
          </el-date-picker>
          <br>
          <br>
          <span>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
          <el-radio v-model="thisRowView.personalSex" label="男" :disabled="disabled">男</el-radio>
          <el-radio v-model="thisRowView.personalSex" label="女" :disabled="disabled">女</el-radio>
          <br>
          <br>
          <span>联系电话：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalPhone" ></el-input>
          <br>
          <br>
          <span>学历&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
          <el-select v-model="thisRowView.personalEducation" style="width:50%;" :disabled="disabled">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大学" value="大学"></el-option>
            <el-option label="中专" value="中专"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
            <el-option label="博士" value="博士"></el-option>
            <el-option label="博士后" value="博士后"></el-option>
          </el-select>
          <br>
          <br>
          <span>毕业院校：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalGraduation" ></el-input>
        </el-col>        
        <el-col :span="12">
          <span>员工姓名：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalName"  ></el-input>
          <br>
          <br>
          <span>年龄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：{{thisRowView.personalAge}}</span>
          <br>
          <br>
          <span>身份证号：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalIdcard" ></el-input>
          <br>
          <br>
          <span>邮箱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalMail"></el-input>
          <br>
          <br>
          <span>民族&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalNfamily"></el-input>
          <br>
          <br>
          <span>现居住地：</span>
          <el-input style="width:50%;" :disabled="disabled" v-model="thisRowView.personalAddress"></el-input>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="24">
        <el-col :span="24">
          <span>工作经历：</span>
          <br>
          <el-input
            v-model="thisRowView.personalExperience"
            :rows="2"
            type="textarea"
            :disabled="disabled"
            placeholder="请输入您的工作经历"
          />
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogClose">取消</el-button>
          <el-button type="primary" v-if="userName==thisRowView.staffName" @click="dialogVisible4=true">修改密码</el-button>
          <el-button v-if="this.a == 2" type="primary"  @click="updateStaff">确定</el-button>
          <el-button v-else-if="this.a == 1" type="primary" @click="updateClick">修改</el-button>
        </span>
      </template>
      <el-dialog
      v-model="dialogVisible4"
      title="修改密码"
      center="true"
      width="30%"
      append-to-body
      >
        <span>原密码：</span><el-input style="width:50%"></el-input>
      </el-dialog>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible2"
      title="提示"
      width="30%"
    >
      <span style="font-size: 20px">您确定要辞退该员工吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogClose()">取消</el-button>
          <el-button type="danger" @click="deleteStaff()">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible3"
      title="提示"
      width="30%"
    >
      <span style="font-size: 20px">您确定要恢复该员工吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogClose()">取消</el-button>
          <el-button type="danger" @click="recoveryStaff()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data() {
    return {
      a:1,
      b:'',
      userName:JSON.parse(sessionStorage.getItem("user")).staff.staffName,
      staffData:[],
      dialogVisible:false,
      dialogVisible2:false,
      dialogVisible3:false,
      dialogVisible4:false,
      pageInfo:{
        currentPage: 1,
        pagesize: 3,
        total: 0,
        like: "",
      },
      disabled:true,
      thisRow:"",
      thisRowView:{
        staffId:"",
        staffName:'',
        personalId:'',
        personalName:"",
        personalIdcard:"",
        personalPhone:"",
        personalBirthday:'',
        personalAge:0,
        personalSex:'',
        personalMail:"",
        personalEducation:"",
        personalNfamily:"",
        personalGraduation:"",
        personalAddress:"",
        personalExperience:"",
      },
      imageUrl:''
    };
  },
  methods: {
    //分页刷新方法
    Refresh(){
      request.get("/sys-staff/two",{params:this.pageInfo})
      .then(response =>{
        this.staffData=response.records;
        this.pageInfo.total = response.total;
      })
      .catch(error =>{
        console.log(error)
      })
    },
    //分页方法页数
    handleCurrentChange(page) {
      this.pageInfo.currentPage = page;
      request
        .get("/sys-staff/two", { params: this.pageInfo })
        .then((response) => {
          this.staffData = response.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分页方法显示多少条
    handleSizeChange(size) {
      this.pageInfo.pagesize = size;
      // console.log(ps);
      request
        .get("/sys-staff/two", { params: this.pageInfo })
        .then((response) => {
          this.staffData = response.records;
          this.pageInfo.total = response.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //单行点击方法，查看员工详情
    rowClick(row){
        this.dialogVisible=true;
        this.thisRowView.staffId=row.staffId;
        this.thisRowView.personalId=row.personalId;
        this.thisRowView.staffName=row.staffName;
        this.thisRowView.personalName=row.personalName;
        this.thisRowView.personalBirthday=row.personalBirthday.substring(0,10);
        this.thisRowView.personalAge=row.personalAge;
        this.thisRowView.personalSex=row.personalSex;
        this.thisRowView.personalIdcard=row.personalIdcard;
        this.thisRowView.personalPhone=row.personalPhone;
        this.thisRowView.personalMail=row.personalMail;
        this.thisRowView.personalEducation=row.personalEducation;
        this.thisRowView.personalNfamily=row.personalNfamily;
        this.thisRowView.personalGraduation=row.personalGraduation;
        this.thisRowView.personalAddress=row.personalAddress;
        this.thisRowView.personalExperience=row.personalExperience;
    },
    //选择日期后自动计算年龄的方法
    calculationAge(){
      var changeDate=this.thisRowView.personalBirthday;
      var newDate=new Date();
      var age=newDate.getFullYear()-changeDate.substring(0,4);
      if(changeDate.substring(5,7)>(newDate.getMonth()+1)){
        age=age-1;
      }else if(changeDate.substring(5,7)==(newDate.getMonth()+1)){
        if(changeDate.substring(8,10)>newDate.getDate()){
          age=age-1
        }
      }
      this.thisRowView.age=age;
    },
    //弹窗关闭方法
    dialogClose(){
      this.dialogVisible=false;
      this.Refresh();
    },
    
    //弹窗确定调用的方法
    updateStaff(){
      this.a--;
      this.disabled=true;
      this.updateStaffPersonal();
    },
    //弹窗修改调用的方法
    updateClick(){
      this.a++
      this.disabled=false
    },
    //辞退员工的方法
    deleteStaff(){
      request.get("/sys-staff/three?staffId="+this.thisRow.staffId)
      .then(res =>{
        console.log(res);
        if(res.code==0){
          this.dialogVisible2=false;
          this.$message({
            type:"success",
            message:"操作成功！！！"
          });
          this.handleCurrentChange(this.pageInfo.currentPage);
        }
      })
      .catch(error =>{
        console.log(error);
      })
    },
    //恢复员工状态
    recoveryStaff(){
      request.get("/sys-staff/four?staffId="+this.thisRow.staffId)
      .then(res =>{
        console.log(res);
        if(res.code==0){
          this.dialogVisible3=false;
          this.$message({
            type:"success",
            message:"操作成功！！！"
          });
          this.handleCurrentChange(this.pageInfo.currentPage);
        }
      })
      .catch(error =>{
        console.log(error);
      })
    },
    //模糊查询
    selectLike(){
      request.get("/sys-staff/five",{params:this.pageInfo})
      .then(res =>{
        this.staffData=res.records;
        this.pageInfo.total=res.total;
      })
      .catch(error =>{
        console.log(error)
      })
    },
    //修改员工资料
    updateStaffPersonal(){
      alert(this.thisRowView.personalBirthday)
      request.post("/sys-staff/six",this.thisRowView)
      .then(res =>{
        console.log(res);
      })
      .catch(error =>{
        console.log(error);
      })
    }
  },
  created() {
    request.get("/sys-staff/two",{params:this.pageInfo})
    .then(response =>{
      this.staffData=response.records;
      this.pageInfo.total = response.total;
    })
    .catch(error =>{
      console.log(error)
    })
  },
  mounted() {}
  }
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
}
.max {
  width: 100%;
  height: 93vh;
  background-color: rgb(245, 247, 250);
}
.el-row {
  margin-top: 10px;
}

</style>