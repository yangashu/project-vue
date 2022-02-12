<template>
  <div>
    <div style="margin-bottom: 10px">
      <!-- 搜索 -->
       <!-- text-align: center; -->
      <div style="margin: 10px 0 25px;">
        状态：
        <el-select v-model="state" placeholder="选择审核状态" style="padding:0 20px 0 0" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
        学员： <el-input
      v-model="search"
      class="input"
      placeholder="输入学员姓名"
    ></el-input>
    <span class="demonstration">缴费日期：</span>
    <el-date-picker
      v-model="value1"
      type="daterange"
      value-format="YYYY-MM-DD"
      format="YYYY-MM-DD"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="a">
    </el-date-picker>
      </div>
        <!-- 功能区 -->
        
      <div style="background: #fff; padding: 10px 0;float:left">
        <el-button type="primary" class="function" icon="search" size="16px" @click="load"
         >搜素</el-button
        >
         <el-button type="primary" class="function"
         ><el-icon><img src="../../../img/shenhetongguo.png" alt="" style="width:16px;height:16px;vertical-align: middle"/> </el-icon
          >&nbsp;&nbsp;审核通过</el-button
        >
        <el-button
          type="primary"
          class="function"
          @click="this.importdialogVisible = true"
          ><el-icon><img src="../../../img/daoru.png" alt="" style="width:12px;height:12px;vertical-align: middle"/> </el-icon
          >&nbsp;&nbsp;导入</el-button
        >
        <el-button type="primary" class="function" @click="exportrevenue()"
          ><el-icon><img src="../../../img/export.png" alt="" style="width:12px;height:12px;vertical-align: middle"/> </el-icon
          >&nbsp;&nbsp;导出</el-button
        >
        <el-button type="primary" class="function" @click="this.search='',this.state='',this.value1=null"
          ><el-icon><img src="../../../img/重置.png" alt="" style="width:12px;height:12px;vertical-align: middle"/> </el-icon
          >&nbsp;&nbsp;重置</el-button
        >
      </div>
      <!-- 消息 -->
      <div style="text-align: right; margin: 10px 140px">
        <img
          src="../../../img/通知 铃铛 消息.png"
          alt=""
          style="vertical-align: top"
          @click="examineList()"
        />
        <span style="margin-left: -15px; color: #fff">{{ conut }}</span>
      </div>
    <!-- 回显数据表格 -->
      <el-table
        :data="revenueTableData"
        border
        style="width: 100%; box-shadow: 0 0 25px #e0e7ef; border-radius: 20px"
        center
        :header-cell-style="{
          background: '#F5F8FD',
          color: '#606266',
          textAlign: 'center',
        }"
        :cell-style="{ textAlign: 'center' }"
      >
      <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="缴费日期" prop="paymoneyDate" />
        <el-table-column label="缴费学员" prop="studentName" />
        <el-table-column label="缴费金额" prop="paymoneyMoney" />
        <el-table-column label="缴费方式" prop="paymoneyMode" />
        <!-- <template #default="scope">
            {{
              scope.row.revenueMode == 0
                ? "现金"
                : scope.row.revenueMode == 1
                ? "微信"
                : scope.row.revenueMode == 2
                ? "支付宝"
                : "银行卡"
            }}
          </template> -->
        <!-- </el-table-column> -->
        <el-table-column label="录入人" prop="staffName" />
          <el-table-column label="状态" prop="incomeState">
              <template #default="scope">
                  <img v-if="scope.row.incomeState==0" src="http://soft.hkdemo.cn/images/tsm/02.png" style="" alt="">
            <img v-else src="http://soft.hkdemo.cn/images/tsm/14.png" alt="">
          </template>
        </el-table-column>
        <el-table-column label="打印" align="right">
          
          <template #default="scope">
            <el-button size="small" type="text" @click="details(scope.row)"
              ><img src="http://soft.hkdemo.cn/images/print.gif" alt=""></el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <p style="margin:8px"> 缴费总额：￥{{TotalPayment}} | 已审核：￥{{Reviewed}} | 未审核：￥{{NotApproved}} | 现金：￥{{cash}} | 刷卡：￥{{payByCard}} | 微信支付：￥{{WechatPayment}} | 其他：￥{{other}}</p>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin: 15px 0"
      >
      </el-pagination>

      <!-- 详情对话框 -->
      <el-dialog
        v-model="dialogVisible"
        title="详情"
        width="20%"
        :before-close="handleClose"
        center
      >
        <ul style="list-style: none; text-align: center">
          <li>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号：{{
              revenuedetails.revenueId
            }}
          </li>
          <li>交易金额：{{ revenuedetails.revenueMoney }}</li>
          <li>交易时间：{{ revenuedetails.revenueTime }}</li>
          <li>
            交易类型：{{
              revenuedetails.revenueType == 0
                ? "收入"
                : revenuedetails.revenueType == 1
                ? "支出"
                : ""
            }}
          </li>
          <li>
            支付方式：{{
              revenuedetails.revenueMode == 0
                ? "现金"
                : revenuedetails.revenueMode == 1
                ? "微信"
                : revenuedetails.revenueMode == 2
                ? "支付宝"
                : revenuedetails.revenueMode == 3
                ? "银行卡"
                : ""
            }}
          </li>
          <li>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注：{{
              revenuedetails.revenueRemarks
            }}
          </li>
          <li
            v-if="
              (revenuedetails.studentId != null) |
                (revenuedetails.personalId != null)
            "
          >
            &nbsp;&nbsp;&nbsp;&nbsp;支付人：{{
              revenuedetails.studentId == null
                ? revenuedetails.personal.personalName
                : revenuedetails.student.studentName
            }}
          </li>
          <li v-else>
            &nbsp;&nbsp;&nbsp;&nbsp;付款给：{{
              revenuedetails.studentId1 != null
                ? revenuedetails.student.studentName
                : revenuedetails.personalId1 != null
                ? revenuedetails.personal.personalName
                : ""
            }}
          </li>
        </ul>
      </el-dialog>

      <!-- 上传文件对话款 -->
      <el-dialog
        v-model="importdialogVisible"
        title="文件导入"
        :before-close="handleClose"
        width="30%"
        center
      >
        <el-upload
          class="upload-demo"
          drag
          :limit="limitNum"
          :auto-upload="false"
          accept=".xls"
          action=""
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-exceed="exceedFile"
          :file-list="fileList"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击选择Excel文件</em>
          </div>
        </el-upload>
        <br />
        <div style="text-align: center">
          <el-button size="small" @click="this.importdialogVisible = flase,this.fileList=[]"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="uploadFile"
            >立即导入</el-button
          >
        </div>
      </el-dialog>

      <el-dialog
        v-model="examinedialogVisible"
        title="审批"
        :before-close="handleClose"
        center
      >
        <el-table :data="examinetableData" border style="width: 100%">
          <el-table-column prop="examineId" label="编号" width="180" />
          <el-table-column prop="examineMoney" label="金额" width="180" />
          <el-table-column prop="examineReason" label="原因" />
          <el-table-column prop="examineResult" label="结果">
            <template #default="scope">
              {{
                scope.row.examineResult == 0
                  ? "通过"
                  : scope.row.examineResult == 1
                  ? "未通过"
                  : "待审批"
              }}
            </template>
          </el-table-column>
          <el-table-column prop="submissiontime" label="提交时间" />
          <el-table-column prop="approvaltime" label="审批时间" />
          <el-table-column label="提交人">
            <template #default="scope">
              {{
                scope.row.studentId == null
                  ? scope.row.personalId
                  : scope.row.studentId
              }}
            </template>
          </el-table-column>
          <el-table-column prop="personalId1" label="审批人" />
        </el-table>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import request from "../../../utils/request";
