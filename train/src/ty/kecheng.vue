<template>
  <div style="background: #f5f7fa">
    <div class="tou">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 课程管理 -->
        <el-tab-pane label="课程管理" name="first">
          <div class="kecheng" style="margin-left:2%;margin-top:1%;margin-bottom:2%;">
            <el-table
            class="scheduletable"
                  :data="tableData"
                  border
                  style="width: 98%"
                >
              <el-table-column prop="kcname" label="课程名称" width="180" />
              <el-table-column prop="kcjine" label="课程金额" width="180" />
              <el-table-column prop="kcsl" label="课程数量" width="180" />
              <el-table-column prop="kcdanjia" label="课程单价" width="180" />
              <el-table-column prop="shubenfei" label="书本费" />
              <el-table-column label="操作">
                <template #default>
                  <el-button type="text" size="mini" @click="bianjikc = true"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 教程管理 -->
        <el-tab-pane label="教程管理" name="second">
          <el-tabs
            v-model="activeName1"
            @tab-click="handleClick"
            type="border-card"
          >
 <!--
==================================================================================================================================
         教程入库
          -->
            <el-tab-pane label="教程入库" name="first">
              <el-select
                style="width: 7%"
                v-model="shousuoxlk"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <!-- 搜索框 -->
              <el-input style="width: 15%" v-model="shoushuokuan" />

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
                @click="xinzengkc = true"
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
                新增教程
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
                删除
              </el-button>
              <br />
              <!-- 教程表格 -->
              <el-table :data="jiaocai" stripe style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
                <el-table-column prop="jcname" label="教程名称" width="180" />
                <el-table-column
                  prop="jcshulian"
                  label="教程数量"
                  width="180"
                />
                <el-table-column prop="jcjiage" label="教程金额" width="180" />
                <el-table-column prop="caigouyuan" label="采购员" width="180" />
                <el-table-column prop="kcname" label="课程" width="180" />
                <el-table-column prop="cgdate" label="采购时间" />
                <el-table-column label="操作">
                  <template #default>
                    <el-button
                      type="text"
                      size="small"
                      @click="zhuijiakc = true"
                      >追加库存</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!-- 
===================================================================================================================================
                教程出库
             -->
            <el-tab-pane label="教程出库" name="second">

                <!-- 搜索框 -->
              <el-input style="width: 15%" v-model="shoushuokuan" />

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
                @click="jiaocaick = true"
                style="
                  background: #f60;
                  --el-button-hover-color: #ff9f5f;
                  --el-button-active-background-color: #d35400;
                  --el-button-border-color: black;
                  --el-button-hover-color: #f60;
                  color: white;
                  margin-left: 57%;
                "
              >
                <el-icon><plus /></el-icon>
                教程出库
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
                删除
              </el-button>
    <!-- 
=====================================================================================================================
          表格
    -->
              <el-table :data="jiaocai.slice((currentPage-1)*size,currentPage*size)" stripe style="width: 100%">
                <el-table-column type="selection" width="55" />
                <el-checkbox v-model="checked1" label="Option 1"></el-checkbox>
                <el-table-column prop="jcname" label="教程名称" width="180" />
                <el-table-column
                  prop="jcshulian"
                  label="出库数量"
                  width="180"
                />
                <el-table-column prop="jcjiage" label="申请人" width="180" />
                <el-table-column prop="caigouyuan" label="班级名称" width="180" />
                <el-table-column prop="cgdate" label="出库时间" />
                <el-table-column label="操作">
                  <template #default>
                    <el-button
                      type="text"
                      size="small"
                      @click="xgjiaocaick = true"
                      >编辑出库教程</el-button
                    >
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
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 
==========================================================================================================================
        编辑管理
     -->
    <el-form ref="bjkc" :model="bjkc" label-width="120px" :rules="bjkcrules">
      <el-dialog v-model="bianjikc" title="编辑课程管理" width="50%" center>
        <!-- 编辑课程名称 -->
        <el-form-item label="课程名称">
          <el-input
            style="width: 30%"
            disabled
            v-model="bjkc.kcname"
          ></el-input>
        </el-form-item>
        <!-- 编辑课程金额 -->
        <el-form-item
          prop="kcje"
          style="position: relative; top: -8.4ex; left: 40%"
          label="课程金额"
          :rules="[{ type: 'number', message: '请输入正确金额' }]"
        >
          <el-input style="width: 30%" v-model.number="bjkc.kcje"></el-input>
        </el-form-item>
        <!-- 编辑课程课时 -->
        <el-form-item
          prop="kcks"
          style="position: relative; top: -3.4ex"
          label="课程数量"
          :rules="[{ type: 'number', message: '请输入正确课时' }]"
        >
          <el-input
            style="width: 30%"
            @change="suan()"
            v-model.number="bjkc.kcks"
          ></el-input>
        </el-form-item>
        <!-- 编辑课程单价 -->
        <el-form-item
          prop="kcdj"
          style="position: relative; top: -11.7ex; left: 40%"
          label="课程单价"
          :rules="[{ type: 'number', message: '请输入正确单价' }]"
        >
          <el-input
            style="width: 30%"
            @change="suan()"
            v-model.number="bjkc.kcdj"
          ></el-input>
        </el-form-item>
        <!-- 编辑书本费 -->
        <el-form-item
          prop="shuben"
          style="position: relative; top: -7.7ex"
          label="书本价格"
          :rules="[{ type: 'number', message: '请输入正确费用' }]"
        >
          <el-input style="width: 30%" v-model.number="bjkc.shuben"></el-input>
        </el-form-item>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="bianjikc=false">取消</el-button>
            <el-button type="primary" @click="submitForm('bjkc')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>

    <!-- 
