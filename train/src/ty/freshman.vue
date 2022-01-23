<template>
<!-- 大div  主要是进行颜色分层 -->
<div style="background-color:#f5f7fa;">
  <!-- 包住所有内容 -->
<div style="background-color:white;">


<!-- 步骤条 -->
  <div style="padding-top:1%;">
    <el-steps :active="active" finish-status="success" simple style="width:60%;margin:0 auto;border-radius:25px;">
  <el-step title="1、确认学员基本信息" icon="el-icon-edit"></el-step>
  <el-step title="2、选择报名课程" icon="el-icon-upload"></el-step>
  <el-step title="3、支付信息" icon="el-icon-picture"></el-step>
</el-steps>
<!-- 步骤条下面的内容 -->
 <div>
      <firststep v-if="this.active==0"></firststep>
      <secondstep v-else-if="this.active==1"></secondstep>
      <thirdstep v-else-if="this.active==2"></thirdstep>
  </div>
  <!-- 上一步按钮 -->
  <el-button v-if="this.active==0" style="margin-left: 38%;margin-top: 3%;margin-bottom: 2%;" @click="nextOne">取消</el-button>
  <el-button v-else-if="this.active<=2" style="margin-left: 38%;margin-top: 3%;margin-bottom: 2%;" @click="nextOne">上一步</el-button>
  <!-- 下一步按钮 -->
  <el-button v-if="this.active<2" style="margin-left:4%;" @click="next">下一步</el-button>
  <el-button v-else-if="this.active==2" style="margin-left:4%" @click="open">确认提交</el-button>
  
  </div>





</div>
  </div>
</template>

<script>
import firststep from '../ty/firststep.vue'
import secondstep from '../ty/secondstep.vue'
import thirdstep from '../ty/thirdstep.vue' 
export default {
  data() {
    return {
      active: 0,
      nextone:"取消",
      routepath:JSON.parse(sessionStorage.getItem("routepath"))
    }
  },

  methods: {
    open() {
        this.$confirm('请确认报名信息无误,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '报名成功!'
          });
          this.nextaa()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消报名'
          });          
        });
      },
    nextaa(){
this.routepath.forEach(item => {
            this.$router.push(item.path)
          });
    },
    // 下一步
    next() {
        this.active++
        if(this.active == 2){
          //  this.routepath.forEach(item => {
          //   this.$router.push(item.path)
          // });
        }
      if (this.active > 2) {
      this.active = 0
      }
      
    },
    // 上一步
    nextOne() {
        
        if(this.active == 0){
          this.routepath.forEach(item => {
            this.$router.push(item.path)
          });
           
        }
        this.active--
      if (this.active <1) {
      this.active = 0
      }
    },
  }, 
  components:{
        firststep,
        secondstep,
      thirdstep
    }
}
</script>