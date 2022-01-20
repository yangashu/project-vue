<template>
  <div> 
      <!-- 头部 -->
   <div style="height:50px">
    <Header/>
   </div>
   <div style="display:flex">
     
        <Aside/>
        <!-- background:#F5F8FD -->
        <router-view style="flex:1;width:88%;padding:0 8px;overflow-y:auto;"/>
        <!-- <router-view style="flex:1;width:88%;padding:8px;height:(100vh-50px);overflow-y:auto;"/> -->
   </div>
      
    </div>
</template>
<script setup>
import Header from '../components/Header.vue';
import Aside from '../components/Aside.vue';

</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>