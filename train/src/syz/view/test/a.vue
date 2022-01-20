<template>
  <div @click="loda">按钮</div>
</template>

<script>
import request from '../../../utils/request.js';
export default {
  data() {
    return {
    };
  },
  methods: {
    loda(){
      request.get("http://localhost:9090/staff/a").then(res=>{
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>