======================================================================================================================================        
        追加教程数量
     -->
    <el-form ref="jiaocai" :model="jiaocai" label-width="120px">
      <el-dialog v-model="zhuijiakc" title="追加教程" width="50%" center>
        <!-- 编辑教程名称 -->
        <el-form-item label="教程名称">
          <el-input
            style="width: 30%"
            disabled
            v-model="jiaocai.jcname"
          ></el-input>
        </el-form-item>
        <!-- 编辑教程金额 -->
        <el-form-item
          prop="jcjiage"
          style="position: relative; top: -8.4ex; left: 40%"
          label="教程金额"
        >
          <el-input
            disabled
            style="width: 30%"
            v-model.number="jiaocai.jcjiage"
          ></el-input>
        </el-form-item>
        <!-- 编辑教程数量 -->
        <el-form-item
          prop="zjsl"
          style="position: relative; top: -3.4ex"
          label="追加教程数量"
          :rules="[{ type: 'number', message: '请输入正确数量' }]"
        >
          <el-input style="width: 30%" v-model.number="jiaocai.zjsl"></el-input>
        </el-form-item>
        <!-- 编辑采购员-->
        <el-form-item
          prop="caigouyuan"
          style="position: relative; top: -11.7ex; left: 40%"
          label="采购员"
        >
          <el-input
            disabled
            style="width: 30%"
            v-model="jiaocai.caigouyuan"
          ></el-input>
        </el-form-item>
        <!-- 编辑课程 -->
        <el-form-item
          prop="kecheng"
          style="position: relative; top: -7.7ex"
          label="课程"
          disabled
        >
          <el-input
            disabled
            style="width: 30%"
            v-model="jiaocai.kecheng"
          ></el-input>
        </el-form-item>

        <!-- 编辑时间 -->
        <el-form-item
          style="position: relative; top: -16ex; left: 40%"
          label="采购时间"
        >
          <el-input
            disabled
            style="width: 30%"
            v-model="jiaocai.cgdate"
          ></el-input>
        </el-form-item>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitForm1('jiaocai')"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-form>

    <!-- 
================================================================================================================================        
        新增教程
     -->
    <el-form ref="xzjc" :rules="rulejc" :model="xzjc" label-width="120px">
      <el-dialog v-model="xinzengkc" title="新增教程" width="50%" center>
        <!-- 新增教程名称 -->
        <el-form-item label="教程名称" prop="jcname">
          <el-input style="width: 30%" v-model="xzjc.jcname"></el-input>
        </el-form-item>
        <!-- 新增教程金额 -->
        <el-form-item
          prop="jcjiage"
          style="position: relative; top: -8.4ex; left: 40%"
          label="教程金额"
        >
          <el-input style="width: 30%" v-model.number="xzjc.jcjiage"></el-input>
        </el-form-item>
        <!-- 教程数量 -->
        <el-form-item
          prop="jcshulian"
          style="position: relative; top: -3.4ex"
          label="教程数量"
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjc.jcshulian"
          ></el-input>
        </el-form-item>
        <!-- 新增采购员-->
        <el-form-item
          prop="caigouyuan"
          style="position: relative; top: -11.7ex; left: 40%"
          label="采购员"
        >
          <el-input style="width: 30%" v-model="xzjc.caigouyuan"></el-input>
        </el-form-item>
        <!-- 新增课程 -->
        <el-form-item
          prop="kecheng"
          style="position: relative; top: -7.7ex"
          label="课程"
        >
          <el-select v-model="xzjc.kecheng" style="width: 30%">
            <el-option
              v-for="item in kc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 新增时间 -->
        <el-form-item
          style="position: relative; top: -16ex; left: 40%"
          prop="cgdate"
          label="采购时间"
        >
          <el-date-picker
            :locale="locale"
            style="width: 30%"
            v-model="xzjc.cgdate"
            type="date"
          >
          </el-date-picker>
        </el-form-item>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="kconoff('xzjc')"
              >确定</el-button
            >
            <el-button @click="kcquxiao('xzjc')">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </el-form>
    <!-- 
