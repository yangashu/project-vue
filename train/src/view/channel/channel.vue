<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      menus: [],
      s: [
        {
          navigationId: undefined,
          navigationName: undefined,
          navigationPid: undefined,
          navigationUrl: undefined,
          navigationIcon: undefined,
          childern: [
            {
              navigationId: undefined,
              navigationName: undefined,
              navigationPid: undefined,
              navigationUrl: undefined,
              navigationIcon: undefined,
            },
          ],
        },
      ],
      isCollapse: false,
      a: [
        {
          navigationId: undefined,
          navigationName: undefined,
          navigationPid: undefined,
          navigationUrl: undefined,
          navigationIcon: undefined,
          childern: [],
        },
      ],
    };
  },
  computed: {
    noChildern() {
      return this.menus.filter((item) => item.children<1);
    },
    hasChildern() {
      return this.menus.filter((item) => item.children);
    },
    add(item, element) {
      !item.children && this.reactive(item);
      item.children && item.children.push(element);
    },
  },
  created() {
    request.get("http://localhost:9090/navigation//selAll").then((res) => {
      res.data.data.forEach((item) => {
        this.menus.push(item);
      });
    });
    request
      .get("http://localhost:9090/navigation/findbynavigation_pid")
      .then((res) => {
        this.menus.forEach((item) => {
        const menu = {
                navigationId: item.navigationId,
                navigationName: item.navigationName,
                navigationPid: item.navigationPid,
                navigationUrl: item.navigationUrl,
                navigationIcon: item.navigationIcon,
                children: [],
              };
          res.data.data.forEach((data) => {
            if (item.navigationId == data.navigationPid) { 
              
               const children = {
                navigationId: data.navigationId,
                navigationName: data.navigationName,
                navigationPid: data.navigationPid,
                navigationUrl: data.navigationUrl,
                navigationIcon: data.navigationIcon,
              };
              menu.children.push(children); 
             
            }
          }); 
          this.menus.push(menu)
        });
       
      });
  },
};
</script>

<template>
  <div>
    {{ menus }}
    <!-- {{a}} -->
    <el-menu
      :default-active="$route.path"
      text-color="white"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#272a36"
      style="height: calc(100vh - 70px)"
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
        v-show="mune.children.length>0"
      >
        <template #title >
          <el-icon><img :src="mune.navigationIcon" alt="" /></el-icon>
          <span>{{ mune.navigationName }}</span>
          <!-- {{ mune.children }} -->
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="childern in mune.children"
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

