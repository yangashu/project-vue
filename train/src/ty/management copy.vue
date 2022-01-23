<template>
  <div style="background: #f5f7fa">
    <!-- 班级管理页面头部 -->
    <div
      style="background: #fff; width: 99%; margin: 0px auto; padding-bottom: 1%"
    >
      <div style="margin-top: 8px">
        <!-- 搜索文本框 -->
        <el-input
          style="width: 15%; margin-left: 1%; margin-top: 1%"
          placeholder="请输入班级名称"
          v-model="input"
          clearable
          size="small"
        >
        </el-input>
        <!-- 搜索按钮 -->
        <el-button
          type="primary"
          style="height: 8px"
          size="small"
          @click="openselect"
        >
          <el-icon>
            <search />
          </el-icon>
        </el-button>
        <!-- 文字链接     重置 -->
        &nbsp;&nbsp;&nbsp;
        <el-link :underline="false" style="color: #409eff">重&nbsp;置</el-link>
        <!-- 添加班级按钮 -->
        <el-button type="primary" style="margin-left: 63%" @click="addclasstk()"
          >添加班级</el-button
        >
      </div>

      <!-- 下拉框选择搜索 -->
      <div>
        <!-- 班主任 -->
        <el-select
          v-model="downOne"
          clearable
          placeholder="班主任"
          class="dowone"
          id="dowone"
          @click="dowone()"
        >
          <el-option
            v-for="item in selectionone"
            :key="item.downOne"
            :label="item.label"
            :value="item.downOne"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
        <!-- 上课老师 -->
        <el-select
          v-model="downTwo"
          clearable
          placeholder="上课老师"
          class="dowtwo"
          id="dowtwo"
          @click="dowtwo()"
        >
          <el-option
            v-for="item in selectiontwo"
            :key="item.downTwo"
            :label="item.label"
            :value="item.downTwo"
          >
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;
        <!-- 教室 -->
        <el-select
          v-model="downThree"
          clearable
          placeholder="教室"
          class="dowthree"
          id="dowthree"
          @click="dowthree()"
        >
          <el-option
            v-for="item in selectionthree"
            :key="item.downThree"
            :label="item.label"
            :value="item.downThree"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- 表格 -->
    <div style="background: #fff; width: 99%; margin: 0px auto; margin-top: 1%">
      <div style="padding-top: 2%; padding-bottom: 1%">
        <el-table
          class="classtable"
          :data="tableData"
          border
          style="width: 95%; margin: 0px auto"
        >
          <el-table-column
            fixed
            prop="classesName"
            label="班级名称"
            width="200%"
          >
          </el-table-column>
          <el-table-column prop="classRoomName" label="教室" width="195%">
          </el-table-column>
          <el-table-column prop="staffName" label="班主任" width="195%">
          </el-table-column>
          <el-table-column prop="classesNumber" label="班级人数" width="195%">
          </el-table-column>
          <el-table-column prop="classesDate" label="开班时间" width="215%">
          </el-table-column>
          <el-table-column label="操作" width="225%">
            <template #default>
              <div style="margin: 0 auto">
                &nbsp;
                <el-button
                  type="text"
                  @click="studentCenterDialogVisible = true"
                  >本班学员</el-button
                >&nbsp;
                <el-button type="text" @click="schedule = true"
                  >本班课表</el-button
                >&nbsp;&nbsp;
                <el-dropdown>
                  <span class="el-dropdown-link">
                    更多<i-icon class="el-icon--right"><arrowdown /></i-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="centerDialogEditVisible = true"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item @click="openEnd">结课</el-dropdown-item>
                      <el-dropdown-item @click="opendelect"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="margin-left: 2%">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加班级弹框 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="新增班级"
      width="70%"
      @close="resetForm('rulemationForm'), (this.active = 0)"
      center
    >
      <div class="high">
        <el-steps
          :active="active"
          finish-status="success"
          simple
          style="margin: 0 auto; border-radius: 25px; width: 50%"
        >
          <el-step title="1、编辑班级信息" icon="el-icon-edit"></el-step>
          <el-step title="2、分配学员" icon="el-icon-edit"></el-step>
        </el-steps>
        <!-- 1、添加班级信息 -->
        <div class="form1" v-if="active == 0">
          <el-form
            :model="rulemationForm"
            :rules="rulesmation"
            ref="rulemationForm"
            label-width="100px"
            class="demo-rulemationForm"
          >
            <!-- 班级名称 -->
            <el-form-item
              label="班级名称"
              prop="className"
              style="margin-left: 15%; margin-top: 2%"
            >
              <el-input
                v-model="rulemationForm.className"
                size="small"
                placeholder="请输入班级名称"
                style="width: 25%"
              ></el-input>
            </el-form-item>
            <!-- 班主任 -->
            <el-form-item
              label="班主任"
              prop="headmaster"
              style="margin-left: 52%; margin-top: -5%"
            >
              <el-select
                v-model="rulemationForm.headmaster"
                placeholder="请选择班主任"
                size="small"
                style="width: 50%"
              >
                <el-option
                  v-for="item in addselectteacher"
                  :key="item"
                  :label="item.staffName"
                  :value="item.staffId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 教室 -->
            <el-form-item label="教室" prop="classrom" style="margin-left: 15%">
              <el-select
                v-model="rulemationForm.classrom"
                placeholder="请选择教室"
                size="small"
                style="width: 25%"
              >
                <el-option
                  v-for="item in addselectclassrom"
                  :key="item"
                  :label="item.classroomName"
                  :value="item.classroomId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 开班人数 -->
            <el-form-item
              label="开班人数"
              prop="num"
              style="margin-left: 52%; margin-top: -5%"
            >
              <el-input-number
                v-model="rulemationForm.num"
                @change="handleChange"
                label="描述文字"
                size="small"
              ></el-input-number>
            </el-form-item>

            <!-- 开班时间 -->
            <el-form-item
              label="开班时间"
              class="block"
              prop="opentime"
              style="margin-left: 15%; margin-top: 0%"
            >
              <!-- <span class="demonstration">默认</span> -->
              <el-date-picker
                v-model="rulemationForm.opentime"
                type="date"
                placeholder="选择日期"
                size="small"
                style="width: 25%"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <!-- 2、分配学员 -->
        <div class="form2" v-if="active == 1">
          <!-- 头部 -->
          <div style="margin-top: 4%">
            <span
              style="
                color: #f60;
                font-weight: 600;
                font-size: 16px;
                margin-left: 13%;
              "
              >HTML（课程）的未分班学员</span
            >
            <span
              style="
                color: #f60;
                font-weight: 600;
                font-size: 16px;
                margin-left: 37%;
              "
              >y的学员</span
            >
          </div>
          <!-- 分配学员搜索 -->
          <el-row :span="24">
            <el-col :span="12">
              <div>
                <!-- 学员搜索 -->
                <el-input
                  style="width: 30%; margin-left: 2%; margin-top: 4%"
                  placeholder="请输入学生姓名"
                  v-model="rulemationForm.studantName"
                  clearable
                  size="small"
                >
                </el-input>

                <!-- 搜索按钮 -->
                <el-button
                  type="primary"
                  style="height: 8px; margin-right: 2%"
                  size="small"
                >
                  <el-icon>
                    <search />
                  </el-icon>
                </el-button>
                <!-- 重置按钮 -->
                <el-link :underline="false" style="color: #409eff"
                  >重&nbsp;置</el-link
                >
              </div>
            </el-col>
            <!-- 右边内容 -->
            <el-col :span="12">
              <div style="margin-top: 3%; margin-left: 15%">
                <div style="padding-bottom: 1%">
                  <span style="color: #606266; font-size: 14px"
                    >可容纳人数：</span
                  ><span style="color: #f60">6</span>
                </div>
                <span style="color: #606266; font-size: 14px"
                  >当前已分配人数：</span
                ><span style="color: #f60">0</span>
              </div>
            </el-col>
          </el-row>
          <!-- 选择学员部分 -->
          <div style="margin-top: 1%; margin-left: 1%" class="edit_dev">
            <el-transfer
              v-model="rulemationForm.value"
              :props="{
                key: 'value',
                label: 'desc',
              }"
              :data="data"
            >
            </el-transfer>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="active == 1" @click="nextup">上一步</el-button>
          <el-button
            v-if="active == 0"
            @click="resetForm('rulemationForm'), nextup"
            >取消</el-button
          >

          <el-button
            v-if="active == 0"
            style="margin-top: 12px"
            type="primary"
            @click="abc('rulemationForm')"
            >下一步</el-button
          >
          <el-button
            v-if="active == 1"
            style="margin-top: 12px"
            @click="resetForm('rulemationForm'), (this.active = 0)"
            type="primary"
            >完成</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 班级详情弹框 -->
    <el-dialog
      v-model="studentCenterDialogVisible"
      title="班级详情"
      width="60%"
      @close="resetClassStudent('classstudentbig')"
      center
    >
      <!-- 搜索文本框 -->
      <el-input
        style="width: 17%; margin-left: 1%; margin-top: 1%"
        placeholder="请输入学生姓名"
        v-model="classstudentbig.input"
        clearable
        size="small"
      >
      </el-input>
      <!-- 搜索按钮 -->
      <el-button type="primary" style="height: 8px" size="small">
        <el-icon>
          <search />
        </el-icon>
      </el-button>
      &nbsp;&nbsp;&nbsp;
      <!-- 重置 -->
      <el-link :underline="false" style="color: #409eff">重&nbsp;置</el-link>
      <!-- 学员分班按钮 -->
      <el-button
        type="primary"
        style="margin-left: 60%"
        size="small"
        @click="centerDialogStudentVisible = true"
        >学员分班</el-button
      >
      <!-- 本班学员弹框表格 -->
      <el-table
        class="classstutable"
        :data="
          stuclasstable.slice(
            (currentPageOne - 1) * sizeOne,
            currentPageOne * sizeOne
          )
        "
        border
        style="width: 100%; margin-top: 2%"
      >
        <el-table-column prop="stuclassName" label="姓名" width="170">
        </el-table-column>
        <el-table-column prop="stuclassSex" label="性别" width="170">
        </el-table-column>
        <el-table-column prop="stuclassAge" label="年龄"> </el-table-column>
        <el-table-column prop="stuclassPhone" label="学员联系电话">
        </el-table-column>
        <el-table-column prop="stuclassfatherPhone" label="家长联系电话">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChangeOne"
          @current-change="handleCurrentChangeOne"
          :current-page="currentPageOne"
          :page-sizes="sizesOne"
          :page-size="sizeOne"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        >
        </el-pagination>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetClassStudent('classstudentbig')"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="resetClassStudent('classstudentbig')"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 本班学员弹框中的学员分班弹框 -->
    <el-dialog
      v-model="centerDialogStudentVisible"
      title="学员分班"
      width="65%"
      @close="resetStudentForm('ruleStudentmationForm')"
      center
    >
      <!-- 头部 -->
      <div style="margin-top: 2%">
        <span
          style="
            color: #f60;
            font-weight: 600;
            font-size: 16px;
            margin-left: 11%;
          "
          >HTML（课程）的未分班学员</span
        >
        <span
          style="
            color: #f60;
            font-weight: 600;
            font-size: 16px;
            margin-left: 40%;
          "
          >y的学员</span
        >
      </div>
      <!-- 分配学员搜索 -->
      <el-row :span="24">
        <el-col :span="12">
          <div>
            <!-- 学员搜索 -->
            <el-input
              style="width: 30%; margin-left: 2%; margin-top: 4%"
              placeholder="请输入学生姓名"
              v-model="ruleStudentmationForm.studantName"
              clearable
              size="small"
            >
            </el-input>

            <!-- 搜索按钮 -->
            <el-button
              type="primary"
              style="height: 8px; margin-right: 2%"
              size="small"
            >
              <el-icon>
                <search />
              </el-icon>
            </el-button>
            <!-- 重置按钮 -->
            <el-link :underline="false" style="color: #409eff"
              >重&nbsp;置</el-link
            >
          </div>
        </el-col>
        <!-- 右边内容 -->
        <el-col :span="12">
          <div style="margin-top: 3%; margin-left: 17%">
            <div style="padding-bottom: 1%">
              <span style="color: #606266; font-size: 14px">可容纳人数：</span
              ><span style="color: #f60">6</span>
            </div>
            <span style="color: #606266; font-size: 14px">当前已分配人数：</span
            ><span style="color: #f60">0</span>
          </div>
        </el-col>
      </el-row>
      <!-- 选择学员部分 -->
      <div style="margin-top: 1%; margin-left: 1%" class="edit_dev">
        <el-transfer
          v-model="ruleStudentmationForm.value"
          :props="{
            key: 'value',
            label: 'desc',
          }"
          :data="data"
        >
        </el-transfer>
      </div>
    </el-dialog>
    <!-- 本班课表弹框 -->
    <el-dialog
      v-model="schedule"
      title="课表信息"
      width="60%"
      destroy-on-close
      center
    >
      <el-table
        class="scheduletable"
        :data="
          scheduletable.slice(
            (schedulecurrentPageOne - 1) * schedulesizeOne,
            schedulecurrentPageOne * classtablehandleSizeChange
          )
        "
        border
        style="width: 95%; margin: 0px auto"
      >
        <el-table-column prop="classTime" label="上课时间"> </el-table-column>
        <el-table-column prop="curriculum" label="课程"> </el-table-column>
        <el-table-column prop="classrom" label="教室"> </el-table-column>
        <el-table-column prop="classData" label="课程日期"> </el-table-column>
        <el-table-column prop="classTeacher" label="上课老师">
        </el-table-column>
        <el-table-column prop="classStae" label="状态"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block" style="margin-left: 2%; margin-top: 2%">
        <el-pagination
          @size-change="classtablehandleSizeChange"
          @current-change="classtablehandleCurrentChange"
          :current-page="schedulecurrentPageOne"
          :page-sizes="schedulesizesOne"
          :page-size="schedulesizeOne"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog
      v-model="centerDialogEditVisible"
      title="新增班级"
      width="70%"
      @close="resetEditForm('editpopForm'), (this.activeEdit = 0)"
      center
    >
      <div class="high">
        <el-steps
          :active="activeEdit"
          finish-status="success"
          simple
          style="margin: 0 auto; border-radius: 25px; width: 50%"
        >
          <el-step title="1、编辑班级信息" icon="el-icon-edit"></el-step>
          <el-step title="2、分配学员" icon="el-icon-edit"></el-step>
        </el-steps>
        <!-- 1、添加班级信息 -->
        <div class="form1" v-if="activeEdit == 0">
          <el-form
            :model="editpopForm"
            :rules="editmation"
            ref="editpopForm"
            label-width="100px"
            class="demo-editpopForm"
          >
            <!-- 班级名称 -->
            <el-form-item
              label="班级名称"
              prop="className"
              style="margin-left: 15%; margin-top: 2%"
            >
              <el-input
                v-model="editpopForm.className"
                size="small"
                placeholder="请输入班级名称"
                style="width: 25%"
              ></el-input>
            </el-form-item>
            <!-- 班主任 -->
            <el-form-item
              label="班主任"
              prop="headmaster"
              style="margin-left: 52%; margin-top: -5%"
            >
              <el-select
                v-model="editpopForm.headmaster"
                placeholder="请选择班主任"
                size="small"
                style="width: 50%"
              >
              </el-select>
            </el-form-item>
            <!-- 课程 -->
            <el-form-item
              label="课程"
              prop="curriculum"
              style="margin-left: 15%"
            >
              <el-select
                v-model="editpopForm.curriculum"
                placeholder="请选择班主任"
                size="small"
                style="width: 25%"
              >
                <el-option label="java" value="shanghai"></el-option>
                <el-option label="html" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- 开班人数 -->
            <el-form-item
              label="开班人数"
              prop="num"
              style="margin-left: 52%; margin-top: -5%"
            >
              <el-input-number
                v-model="editpopForm.num"
                @change="handleChangeEdit"
                label="描述文字"
                size="small"
              ></el-input-number>
            </el-form-item>
            <!-- 教室 -->
            <el-form-item label="教室" prop="classrom" style="margin-left: 15%">
              <el-select
                v-model="editpopForm.classrom"
                placeholder="请选择教室"
                size="small"
                style="width: 25%"
              >
                <el-option label="02201" value="shanghai"></el-option>
                <el-option label="02202" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- 开班时间 -->
            <el-form-item
              label="开班时间"
              class="block"
              prop="opentime"
              style="margin-left: 52%; margin-top: -5%"
            >
              <!-- <span class="demonstration">默认</span> -->
              <el-date-picker
                v-model="editpopForm.opentime"
                type="date"
                placeholder="选择日期"
                size="small"
                style="width: 50%"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <!-- 2、分配学员 -->
        <div class="form2" v-if="activeEdit == 1">
          <!-- 头部 -->
          <div style="margin-top: 4%">
            <span
              style="
                color: #f60;
                font-weight: 600;
                font-size: 16px;
                margin-left: 13%;
              "
              >HTML（课程）的未分班学员</span
            >
            <span
              style="
                color: #f60;
                font-weight: 600;
                font-size: 16px;
                margin-left: 37%;
              "
              >y的学员</span
            >
          </div>
          <!-- 分配学员搜索 -->
          <el-row :span="24">
            <el-col :span="12">
              <div>
                <!-- 学员搜索 -->
                <el-input
                  style="width: 30%; margin-left: 2%; margin-top: 4%"
                  placeholder="请输入学生姓名"
                  v-model="editpopForm.studantName"
                  clearable
                  size="small"
                >
                </el-input>

                <!-- 搜索按钮 -->
                <el-button
                  type="primary"
                  style="height: 8px; margin-right: 2%"
                  size="small"
                >
                  <el-icon>
                    <search />
                  </el-icon>
                </el-button>
                <!-- 重置按钮 -->
                <el-link :underline="false" style="color: #409eff"
                  >重&nbsp;置</el-link
                >
              </div>
            </el-col>
            <!-- 右边内容 -->
            <el-col :span="12">
              <div style="margin-top: 3%; margin-left: 15%">
                <div style="padding-bottom: 1%">
                  <span style="color: #606266; font-size: 14px"
                    >可容纳人数：</span
                  ><span style="color: #f60">6</span>
                </div>
                <span style="color: #606266; font-size: 14px"
                  >当前已分配人数：</span
                ><span style="color: #f60">0</span>
              </div>
            </el-col>
          </el-row>
          <!-- 选择学员部分 -->
          <div style="margin-top: 1%; margin-left: 1%" class="edit_dev">
            <el-transfer
              v-model="editpopForm.value"
              :props="{
                key: 'value',
                label: 'desc',
              }"
              :data="data"
            >
            </el-transfer>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="activeEdit == 1" @click="nextupEdit"
            >上一步</el-button
          >
          <el-button
            v-if="activeEdit == 0"
            @click="resetEditForm('editpopForm'), nextupEdit"
            >取消</el-button
          >

          <el-button
            v-if="activeEdit == 0"
            style="margin-top: 12px"
            type="primary"
            @click="submitOneEditForm('editpopForm')"
            >下一步</el-button
          >
          <el-button
            v-if="activeEdit == 1"
            style="margin-top: 12px"
            @click="resetEditForm('editpopForm'), (this.activeEdit = 0)"
            type="primary"
            >完成</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<script lang="ts">