============================================================================================================================        
        教材出库窗口
     -->
     <el-form ref="xzjcck" :rules="ruleck" :model="xzjcck" label-width="120px">
      <el-dialog v-model="jiaocaick" title="新增教程" width="50%" center>
        <!-- 出库教程名称 -->
        <el-form-item label="教程名称" prop="jcname">
          <el-input style="width: 30%" v-model="xzjcck.jcname"></el-input>
        </el-form-item>
        <!-- 出库教程数量 -->
        <el-form-item
          prop="cksl"
          style="position: relative; top: 2ex"
          label="教程数量"
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjcck.cksl"
          ></el-input>
        </el-form-item>
        <!-- 新增申请人-->
        <el-form-item
          prop="sqr"
          style="position: relative; top: -16.7ex; left: 40%"
          label="采购员"
        >
        <el-select style="width: 30%" v-model="xzjcck.sqr">
            <el-option ></el-option>
        </el-select>
        </el-form-item>
        <!-- 班级名称 -->
        <el-form-item
          prop="bjmc"
          style="position: relative; top: -4.5ex"
          label="班级名称"
        >
          <el-select v-model="xzjcck.bjmc" style="width: 30%">
            <el-option
              v-for="item in kc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 出库时间 -->
        <el-form-item
          style="position: relative; top: -23ex; left: 40%"
          prop="cksj"
          label="出库时间"
        >
          <el-date-picker
            :locale="locale"
            style="width: 30%"
            v-model="xzjcck.cksj"
            type="date"
          >
          </el-date-picker>
        </el-form-item>

        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="ckonoff('xzjcck')"
              >确定</el-button
            >
            <el-button @click="ckquxiao('xzjcck')">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </el-form>

    <!--
================================================================================================================================        
        编辑出库教程
      -->
       <el-dialog v-model="xgjiaocaick" title="编辑出库教程" width="50%" center>
      <el-form ref="xzjcck" :rules="ruleout" :model="xzjcck" label-width="120px">
     
        <!-- 出库教程名称 -->
        <el-form-item label="教程名称" prop="jcname">
          <el-input style="width: 30%" v-model="xzjcck.jcname"></el-input>
        </el-form-item>
        <!-- 出库教程数量 -->
        <el-form-item
          prop="cksl"
          style="position: relative; top: 2ex"
          label="教程数量"
        >
          <el-input
            style="width: 30%"
            v-model.number="xzjcck.cksl"
          ></el-input>
        </el-form-item>
        <!-- 新增申请人-->
        <el-form-item
          prop="sqr"
          style="position: relative; top: -16.7ex; left: 40%"
          label="采购员"
        >
        <el-select style="width: 30%" v-model="xzjcck.sqr">
            <el-option ></el-option>
        </el-select>
        </el-form-item>
        <!-- 班级名称 -->
        <el-form-item
          prop="bjmc"
          style="position: relative; top: -4.5ex"
          label="班级名称"
        >
          <el-select v-model="xzjcck.bjmc" style="width: 30%">
            <el-option
              v-for="item in kc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 出库时间 -->
        <el-form-item
          style="position: relative; top: -23ex; left: 40%"
          prop="cksj"
          label="出库时间"
        >
          <el-date-picker
            :locale="locale"
            style="width: 30%"
            v-model="xzjcck.cksj"
            type="date"
          >
          </el-date-picker>
        </el-form-item>