export default {
  data() {
    return {
      TotalPayment:0,//缴费总额
      Reviewed:0,//已审核
      NotApproved:0,//未审核
      cash:0,//现金
      payByCard:0,//刷卡
      WechatPayment:0,//微信支付
      other:0,//其他
      value1:"",
      conut: 0,
      importdialogVisible: false,
      dialogVisible: false,
      examinedialogVisible: false,
      headers: {
        "constnet-type": "multipart/form-data;boundary=" + new Date().getTime(),
        Authorization: localStorage.getItem("token"),
        isNative:true,
      },
      limitNum: 1,
      fileList: [],

      state: "",
      currentPage: 1, //页码
      pageSize: 5, //每页条数
      total: 0, //总条数
      search: "",
      revenueTableData: [],
      revenuedetails: [],
      examinetableData: [],
       options: [{
          value: '0',
          label: '已审核'
        }, {
          value: '1',
          label: '未审核'
        }],
    };
  },

  methods: {
    // paymoneyMoney(){
    //    const paging={
    //    currentPage: this.currentPage,
    //         pageSize: this.pageSize,
    //         search: this.search,
    //   }
    //   request
    //     .post("/PayAndStaffAndstudent/paging", {
    //        Paging:paging
    //     })
    //     .then((res) => {
          
    //       if (res.code == "200") {
    //       // this.TotalPayment=
    //       res.data.records.forEach(e=>{
    //         this.TotalPayment+=e.paymoneyMoney
    //         if(e.incomeState==1){
    //           this.NotApproved+=e.paymoneyMoney
    //         }else{
    //            this.Reviewed+=e.paymoneyMoney
    //         }
    //         if(e.paymoneyMode=="现金"){
    //           this.cash+=e.paymoneyMoney
    //         }else if(e.paymoneyMode=="微信支付"){
    //             this.WechatPayment+=e.paymoneyMoney
    //         }else if(e.paymoneyMode=="刷卡"){
    //             this.payByCard+=e.paymoneyMoney
    //         }else{
    //             this.other+=e.paymoneyMoney
    //         }
    //       })
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     });
    // },
    // 日期（暂放）
    a(s){
      s.forEach(element => {
       console.error(element); 
      });
    },
     handleClose(done) {
      this.fileList=[]
      done();
    },
    // 导出
    exportrevenue() {
      const page1={ 
        currentPage:this.currentPage,
      pageSize:this.pageSize,
     search:this.search
     }
      console.error(page1); 
      
      request.post("/PayAndStaffAndstudent/export",page1).then((res) => {
        if(res.code=="200"){
            this.$notify.success({
                title:"还不错",
                message:res.msg
            })
        }else{
            this.$notify.error({
                title:"错误",
                message:"哎呀！出问题了"
            })
        }
      }).catch(error=>{
          this.$notify.error({
                title:"错误",
                message:"哎呀！出问题了"
            })
      });
    },
    //   分页
    load() {
      if(this.value1!=""){
        this.value1.forEach(e=>{
        console.error(e);
      })
      }
      
      let T=0;
      let N=0
      let R=0
      let C=0
      let W=0
      let P=0
      let O=0;
      const paging={
       currentPage: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
      }
      request
        .post("/PayAndStaffAndstudent/paging", {
          // params: {
           Paging:paging,
           state:this.state,
           data :this.value1[0],
           data1:this.value1[1]
          // },
        })
        .then((res) => {
          if (res.code == "200") {
            this.revenueTableData = res.data.records;
            this.currentPage = res.data.current;
            this.pageSize = res.data.size;
            this.total = res.data.total;
            
            res.data.records.forEach(e=>{
            T+=e.paymoneyMoney
            if(e.incomeState==1){
              N+=e.paymoneyMoney
            }else{
               R+=e.paymoneyMoney
            }
            if(e.paymoneyMode=="现金"){
              C+=e.paymoneyMoney
            }else if(e.paymoneyMode=="微信支付"){
                W+=e.paymoneyMoney
            }else if(e.paymoneyMode=="刷卡"){
                P+=e.paymoneyMoney
            }else{
                O+=e.paymoneyMoney
            }
          })
          this.TotalPayment=T;
          this.NotApproved=N;
          this.Reviewed=R;
          this.cash=C;
          this.WechatPayment=W;
          this.payByCard=P;
          this.other=O;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.load();
    },
    handleCurrentChange(current) {
      this.currentPage = current;
      this.load();
    },
    // 根据id查看编号详情
    details(row) {
      request
        .get("/revenue/findById", { params: { id: row.revenueId } })
        .then((res) => {
          if (res.code == "200") {
            this.dialogVisible = true;
            this.revenuedetails = res.data;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 统计所有待审批的
    conutByResult() {
      request.get("/examine/conutByResult").then((res) => {
        this.conut = res.data;
      });
    },
    //查看所有审批
    examineList() {
      request.get("/examine/list").then((res) => {
        if (res.code == "200") {
          this.examinedialogVisible = true;
          this.examinetableData = res.data;
          console.log(this.examinetableData);
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 文件超出个数限制时的钩子

    exceedFile(files, fileList) {
      this.$notify.warning({
        title: "警告",

        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${
          files.length + fileList.length
        } 个`,
      });
    },

    // 文件状态改变时的钩子

    fileChange(file, fileList) {
      // this.fileList.pop();
      this.fileList=[]
     
      this.fileList.push(file.raw);
      
    },

    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传

    beforeUploadFile(file) {
      // let extension = file.name.substring(file.name.lastIndexOf('.')+1); //获取上传文件的扩展名

      //    console.log("文件扩展名为:"+extension);

      let size = file.size / 1024 / 1024; //设置上传文件的大小

      const isXLSX = file.name.split(".")[1] === "xls"; //获取上传文件的扩展名

      if (!isXLSX) {
        this.$notify.warning({
          title: "警告",

          message: `只能上传Excel2017（即后缀是.xls）的文件`,
        });
      }

      if (size > 10) {
        this.$notify.warning({
          title: "警告",

          message: `文件大小不得超过10M`,
        });
      }
    },
//取消上传
    cancelUpdate(){
      this.dialogVisible=!this.dialogVisible
      this.fileList=[]
    },
    uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件');
      } else {
        let form = new FormData();
        form.append('file', this.fileList[0]);
        // 请求自己服务器上传文件的接口
        request.post("/PayAndStaffAndstudent/import",form,this.headers).then(res=> {
          if (res.code==="200"){
           this.$message.success(res.msg)
           this.importdialogVisible=false
           this.fileList=[]
           this.load()
           this.paymoneyMoney();
          }else{
            this.$message.error("文件上传有误！！！")
          }
        })
      }
      }
  },

  mounted() {
    this.load();
    // this.conutByResult();
    //  this.paymoneyMoney();
  },
};
</script>
<style>
img {
  vertical-align: middle;
}
.function {
  min-height: 32px;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 12px;
  /* border-radius: calc(var(--el-border-radius-base) - 1px); */
}
.el-dialog {
  --el-dialog-width: 70%;
  --el-dialog-margin-top: 15vh;
  --el-dialog-bg-color: var(--el-color-white);
  --el-dialog-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  --el-dialog-title-font-size: var(--el-font-size-large);
  --el-dialog-content-font-size: 14px;
  --el-dialog-font-line-height: var(--el-font-line-height-primary);
  --el-dialog-padding-primary: 20px;
  position: relative;
  margin: var(--el-dialog-margin-top, 15vh) auto 50px;
  background: var(--el-dialog-bg-color);
  border-radius: var(--el-border-radius-small);
  box-shadow: var(--el-dialog-box-shadow);
  box-sizing: border-box;
  width: var(--el-dialog-width, 50%);
}
.upload-demo {
  text-align: center;
}
.el-upload {
  text-align: center;
  cursor: pointer;
  outline: 0;
  margin: 0 10px;
}
.input{
  width: 200px;
  height: 30px;
  padding:0 20px 0 0;
}
</style>