import request from "../utils/request";
import { ElMessage } from "element-plus";

//更多的箭头图标
import { ArrowDown } from "@element-plus/icons";
// 弹框
import { defineComponent, ref } from "vue";
import qs from "qs";
export default {
  data() {
    // 穿梭框
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `Option ${i}`,
          // disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      oldClassName: "",
      syb: false,
      jg: true,
      classs: [],
      //   搜索文本框
      input: "",
      // 添加班级弹框:第二步的搜索框
      studantName: "",
      // 穿梭框
      data: generateData(),

      // 访客状态下拉框
      selectionone: [
        {
          downOne: "选项1",
          label: "张三",
        },
        {
          downOne: "选项2",
          label: "李四",
        },
        {
          downOne: "选项3",
          label: "王五",
        },
      ],
      // 下拉框默认值
      downOne: "班主任",
      // 上课老师下拉框
      selectiontwo: [
        {
          downTwo: "选项1",
          label: "张三",
        },
        {
          downTwo: "选项2",
          label: "李四",
        },
        {
          downTwo: "选项3",
          label: "王五",
        },
      ],
      // 下拉框默认值
      downTwo: "上课老师",
      // 教室下拉框
      selectionthree: [
        {
          downThree: "选项1",
          label: "TR02201",
        },
        {
          downThree: "选项2",
          label: "TR02202",
        },
        {
          downThree: "选项3",
          label: "TTR02203",
        },
      ],
      // 下拉框默认值
      downThree: "教室",
      // 分页

      pageSize: 2,
      pageNum: 1,
      total: 0,
      // 更多 图标
      components: {
        arrowdown: ArrowDown,
      },
      //  添加班级弹框
      centerDialogVisible: ref(false),
      // 班级学员弹框
      studentCenterDialogVisible: ref(false),
      // 添加班级弹框步骤条
      active: 0,
      // 添加班级弹框:添加班级表单信息
      rulemationForm: {
        className: "", //班级名称
        headmaster: "", //班主任
        num: 0, //开班人数
        classrom: "", //教室
        opentime: "", //开班时间
        studantName: "",
        value: [],
      },
      // 添加班级弹框: 添加班级表单信息验证
      rulesmation: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        headmaster: [
          { required: true, message: "请选择班主任", trigger: "change" },
        ],
        curriculum: [
          { required: true, message: "请选择课程", trigger: "change" },
        ],
        num: [
          { required: true, message: "开班人数不能为空", trigger: "blur" },
          { type: "number", message: "开班人数必须为数字型" },
        ],
        opentime: [
          { required: true, message: "开班时间不能为空", trigger: "blur" },
        ],
      },
      // 添加班级弹框:开班时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      // 班级详情弹框
      classstudentbig: {
        input: "", //学员姓名搜索框
      },
      // 班级详情弹框表格
      scheduletable: [
        {
          classTime: "张三",
          curriculum: "男",
          classrom: "19",
          classData: "12345678901",
          classTeacher: "12345587058",
          classStae: "已上",
        },
      ],
      // 本班学员弹框分页
      sizesOne: [1, 2, 3, 4],
      sizeOne: 1,
      currentPageOne: 1,
      // 本班学员弹框中的学员分班弹框
      centerDialogStudentVisible: ref(false),
      // 分班弹框的穿梭框
      ruleStudentmationForm: {
        studantName: "",
        value: [],
      },
      // 本班课表弹框
      schedule: ref(false),
      // 本班课表弹框：  表格
      stuclasstable: [
        {
          stuclassName: "张三",
          stuclassSex: "男",
          stuclassAge: "19",
          stuclassPhone: "12345678901",
          stuclassfatherPhone: "12345587058",
        },
        {
          stuclassName: "张三",
          stuclassSex: "男",
          stuclassAge: "19",
          stuclassPhone: "12345678901",
          stuclassfatherPhone: "12345587058",
        },
        {
          stuclassName: "张三",
          stuclassSex: "男",
          stuclassAge: "19",
          stuclassPhone: "12345678901",
          stuclassfatherPhone: "12345587058",
        },
        {
          stuclassName: "张三",
          stuclassSex: "男",
          stuclassAge: "19",
          stuclassPhone: "12345678901",
          stuclassfatherPhone: "12345587058",
        },
      ],
      // 本班学员弹框分页
      schedulesizesOne: [1, 2, 3, 4],
      schedulesizeOne: 1,
      schedulecurrentPageOne: 1,
      // 添加班级按钮   班主任下拉框
      addselectteacher: [],
      // 添加班级按钮   教室下拉框
      addselectclassrom: [],
      //  编辑弹框
      centerDialogEditVisible: ref(false),
      // 添加班级弹框步骤条
      activeEdit: 0,
      // 添加班级弹框:添加班级表单信息
      editpopForm: {
        className: "", //班级名称
        headmaster: "", //班主任
        num: 0, //开班人数
        classrom: "", //教室
        opentime: "", //开班时间
        studantName: "",
        value: [],
      },
      // 添加班级弹框: 添加班级表单信息验证
      editmation: {
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        headmaster: [
          { required: true, message: "请选择班主任", trigger: "change" },
        ],
        curriculum: [
          { required: true, message: "请选择课程", trigger: "change" },
        ],
        num: [
          { required: true, message: "开班人数不能为空", trigger: "blur" },
          { type: "number", message: "开班人数必须为数字型" },
        ],
        opentime: [
          { required: true, message: "开班时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 表格查询
    a() {
      request
        .get("/classes/a", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.tableData = res.data.records;
          this.pageNum = res.data.current;
          this.pageSize = res.data.size;
          this.total = res.data.total;
        });
    },
    // 查询添加班级按钮的班主任
    selectteacher() {
      request.get("/staff/selectteacher").then((res) => {
        console.log(res);
        this.addselectteacher = res;
      });
    },
    // 查询添加班级弹框的教室下拉框
    selectclassrom() {
      request.get("/classroom/selectclassrom").then((res) => {
        console.log("教室" + JSON.stringify(res));
        this.addselectclassrom = res;
      });
    },
    // 编辑弹框 清空弹框内容，关闭弹框
    resetEditForm(editpopForm) {
      this.editpopForm = {};
      this.editpopForm.num = 0;
      // this.$refs[rulemationForm].resetFields();
      this.centerDialogEditVisible = false;
    },
    // 添加班级弹框： 清空弹框内容，关闭弹框
    resetForm(rulemationForm) {
      if(this.jg){
        this.updatefrom(1)
        this.rulemationForm = {};
        this.rulemationForm.num = 0;
        this.centerDialogVisible = false;
      }else{
        
        this.rulemationForm = {};
        this.rulemationForm.num = 0;
        this.centerDialogVisible = false;
      }
      
    },
    //日期转换成年龄
    suan() {
      console.log("ssssss");
      const birthStr = this.form.date1;
      console.log(birthStr);
      let d = new Date();
      let age =
        d.getFullYear() -
        birthStr.getFullYear() -
        (d.getMonth() < birthStr.getMonth() ||
        (d.getMonth() == birthStr.getMonth() &&
          d.getDate() < birthStr.getDate())
          ? 1
          : 0);
      this.form.age = age;
      console.log("年龄", age);
    },
    // 访客状态下拉框样式：使点击的字体变蓝色
    dowone() {
      document.getElementById("dowone").style.color = "#409eff";
    },
    dowtwo() {
      document.getElementById("dowtwo").style.color = "#409eff";
    },
    dowthree() {
      document.getElementById("dowthree").style.color = "#409eff";
    },
    // 表格
    handleClick(row) {
      console.log(row);
    },

    // 分页
    handleSizeChange(pageSize) {
      this.pageSize = JSON.stringify(pageSize);
      this.a();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = JSON.stringify(pageNum);
      this.a();
    },
    // 删除弹框
    opendelect() {
      this.$confirm(
        "此操作将删除此班级，并将删除与之相关的历史排课数据，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 结课弹框
    openEnd() {
      this.$confirm("此操作将班级中的学生全部结课，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "结课成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结课",
          });
        });
    },
    // 添加班级弹框步骤条
    // 下一步
    next() {
      if (this.active++ > 1) this.active = 0;
      // 关闭弹框
      // this.centerDialogVisible = false
    },
    // 上一步
    nextup() {
      if (this.active-- < 1) this.active = 0;
      this.updatefrom(0);
      this.selectclassrom();
      
      this.syb=true;
    },
    //延迟调用修改方法
    outTimeUpdate(formName){
      this.selectclass();
        setTimeout(() => {
          this.updateclass(formName);
        }, 1000);
    },
    // 修改班级方法
    updateclass(formName){
      this.$refs[formName].validate((valid) => {
            if (valid) {
              request
                .post("/classes/updateclass", {
                  classesName: this.rulemationForm.className,
                  classesNumber: this.rulemationForm.num,
                  classesDate: this.rulemationForm.opentime,
                  classroomId: this.rulemationForm.classrom,
                  staffId: this.rulemationForm.headmaster,
                  oldClassName: this.oldClassName,
                })
                .then((res) => {
                  console.log(res);
                  // this.$refs[formName].resetFields();
                  // this.rulemationForm=false
                  ElMessage({
                    showClose: true,
                    message: "修改成功",
                    type: "success",
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });
              this.updatefrom(1);
              this.next();
            } else {
              console.log("error submit!!");
              return false;
            }
          });
    },
    // 点击上一步的方法
    abc(formName) {
      
      if (this.syb) {
        if (this.oldClassName == this.rulemationForm.className) {
          this.updateclass(formName);
        }else{
          this.selectclass();
          if(this.jg){
            this.updateclass(formName);
          }else{
            this.outTimeUpdate(formName);
          }
        }
      } else {
        this.selectclass();
        setTimeout(() => {
          this.submitOneForm(formName);
        }, 1000);
      }
    },
    // 添加班级弹框:表单确认方法(添加班级)
    submitOneForm(formName) {
      if (this.jg) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request
              .post("/classes/insertclass", {
                classesName: this.rulemationForm.className,
                classesNumber: this.rulemationForm.num,
                classesDate: this.rulemationForm.opentime,
                classroomId: this.rulemationForm.classrom,
                staffId: this.rulemationForm.headmaster,
              })
              .then((res) => {
                console.log(res);
                // this.$refs[formName].resetFields();
                // this.rulemationForm=false
                this.oldClassName = this.rulemationForm.className;
                ElMessage({
                  showClose: true,
                  message: "添加成功",
                  type: "success",
                });
              })
              .catch(function (error) {
                console.log(error);
              });
            this.updatefrom(1);
            this.next();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        ElMessage({
          showClose: true,
          message: "班级名称已使用，请更换",
          type: "error",
        });
      }
    },
    // 添加班级弹框:表单确认方法（添加班级的同时，修改教室状态为已用）
    updatefrom(zhi) {
      request.post("/classroom/updateclassrom", {
        classroomId: this.rulemationForm.classrom,
        calssroomState: zhi,
      });
    },
    // 添加班级弹框: 开班人数
    handleChange(value) {
      console.log(value);
    },
    // 本班学员弹框分页
    handleSizeChangeOne(val) {
      this.sizeOne = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeOne(val) {
      this.currentPageOne = val;
      console.log(`当前页: ${val}`);
    },
    // 本班学员弹框： 搜索框清空
    resetClassStudent(classstudentbig) {
      this.classstudentbig = {};
      // this.$refs[rulemationForm].resetFields();
      this.studentCenterDialogVisible = false;
    },
    // 班级学员弹框中的分配学员弹框： 清空弹框内容，关闭分配学员弹框
    resetStudentForm(ruleStudentmationForm) {
      this.ruleStudentmationForm = {};
      // this.$refs[rulemationForm].resetFields();
      this.centerDialogStudentVisible = false;
    },
    // 本班课表弹框： 分页
    classtablehandleSizeChange(val) {
      this.schedulesizeOne = val;
      console.log(`每页 ${val} 条`);
    },
    classtablehandleCurrentChange(val) {
      this.schedulecurrentPageOne = val;
      console.log(`当前页: ${val}`);
    },

    // 编辑弹框步骤条
    // 下一步
    nextEdit() {
      if (this.activeEdit++ > 1) this.activeEdit = 0;
      // 关闭弹框
      // this.centerDialogVisible = false
    },
    // 上一步
    nextupEdit() {
      if (this.activeEdit-- < 1) this.activeEdit = 0;
    },
    // 添加班级弹框:表单确认方法
    submitOneEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nextEdit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加班级弹框: 开班人数
    handleChangeEdit(value) {
      console.log(value);
    },
    //  添加班级弹框方法
    addclasstk() {
      this.centerDialogVisible = true;
      this.selectteacher();

      this.selectclassrom();
    },
    // 添加班级弹框 查询所有班级
    selectclass() {
      this.classs.length = 0;
      request
        .get("/classes/selectsyclass")
        .then((res) => {
          var className = this.rulemationForm.className;
          this.classs = res;

          for (var i = 0; i < this.classs.length; i++) {
            console.log(this.classs[i].classesName == className);

            if (this.classs[i].classesName == className) {
              this.jg = false;
              break;
            } else {
              this.jg = true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  //直接查询
  created() {
    // 表格查询
    this.a();
  },
};
</script>
<style>
.dowone {
  margin-top: 1%;
  width: 8%;
}
.dowone .el-input__inner {
  border: none;
}
.dowtwo {
  margin-top: 1%;
  width: 8%;
}
.dowtwo .el-input__inner {
  border: none;
}
.dowthree {
  margin-top: 1%;
  width: 8%;
}
.dowthree .el-input__inner {
  border: none;
}
.timeOne.el-range-editor.el-input__inner {
  margin-left: 8%;
}
/* 表格样式 */
/* 表格 */
.classtable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
.el-table th.el-table__cell {
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  color: black;
  font-size: 13px;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
  font-size: 13px;
}
/* 更多下拉菜单样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.i-arrow-down {
  font-size: 12px;
}
/* 添加班级弹框第二步的穿梭框样式 */
.edit_dev .el-transfer .el-transfer-panel {
  width: 40%;
}
/* 本班学员弹框表格 */
.classstutable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
/* 本班课表弹框表格 */
.scheduletable.el-table--border th.el-table__cell {
  background: #ebeff3;
}
</style>