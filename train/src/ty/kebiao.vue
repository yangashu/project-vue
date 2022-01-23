<template>
  <!-- <div class="wrapper"> -->
  <div class="tou">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 
=================================================================================================================================            
                  排课
               -->
      <el-tab-pane label="排课" name="first">
        <div style="background: #f5f7fa; width: 100%; height: 2ex"></div>
        <!-- 搜索框 -->
        <div style="margin-top: 10px">
          <el-input
            style="width: 15%"
            v-model="shoushuokuan"
            placeholder="输入班级名称"
          />

          <!-- 搜索按钮 -->
          <el-button
            style="
              background: #f60;
              --el-button-hover-color: #ff9f5f;
              --el-button-active-background-color: #d35400;
              --el-button-border-color: black;
              --el-button-hover-color: #f60;
            "
            type="primary"
          >
            <el-icon>
              <search />
            </el-icon>
          </el-button>
          <el-button
            @click="kspaike = true"
            style="
              background: #f60;
              --el-button-hover-color: #ff9f5f;
              --el-button-active-background-color: #d35400;
              --el-button-border-color: black;
              --el-button-hover-color: #f60;
              color: white;
              margin-left: 51%;
            "
          >
            <el-icon><plus /></el-icon>
            快速排课
          </el-button>
          <el-button
            style="
              background: #f60;
              --el-button-hover-color: #ff9f5f;
              --el-button-active-background-color: #d35400;
              --el-button-border-color: black;
              --el-button-hover-color: #f60;
              color: white;
            "
          >
            <el-icon><delete /></el-icon>
            批量删除
          </el-button>
        </div>
        <!-- 
 =================================================================================================================================              
            表格
         -->
        <el-table
          :data="paike.slice((currentPage - 1) * size, currentPage * size)"
          stripe
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" />
          <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
          <el-table-column prop="skdate" label="上课时间" width="180" />
          <el-table-column prop="kcname" label="课程名称" width="180" />
          <el-table-column prop="banjiname" label="班级名称" width="180" />
          <el-table-column prop="sklaoshi" label="上课教师" width="180" />
          <el-table-column prop="skzuangtai" label="状态" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" size="small" @click="dianming = true"
                >点名</el-button
              >
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--
=============================================================================================================================
       分页
     -->
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="sizes"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="4"
          >
          </el-pagination>
        </div>

        <!-- 
================================================================================================================================
    新增课表
 -->
        <el-form
          ref="xzpaike"
          :rules="ruleck"
          :model="xzpaike"
          label-width="120px"
        >
          <el-dialog v-model="kspaike" title="排课" width="50%" center>
            <!-- 班级名称-->
            <el-form-item prop="banjiname" label="班级名称">
              <el-input
                style="width: 30%"
                v-model="xzpaike.banjiname"
              ></el-input>
            </el-form-item>
            <!-- 开始日期 -->
            <el-form-item label="开始日期" prop="kaishidate">
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.kaishidate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker>
            </el-form-item>
            <!-- 结束日期-->
            <el-form-item
              prop="jieshudate"
              style="position: relative; top: -8.4ex; left: 40%"
              label="结束日期"
            >
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.jieshudate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider
              style="margin-top: -38px"
              border-style="dashed"
            ></el-divider>
            <!-- 上午上课时间-->
            <el-form-item
              prop="swskdate"
              style="position: relative; top: 5ex"
              label="上午上课时间"
            >
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.swskdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker>
            </el-form-item>
            <!-- 上午结束时间-->
            <el-form-item
              prop="swjsdate"
              style="position: relative; top: -3.6ex; left: 40%"
              label="上午结束时间"
            >
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.swjsdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker>
            </el-form-item>

            <!-- 下午上课时间-->
            <el-form-item
              prop="xwskdate"
              style="position: relative; top: -2ex"
              label="下午上课时间"
            >
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.xwskdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker>
            </el-form-item>
            <!-- 下午结束时间-->
            <el-form-item
              prop="xwjsdate"
              style="position: relative; top: -10.6ex; left: 40%"
              label="下午结束时间"
            >
              <el-date-picker
                style="width: 30%"
                v-model="xzpaike.xwjsdate"
                type="date"
                placeholder="选择开始日期"
              ></el-date-picker>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider
              style="margin-top: -38px"
              border-style="dashed"
            ></el-divider>
            <!-- 上午课程-->
            <el-form-item prop="swkc" label="上午课程">
              <el-input style="width: 30%" v-model="xzpaike.swkc"></el-input>
            </el-form-item>
            <!-- 下午课程-->
            <el-form-item
              prop="xwkc"
              style="position: relative; top: -8.4ex; left: 40%"
              label="下午课程"
            >
              <el-input style="width: 30%" v-model="xzpaike.xwkc"></el-input>
            </el-form-item>

            <!-- 上午上课老师 -->
            <el-form-item
              prop="swskls"
              style="position: relative; top: -4.5ex"
              label="上午上课老师"
            >
              <el-select v-model="xzpaike.swskls" style="width: 30%">
                <el-option
                  v-for="item in kc"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 下午上课老师 -->
            <el-form-item
              prop="xwskls"
              style="position: relative; top: -12.8ex; left: 40%"
              label="下午上课老师"
            >
              <el-select v-model="xzpaike.xwskls" style="width: 30%">
                <el-option
                  v-for="item in kc"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="pkonoff('xzpaike')"
                  >确定</el-button
                >
                <el-button @click="pkquxiao('xzpaike')">取消</el-button>
              </span>
            </template>
          </el-dialog>
        </el-form>

        <!-- 