</el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="bjckonoff('xzjcck')"
              >确定</el-button
            >
            <el-button @click="bjckquxiao('xzjcck')">取消</el-button>
          </span>
        </template>
    
     </el-dialog>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
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
    ElConfigProvider,
    search: Search,
    edit: Edit,
    delete: Delete,
    plus: Plus,
  },
  props: {},
  data() {
    return {
      locale: zhCn,
      activeName: "first",
      activeName1: "first",
      //编辑课程弹窗
      bianjikc: false,
      //新增课程弹窗
      xinzengkc: false,
      //追加课程弹窗
      zhuijiakc: false,
      //教程出库弹窗
      jiaocaick:false,
      //编辑教程出库弹窗
      xgjiaocaick:false,
      //分页
       sizes:[1,2,3,4],
      size:1,
      currentPage: 1,
    //编辑课程
      bjkc: {
        kcname: "java",
        kcks: 0,
        kcdj: 0,
        shuben: "",
        kcje: 0,
      },
      //课程
      tableData: [
        {
          kcname: "java",
          kcjine: 18000,
          kcsl: 180,
          kcdanjia: 100,
          shubenfei: 500,
        },
      ],
      //教程
      jiaocai: [
        {
          jcname: "java一条龙",
          jcshulian: 100,
          jcjiage: 200,
          caigouyuan: "大力",
          cgdate: new Date(),
          kcname: "java",
          zjsl: 0,
        },
      ],
      //新增教程
      xzjc: [
        {
          jcname: "",
          jcshulian: 0,
          jcjiage: 0,
          caigouyuan: "",
          cgdate: new Date(),
          kcname: "",
          zjsl: 0,
        },
      ],
      //新增教程出库
      xzjcck:[
          {
              jcname:"",
              cksl:"",
              sqr:"",
              bjmc:'',
              cksj:new Date,
          }
          ],
      rulejc: {
        jcname: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        jcshulian: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确数量' }
        ],
        jcjiage: [
          {
            required: true,
            message: "教程价格不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确金额' },
        ],
        caigouyuan: [
          {
            required: true,
            message: "采购人不能为空",
            trigger: "blur",
          },
        ],
        kcname: [
          {
            required: true,
            message: "课程名称不能为空",
            trigger: "blur",
          },
        ],
      },
      //添加出库规则
       ruleck: {
        jcname: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        cksl: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确数量' }
        ],
        sqr: [
          {
            required: true,
            message: "申请人不能为空",
            trigger: "blur",
          },
        ],
        bjmc: [
          {
            required: true,
            message: "班级名称不能为空",
            trigger: "blur",
          },
        ],
      },
      //编辑出库规则
      ruleout: {
        jcname: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur",
          },
        ],
        cksl: [
          {
            required: true,
            message: "数量不能为空",
            trigger: "blur",
          },
          { type: 'number', message: '请输入正确数量' }
        ],
        sqr: [
          {
            required: true,
            message: "申请人不能为空",
            trigger: "blur",
          },
        ],
        bjmc: [
          {
            required: true,
            message: "班级名称不能为空",
            trigger: "blur",
          },
        ],
      },
      //教程入库跟进名称或入库人查询
      options: ref([
        {
          value: "教程名称",
          label: "教程名称",
        },
        {
          value: "入库人",
          label: "入库人",
        },
      ]),

      kc: ref([
        {
          value: "java",
          label: "java",
        },
      ]),
      shousuoxlk: "",
      shoushuokuan: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
       //编辑教程库存窗口
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bianjikc = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加教程库存窗口
      kconoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.xinzengkc = false;
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    kcquxiao(formName){
        this.$refs[formName].resetFields()
         this.xinzengkc = false;
    },
    //添加出库窗口
    ckonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.jiaocaick = false;
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ckquxiao(formName){
        this.$refs[formName].resetFields()
         this.jiaocaick = false;
    },
    //添加编辑出库窗口
     bjckonoff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.xgjiaocaick = false;
         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    bjckquxiao(formName){
        this.$refs[formName].resetFields()
         this.xgjiaocaick = false;
    },
    // //追加教程库存窗口
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.zhuijiakc = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    suan() {
      let jg = this.bjkc.kcdj * this.bjkc.kcks;
      this.bjkc.kcje = jg;
    },
    handleSizeChange(val) {
        this.size=val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage=val
        console.log(`当前页: ${val}`);
      },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
* {
  padding: 0%;
  margin: 0%;
}
.wrapper {
}
.tou {
  width: 99%;
  background: #fff;
  // margin: 0 0 10px;
  margin-left: 0.5%;
}
// 表格背景色
.scheduletable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
</style>