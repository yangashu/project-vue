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
  <!-- 下一步按钮 -->
  <el-button style="margin-top: 2%;margin-left:50%;margin-bottom:2%;" @click="next">{{Next}}</el-button>
  
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
       Next:"下一步",
      active: 0,
    }
  },

  methods: {
    next() {
        this.active++
        if(this.active == 2){
            this.Next="ok"
        }
      if (this.active > 2) {
          this.Next="下一步"
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