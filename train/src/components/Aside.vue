<script>
import request from "../utils/request";
export default {
  data() {
    return {
      menus: [],
      isCollapse:false  
    };
  },
  computed: {
    noChildern() {
      return this.menus.filter((item) => item.child<1);
    },
    hasChildern() {
      return this.menus.filter((item) => item.child);
    },
  },
  methods: {
    menulist(){
      request.get("/navigation/list").then(res=>{
        // console.log("左边菜单栏：",res);
        this.menus=res.data
      })
    }
  },
  created() {
     this.menulist()  
  },
  
};
</script>

<template>
  <div>
    <el-menu
      :default-active="$route.path"
      text-color="white"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#272a36"
      style="height: calc(100vh - 50px)"
      :unique-opened="true"
      router
    >
      <div style="margin: auto">
        <button id="collapse" @click="isCollapse = !isCollapse">
          {{ isCollapse == true ? "|||" : "三" }}
        </button>
      </div>
      <el-menu-item
        v-for="mune in noChildern"
        :key="mune"
        :index="mune.navigationUrl"
        @click="isCollapse = false"
      >
        <!-- <template #title> -->
        <el-icon><img :src="mune.navigationIcon" alt="" /></el-icon>
        <span>{{ mune.navigationName }}</span>
        <!-- </template> -->
      </el-menu-item>

      <el-sub-menu
        v-for="mune in hasChildern"
        :key="mune"
        :index="mune.navigationUrl"
        v-show="mune.child.length>0"
      >
        <template #title >
          <el-icon><img :src="mune.navigationIcon" alt="" /></el-icon>
          <span>{{ mune.navigationName }}</span>
          <!-- {{ mune.children }} -->
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="childern in mune.child"
            :key="childern"
            :index="childern.navigationUrl"
            @click="isCollapse = false"
          >
            <el-icon
              ><img
                :src="childern.navigationIcon"
                
            /></el-icon>
            <span>{{ childern.navigationName }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

#collapse {
  display: block;
  margin: auto;
  background: #272a36;
  outline: 0;
  border: none;
  border-radius: 0;
  color: white;
}
</style>

