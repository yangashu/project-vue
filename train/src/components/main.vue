<template>
  <div style="width:100%">
    <div style="margin:auto;width:1027px">
      <h2 style="text-align:center">个人简历</h2>
      <table border="1" style="border-collapse: collapse;">
        <tr>
          <td>姓名</td>
          <td><input type="text" name="" id="" /></td>
          <td>性别</td>
          <td><input type="text" name="" id="" /></td>
          <td>出生年月</td>
          <td><input type="text" name="" id="" /></td>
          <td rowspan="3" style="height:160px;width:120px">照片</td>
        </tr>
        <tr>
          <td>身份证号码</td>
          <td><input type="text" name="" id="" /></td>
          <td>民族</td>
          <td><input type="text" name="" id="" /></td>
          <td>政治面貌</td>
          <td><input type="text" name="" id="" /></td>
        </tr>
        <tr>
          <td>婚姻状况</td>
          <td><input type="text" name="" id="" /></td>
          <td>健康状况</td>
          <td><input type="text" name="" id="" /></td>
          <td>身高</td>
          <td><input type="text" name="" id="" /></td>
        </tr>

        <tr>
          <td>现户口所在地</td>
          <td></td>
          <td>所学专业</td>
          <td></td>
          <td>学历</td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>最后毕业学校</td>
          <td></td>
          <td>毕业时间</td>
          <td></td>
          <td>技术职称</td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>现工作单位</td>
          <td></td>
          <td>参加工作时间</td>
          <td></td>
          <td>先从事专业</td>
          <td colspan="2"></td>
        </tr>

        <tr>
          <td rowspan="6">主要简历</td>
          <td colspan="2">起止年月</td>
          <td colspan="2">在何单位（学校）</td>
          <td colspan="2">任何职位</td>
        </tr>
        <tr>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
        </tr>
        <tr>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
        </tr>
        <tr>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
        </tr>
        <tr>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
        </tr>
        <tr>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
          <td colspan="2"><input type="text" name="" id="" /></td>
        </tr>

        <tr>
          <td>自身业务专长及在校学习成果</td>
          <td colspan="6">
            <textarea
              name=""
              id="area"
              cols="30"
              rows="10"
              clearable="true"
            ></textarea>
            <!-- <el-input
              id="area"
              v-model="textarea1"
              autosize
              type="textarea"
              placeholder="Please input"
              style="height:200px"
            /> -->
          </td>
        </tr>

        <tr>
          <td>通讯地址</td>
          <td colspan="2"></td>
          <td>邮政编号</td>
          <td colspan="3"></td>
        </tr>
        <tr>
            <td>联系电话</td>
            <td colspan="2"></td>
            <td>Email地址</td>
            <td colspan="3"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import { defineComponent, ref } from 'vue'
export default {
  data() {
    return {
      textarea1: "",
    };
  },
};
</script>
<style scoped>
input {
  border: none;
  outline: none;
}
#area {
  height: 100 px;
  width: 100%;
  border: 0;
  outline: 0;
  resize: none;
}
td{
    text-align: center;
    height: 40px;
}
</style>