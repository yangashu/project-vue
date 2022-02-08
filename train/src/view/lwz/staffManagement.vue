<template>
  <div class="max">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="正式员工管理" name="one"></el-tab-pane>
      <el-tab-pane label="员工入职管理" name="two"></el-tab-pane>
      <el-tab-pane label="人脸识别管理" name="three"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'one',
    }
  },
  methods:{
    handleClick(){
      if(this.activeName=="one"){
        this.$router.push("/staffManagementOne");
      }else if(this.activeName=='two'){
        this.$router.push("/staffManagementTwo");
      }else if(this.activeName=='three'){
        this.$router.push("/staffManagementThree")
      }
    }
  }
}  
</script>

