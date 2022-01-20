<template>
  <div style="background-color: #f5f7fa">
    <div style="height: 20%; background-color: white">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="在读学员" name="first">
          <div>
            <div>
              <div style="background-color: white; height: 50%; margin-top: 1%">
                &nbsp;&nbsp;&nbsp;请选择：
                <!-- 搜索下拉框 -->
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  style="width: 100px; margin-top: 14px"
                  size="small"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <!-- 搜索文本框 -->
                <el-input
                  style="width: 120px"
                  placeholder="请输入内容"
                  v-model="input"
                  size="small"
                  clearable
                >
                </el-input>
                <!-- 搜索按钮 -->
                <el-button
                  type="primary"
                  icon="i-search"
                  style="height: 8px"
                  size="small"
                ></el-button>
                <!-- 文字链接     重置 -->
                &nbsp;&nbsp;&nbsp;
                <el-link :underline="false" style="color: #409eff"
                  >重&nbsp;置</el-link
                >
                <!-- 新生报名按钮 -->
                <el-button
                  type="primary"
                  style="margin-left: 55%"
                  @click="centerDialogVisible = true"
                  >新生报名</el-button
                >
              </div>
              <div style="background-color: white">
                <!-- 所在班级  下拉框搜索 -->
                <el-select
                  v-model="downOne"
                  clearable
                  placeholder="所在班级"
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
                <!-- 单选框查询未分班的学员 -->
                <el-checkbox v-model="checked">未分班</el-checkbox>
                <!-- 单选框查询在课学员 -->
                <el-checkbox v-model="checkedtwo">在课学员</el-checkbox>
              </div>
            </div>
            <div style="background-color: white; margin-top: 1%">
              <!-- 表格 -->
              <div style="padding-top: 2%; margin-left: 2%">
                <el-table
                  :data="
                    tableData.slice(
                      (currentPage - 1) * size,
                      currentPage * size
                    )
                  "
                  border
                  style="width: 98%"
                >
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="120">
                  </el-table-column>
                  <el-table-column prop="sexss" label="性别" width="120">
                  </el-table-column>
                  <el-table-column prop="phones" label="联系电话" width="200">
                  </el-table-column>
                  <el-table-column
                    prop="phonefather"
                    label="家长电话"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column prop="address" label="学生住址" width="220">
                  </el-table-column>
                  <el-table-column prop="classs" label="班级" width="150">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="140">
                    <template #default>
                      &nbsp;<el-button
                        @click="handleClick(scope.row)"
                        type="text"
                        size="small"
                        >详情</el-button
                      >
                      <el-button type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="block">
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
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史学员" name="second">
          <div>


            <div>
              <div style="background-color: white; height: 50%; margin-top: 1%">
                &nbsp;&nbsp;&nbsp;请选择：
                <!--历史学员：  搜索下拉框 -->
                <el-select
                  v-model="valueone"
                  placeholder="请选择"
                  style="width: 100px; margin-top: 14px"
                  size="small"
                >
                  <el-option
                    v-for="item in optionsone"
                    :key="item.valueone"
                    :label="item.labeone"
                    :value="item.valueone"
                  >
                  </el-option>
                </el-select>

                <!--历史学员：  搜索文本框 -->
                <el-input
                  style="width: 120px"
                  placeholder="请输入内容"
                  v-model="inputone"
                  size="small"
                  clearable
                >
                </el-input>
                <!--历史学员:  搜索按钮 -->
                <el-button
                  type="primary"
                  icon="i-search"
                  style="height: 8px"
                  size="small"
                ></el-button>
                <!--历史学员： 文字链接     重置 -->
                &nbsp;&nbsp;&nbsp;
                <el-link :underline="false" style="color: #409eff"
                  >重&nbsp;置</el-link
                >
                <!--历史学员：  新生报名按钮 -->
                <router-link to="/freshman">
                <el-button
                  type="primary"
                  style="margin-left: 55%"
                  @click="centerDialogVisible = true">新生报名</el-button>
                </router-link>
              </div>
              <div style="background-color: white">
                <!--历史学员：  所在班级  下拉框搜索 -->
                <el-select
                  v-model="downTwo"
                  clearable
                  placeholder="毕业班级"
                  class="dowtwo"
                  id="dowtwo"
                  @click="dowtwo()"
                >
                  <el-option
                    v-for="item in selectiontwo"
                    :key="item.downTwo"
                    :label="item.labetwo"
                    :value="item.downTwo"
                  >
                  </el-option>
                </el-select>
              </div>


            </div>
            <!-- 历史学员：   表格 -->
            <div style="background-color:white;margin-top:1%;">
              <div style="padding-top:2%;margin-left:2%;">
  <el-table
    :data="tableDataOne.slice((currentPageOne-1)*sizeOne,currentPageOne*sizeOne)"
    border
    style="width: 98%">
    <el-table-column
      prop="nameone"
      label="姓名"
      width="125">
    </el-table-column>
    <el-table-column
      prop="ageone"
      label="年龄"
      width="125">
    </el-table-column>
    <el-table-column
      prop="sexssone"
      label="性别"
      width="125">
    </el-table-column>
    <el-table-column
      prop="phonesone"
      label="联系电话"
      width="205">
    </el-table-column>
    <el-table-column
      prop="addressone"
      label="学生住址"
      width="225">
    </el-table-column>
    <el-table-column
      prop="classsone"
      label="班级"
      width="155">
    </el-table-column>
    <el-table-column
      prop="timeone"
      label="毕业时间"
      width="160">
    </el-table-column>
    <el-table-column
      label="操作"
      width="130">
      <template #default>
        <el-button type="text"  size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="block">
    <el-pagination
      @size-change="handleSizeChangeOne"
      @current-change="handleCurrentChangeOne"
      :current-page="currentPageOne"
      :page-sizes="sizesOne"
      :page-size="sizeOne"
      layout="total, sizes, prev, pager, next, jumper"
      :total="4">
    </el-pagination>
  </div>