==================================================================================================================================    
    点名窗口
-->
        <el-dialog v-model="dianming" title="编辑出库教程" width="60%" center>
          <el-form
            ref="xzjcck"
            :rules="ruleout"
            :model="xzjcck"
            label-width="120px"
          >
            <el-table :data="xueyuandm" height="250" style="width: 100%">
    <el-table-column prop="xsname" label="学生姓名" width="150" />
    <el-table-column prop="xszt" label="学生上课情况" width="150" />
    <el-table-column  label="点名操作" >
        <el-radio-group v-model="radio">
    <el-radio :label="0">到课</el-radio>
    <el-radio :label="1">请假</el-radio>
     <el-radio :label="2">迟到</el-radio>
    <el-radio :label="3">旷课</el-radio>
    <el-radio :label="4">未点名</el-radio>
  </el-radio-group>
    </el-table-column>
  </el-table>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="dmonoff('xueyuandm')"
                >确定</el-button
              >
              <el-button @click="dmquxiao('xueyuandm')">取消</el-button>
            </span>
          </template>
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="总课表查看" name="second">
        <div style="">
          <table style="width: 100%;font-family: verdana,arial,sans-serif;
          font-size:11px;
          color:#333333;
          text-align:center;
          border-width: 1px;
          border-color: #666666;
          border-collapse: collapse;" border="1">
            <tr>
  <th rowspan="2">星期</th>
 <th rowspan="2">日期</th>
  <th rowspan="1">时间</th>
 <th colspan="5">上午（8：00——12：00）</th>
  <th colspan="5">下午（14：00——17：00）</th>
</tr>

<tr>
 <th rowspan="1">班级</th>
<th colspan="1">教员</th>
<th colspan="4">上课内容</th>
 <th colspan="1">教员</th>
<th colspan="4">上课内容</th>
</tr>
<tr>
	
    <td>a</td>
    <td>a</td>
    <td>a</td>
    <td>a</td>
    <td colspan="4">a</td>
    <td>a</td>
    <td colspan="4">a</td>
</tr>
          </table>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  ArrowLeft,
  Edit,
  Share,
  Delete,
  ArrowRight,
  Close,
  Apple,
  Search,
  ArrowDown,
  Plus,
} from "@element-plus/icons";
export default {
  components: {
    search: Search,
    plus: Plus,
  },
  props: {},
  data() {
    return {
      activeName: "first",
      //快速排课窗口
      kspaike: false,
      //点名操作
      radio:4,
      //点名窗口
      dianming: false,
      //排课分页
      sizes: [1, 2, 3, 4],
      size: 1,
      currentPage: 1,
      //排课数据
      paike: [
        {
          skdate: new Date(),
          kcname: "java",
          banjiname: "tro2201",
          sklaoshi: "小博",
          skzuangtai: "未上",
        },
      ],
      //新增排课
      xzpaike: [
        {
          kaishidate: "", //开始时间
          jieshudate: "", //结束时间
          banjiname: "", //班级名称
          swkc: "", //上午课程
          xwkc: "", //下午课程
          swskdate: "", //上午上课时间
          swjsdate: "", //上午结束时间
          xwskdate: "", //下午上课时间
          xwjsdate: "", //下午结束时间
          swskls: "", //上午上课老师
          xwskls: "", //下午上课老师
        },
      ],
      xueyuandm:[
          {
              xsname:'小博',
              xszt:'未上课',
          }
          ],
      //增加排课规则
      ruleck: {
        kaishidate: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "blur",
          },
        ],
        jieshudate: [
          {
            required: true,
            message: "结束时间不能为空",
            trigger: "blur",
          },
        ],
        banjiname: [
          {
            required: true,
            message: "班级不能为空",
            trigger: "blur",
          },
        ],
        swkc: [
          {
            required: true,
            message: "上午课程不能为空",
            trigger: "blur",
          },
        ],
        xwkc: [
          {
            required: true,
            message: "下午课程不能为空",
            trigger: "blur",
          },
        ],
        swskdate: [
          {
            required: true,
            message: "上午上课时间不能为空",
            trigger: "blur",
          },
        ],
        swjsdate: [
          {
            required: true,
            message: "上午结束时间不能为空",
            trigger: "blur",
          },
        ],
        xwskdate: [
          {
            required: true,
            message: "下午上课时间不能为空",
            trigger: "blur",
          },
        ],
        xwjsdate: [
          {
            required: true,
            message: "下午结束时间不能为空",
            trigger: "blur",
          },
        ],
        swskls: [
          {
            required: true,
            message: "上午上课老师不能为空",
            trigger: "blur",
          },
        ],
        xwskls: [
          {
            required: true,
            message: "下午上课老师不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
      //排课开关
    pkonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.kspaike = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    pkquxiao(formName) {
      this.$refs[formName].resetFields();
      this.kspaike = false;
    },
    //点名开关
     dmonoff(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
          this.dianming = false;
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
     // });
    },
    dmquxiao(formName) {
     // this.$refs[formName].resetFields();
      this.dianming = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
html {
  background: rgb(245, 247, 250);
}
.tou {
  width: 98%;
  background: #fff;
  // margin: 0 0 10px;
  margin-left: 1%;
}
</style>