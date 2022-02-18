<template>
  <!-- <div style="width: 100%; height: 100vh; overflow: hidden;">  :style="bg" 加背景图片 -->
  <div :style="bg">
    <div style="width: 400px; margin: 100px auto;">
      
      <el-form ref="form" :model="form" size="normal" :rules="rules" style="padding: 0 50px;margin:auto" class="loginContainer">
        <div style="font-size: 30px; text-align: center; padding: 30px 0">欢迎登录</div>
        <el-form-item prop="staffName">
          <el-input prefix-icon="User" v-model="form.staffName" placeholder="请输入账号" ></el-input>
        </el-form-item>
        <el-form-item prop="staffPass">
          <el-input prefix-icon="Lock" v-model="form.staffPass" show-password placeholder="请输入密码"></el-input>
        </el-form-item>

        

        <el-form-item prop="validCode">
          <div style="display: flex">
            <!-- @keyup.enter.native="login" -->
            <el-input prefix-icon="key" v-model="form.validCode" style="width: 50%;" placeholder="请输入验证码" ></el-input>
            <ValidCode @input="createValidCode" />
          </div>
        </el-form-item>
<!--        <el-form-item>
          <el-radio v-model="form.role" :label="1">管理员</el-radio>
          <el-radio v-model="form.role" :label="2">普通用户</el-radio>
        </el-form-item>-->
        <el-form-item>
           
          <el-button style="width: 100%" type="primary" @click="login" @keydown.enter.native="login()">登 录</el-button>
        </el-form-item>
        <el-form-item><el-button type="text" @click="$router.push('/register')">前往注册 >> </el-button></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import ValidCode from "../../components/ValidCode.vue";

export default {
  name: "Login",
  
  components: {
    ValidCode
  },
  data() {
    return {
      form: {
        role: 1
        },
      rules: {
        staffName:[
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        staffPass:[
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        validCode:[
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      validCode: '',
      // 加背景图片
      bg: {
        backgroundImage: "url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F038307a5971c70da8012193a30f32be.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641797172&t=f91f3d4e2dee338464d91cc7ad06fa37)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height:"100vh",
        overflow: "hidden"
      }
    }
  },
  created() {
    sessionStorage.removeItem("user")
     document.addEventListener('keydown', (e) => {
                let key = window.event.keyCode;
                if (key == 13) {
                // 13是enter键的键盘码 如果等于13 就调用click的登录方法
                    this.login();
                }
            })
  },
 
  methods: {
     beforeDestroy(){
      alert('msg');
//这里的 this.login('loginForm') 指的是键盘事件的方法名
            document.removeEventListener('keydown', this.login());
        },
    // 接收验证码组件提交的 4位验证码
    createValidCode(data) {
      this.validCode = data
    },
    login() {
     
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.form.validCode) {
            this.$message.error("请填写验证码")
            return
          }
          if(this.form.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
            this.$message.error("验证码错误")
            return
          }
          request.post("/login/login", this.form).then(res => {
            console.log(res);
            if (res.code === '200') { 
              this.$message({
                type: "success",
                message: res.msg
              })
              sessionStorage.setItem("user",JSON.stringify(res.data))
              this.$router.push("/")  //登录成功之后进行页面的跳转，跳转到主页
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          }).catch(error=>{
            this.$message.error(res.msg)
          })
        }
      })
    },
    
  }
}
</script>

<style scoped>
.el-input el-input--normal el-input--prefix{
  width: 75%;
}

.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  /*属性规定背景的绘制区域 背景被裁剪到内边距框。 margin: 180 px auto;*/
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>