</div>
            </div>


          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 头部标签页
      activeName: "first",
      //在读学员：     单选框查询未分班的学员
      checked: false,
      //在读学员：     单选框查询在课学员
      checkedtwo: false,
      //在读学员：     搜索文本框
      input: "",
      //在读学员：     搜索下拉框
      options: [
        {
          value: "选项1",
          label: "电话",
        },
        {
          value: "选项2",
          label: "班级",
        },
      ],
      //在读学员：    下拉框默认值
      value: "学生姓名",
      // 在读学员：   访客状态下拉框
      selectionone: [
        {
          downOne: "选项1",
          label: "TR02201",
        },
        {
          downOne: "选项2",
          label: "TR02202",
        },
        {
          downOne: "选项3",
          label: "TR02203",
        },
      ],
      //在读学员：    下拉框默认值
      downOne: "所在班级",
      //在读学员：     表格
      tableData: [
        {
          name: "沈杨卓",
          age: "25",
          sexss: "男",
          phones: "123456789000",
          phonefather: "111111243567",
          address: "湖南株洲中科韬睿",
          classs: "TR02201",
        },
        {
          name: "王五",
          age: "25",
          sexss: "男",
          phones: "123456789000",
          phonefather: "111111243567",
          address: "湖南株洲中科韬睿",
          classs: "TR02201",
        },
        {
          name: "李四",
          age: "25",
          sexss: "男",
          phones: "123456789000",
          phonefather: "111111243567",
          address: "湖南株洲中科韬睿",
          classs: "TR02201",
        },
        {
          name: "张三",
          age: "25",
          sexss: "男",
          phones: "123456789000",
          phonefather: "111111243567",
          address: "湖南株洲中科韬睿",
          classs: "TR02201",
        },
      ],
      //在读学员：      分页
      sizes: [1, 2, 3, 4],
      size: 1,
      currentPage: 1,
    



     //历史学员：     搜索下拉框
      optionsone: [
        {
          valueone: "选项1",
          labeone: "电话",
        },
        {
          valueone: "选项2",
          labeone: "班级",
        },
      ],
      //历史学员：    下拉框默认值
      valueone: "学生姓名",
      //历史学员：     搜索文本框
      inputone: "",
      // 历史学员：   访客状态下拉框
      selectiontwo: [
        {
          downTwo: "选项1",
          labetwo: "TR02201",
        },
        {
          downTwo: "选项2",
          labetwo: "TR02202",
        },
        {
          downTwo: "选项3",
          labetwo: "TR02203",
        },
      ],
      //历史学员：    下拉框默认值
      downTwo: "毕业班级",
      // 历史学员：  分页
           sizesOne:[1,2,3,4],
          sizeOne:1,
        currentPageOne: 1,
        //历史学员：    表格
        tableDataOne: [{
          nameone: '沈杨卓',
          ageone: '25',
          sexssone: '男',
          phonesone: '123456789000',
          addressone: '湖南株洲中科韬睿',
          classsone: 'TR02201',
          timeone: '2021-12-13'
        }, {
           nameone: '沈杨卓',
          ageone: '25',
          sexssone: '男',
          phonesone: '123456789000',
          addressone: '湖南株洲中科韬睿',
          classsone: 'TR02201',
          timeone: '2021-12-13'
        }, {
           nameone: '沈杨卓',
          ageone: '25',
          sexssone: '男',
          phonesone: '123456789000',
          addressone: '湖南株洲中科韬睿',
          classsone: 'TR02201',
          timeone: '2021-12-13'
        }, {
          nameone: '沈杨卓',
          ageone: '25',
          sexssone: '男',
          phonesone: '123456789000',
          addressone: '湖南株洲中科韬睿',
          classsone: 'TR02201',
          timeone: '2021-12-13'
        }],
      };
  },
  methods: {
    // a(){
    //   this.$router.push("/signup")
    // },
    // 头部标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //在读学员：    访客状态下拉框样式：使点击的字体变蓝色
    dowone() {
      document.getElementById("dowone").style.color = "#409eff";
    },
    //在读学员：     表格
    handleClick(row) {
      console.log(row);
    },
    //在读学员：    分页
    handleSizeChange(val) {
      this.size = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
     //历史学员：    访客状态下拉框样式：使点击的字体变蓝色
    dowtwo() {
      document.getElementById("dowtwo").style.color = "#409eff";
    },
    // 历史学员：   表格
    handleClickOne(row) {
        console.log(row);
      },
    // 历史学员：  分页
     handleSizeChangeOne(val) {
        this.sizeOne=val
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChangeOne(val) {
        this.currentPageOne=val
        console.log(`当前页: ${val}`);
      },
  },
};
</script>