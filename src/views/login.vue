<template>
  <div>
    <div class="log_bg">
      <div class="login_box">
        <div class="status">
          <el-radio v-model="radio" label="1">管理员</el-radio>
          <el-radio v-model="radio" label="2">用户</el-radio>
          <el-radio v-model="radio" label="3">企业</el-radio>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          status-icon
          class="login_form"
        >
          <!-- 用户名-->
          <el-form-item label="账号" label-width="60px" prop="username">
            <el-input
              placeholder="请输入账号"
              v-model="loginForm.username"
              @keyup.enter.native="login('loginFormRef')"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item label="密码" label-width="60px" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
              @keyup.enter.native="login('loginFormRef')"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <!--按钮-->
          <el-form-item class="btns">
            <!-- 回车键盘监听 -->
            <!-- @keyup.enter="login('loginFormRef')" -->
            <el-button type="primary" @click="login(loginForm)">登录</el-button>
            <el-button @click="openDialog" type="success">注册</el-button>
          </el-form-item>
        </el-form>

        <!--管理员注册表单-->
        <el-dialog
          title="注册"
          :close-on-click-modal="false"
          :visible.sync="adminDialog"
          @close="closeDialog('registerFormRef')"
          :append-to-body="true"
        >
          <el-form :model="adminRegisterInfo" ref="registerFormRef" status-icon>
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="adminRegisterInfo.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                show-password
                v-model="adminRegisterInfo.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input
                type="password"
                v-model="adminRegisterInfo.rePassword"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="register-button" slot="footer">
            <el-button @click="reset('registerFormRef')">取 消</el-button>
            <el-button type="primary" @click="register('registerFormRef')"
              >立即注册</el-button
            >
          </div>
        </el-dialog>
        <!--用户注册表单-->
        <el-dialog
          title="注册"
          :close-on-click-modal="false"
          :visible.sync="userDialog"
          @close="closeDialog('registerFormRef')"
          :append-to-body="true"
        >
          <el-form
            status-icon
            ref="registerFormRef"
            :model="userRegisterInfo"
            size="mini"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="userRegisterInfo.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                show-password
                type="password"
                v-model="userRegisterInfo.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input
                type="password"
                v-model="userRegisterInfo.rePassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input type="text" v-model="userRegisterInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input type="number" v-model="userRegisterInfo.age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-input
                type="text"
                v-model="userRegisterInfo.gender"
              ></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-input
                type="date"
                v-model="userRegisterInfo.birthday"
              ></el-input>
            </el-form-item>
            <el-form-item label="毕业学校" prop="school">
              <el-input
                type="text"
                v-model="userRegisterInfo.school"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input type="tel" v-model="userRegisterInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input
                type="email"
                v-model="userRegisterInfo.email"
              ></el-input>
            </el-form-item>
            <el-form-item label="所学专业" prop="specialty">
              <el-input
                type="text"
                v-model="userRegisterInfo.specialty"
              ></el-input>
            </el-form-item>
            <el-form-item label="最高学历" prop="education">
              <el-input
                type="text"
                v-model="userRegisterInfo.education"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="register-button" slot="footer">
            <el-button @click="reset('registerFormRef')">取 消</el-button>
            <el-button type="primary" @click="register('registerFormRef')"
              >立即注册</el-button
            >
          </div>
        </el-dialog>
        <!--企业注册表单-->
        <el-dialog
          title="注册"
          :close-on-click-modal="false"
          :visible.sync="entrDialog"
          @close="closeDialog('registerFormRef')"
          :append-to-body="true"
        >
          <el-form
            :model="entrRegisterInfo"
            ref="registerFormRef"
            status-icon
            size="mini"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="entrRegisterInfo.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                show-password
                v-model="entrRegisterInfo.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword">
              <el-input
                type="password"
                v-model="entrRegisterInfo.rePassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业名称" prop="name">
              <el-input type="text" v-model="entrRegisterInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input
                type="email"
                v-model="entrRegisterInfo.email"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input type="tel" v-model="entrRegisterInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="从事行业" prop="manage">
              <el-input
                type="text"
                v-model="entrRegisterInfo.manage"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业地址" prop="address">
              <el-input
                type="text"
                v-model="entrRegisterInfo.address"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="register-button" slot="footer">
            <el-button @click="reset('registerFormRef')">取 消</el-button>
            <el-button type="primary" @click="register('registerFormRef')"
              >立即注册</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../utils/req.js";
export default {
  data() {
    return {
      radio: "1",
      loginForm: {
        username: "",
        password: "",
        pwdType: "",
      },
      //管理员注册对话框
      adminDialog: false,
      //用户注册对话框
      userDialog: false,
      //企业注册对话框
      entrDialog: false,
      //管理员注册信息对象
      adminRegisterInfo: {},
      //用户注册信息对象
      userRegisterInfo: {},
      //企业注册信息对象
      entrRegisterInfo: {},
      loginUrl: "",
      userToken: "",
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },

    //点击注册
    openDialog() {
      let open = this.radio;
      console.log(open);
      if (open === "1") {
        console.log("我进来了1");
        this.adminDialog = true;
      } else if (open === "2") {
        console.log("我进来了2");
        this.userDialog = true;
      } else if (open === "3") {
        console.log("我进来了3");
        this.entrDialog = true;
      } else {
        this.$message.error("出现未知错误");
      }
    },
    //登录方法
    login(loginForm) {
      let _this = this;
      console.log(_this.radio);
      if (_this.radio === "1") {
        console.log(loginForm.username);
        console.log(loginForm.password);
        console.log("登录成功");
        this.axios({
          url: "v1/admin/login",
          method: "post",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `username=${loginForm.username}&password=${loginForm.password}`,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$router.push({
              path: "/info",
              name: "info",
              params: {
                username:loginForm.username,
                bar: _this.radio,
              },
            });
          } else {
            alert("用户名或密码不正确");
          }
        });
        // var url = "/api/login/admin";
      } else if (_this.radio === "2") {
        console.log(loginForm.username);
        console.log(loginForm.password);
        this.axios({
          url: "v1/user/login",
          method: "post",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `username=${loginForm.username}&password=${loginForm.password}`,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$router.push({
              path: "/info",
              name: "info",
              params: {
                username:loginForm.username,
                bar: _this.radio,
              },
            });
          } else {
            alert("用户名或密码不正确");
          }
        });
        // url = "/api/login/user";
      } else if (_this.radio === "3") {
        console.log(loginForm.username);
        console.log(loginForm.password);
        console.log("登录成功");
        this.axios({
          url: "v1/enterprise/login",
          method: "post",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `username=${loginForm.username}&password=${loginForm.password}`,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$router.push({
              path: "/info",
              name: "info",
              params: {
                username:loginForm.username,
                bar: _this.radio,
              },
            });
          } else {
            alert("用户名或密码不正确");
          }
        });
        // url = "/api/login/entr";
      }
    },
    //注册
    register(formName) {
      if (this.radio == 1) {
        console.log(this.adminRegisterInfo);
        let params = this.adminRegisterInfo.username;
        params = JSON.stringify(params).replace(/\"/g, "");
        console.log(params);
        this.axios({
          url: `v1/admin/info/${params}`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          // data: `username=${this.adminRegisterInfo.username}`,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 501) {
            this.axios({
              url: "v1/admin/reg",
              method: "post",
              responseType: "json",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: `username=${this.adminRegisterInfo.username}&password=${this.adminRegisterInfo.password}`,
            })
              .then((res) => {
                //请求成功后的响应函数
                console.log(JSON.stringify(res.data.msg) + "111");
                alert("注册成功");
                this.adminDialog = false;
              })
              .catch((error) => {
                请求失败后的响应函数;
                console.log(error);
              });
          } else if (
            res.data.data[0].username == this.adminRegisterInfo.username
          ) {
            alert("用户名已经被注册");
          }
        });
      } else if (this.radio === "2") {
        console.log(this.userRegisterInfo);
        let params = this.userRegisterInfo.username;
        params = JSON.stringify(params).replace(/\"/g, "");
        console.log(params);
        this.axios({
          url: `v1/user/info/${params}`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          // data: `username=${this.adminRegisterInfo.username}`,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 501) {
            this.axios({
              url: "v1/user/reg",
              method: "post",
              responseType: "json",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: `username=${this.userRegisterInfo.username}&password=${this.userRegisterInfo.password}&name=${this.userRegisterInfo.name}&age=${this.userRegisterInfo.age}&sex=${this.userRegisterInfo.gender}&birth=${this.userRegisterInfo.birthday}&school=${this.userRegisterInfo.school}&phone=${this.userRegisterInfo.phone}&email=${this.userRegisterInfo.email}&major=${this.userRegisterInfo.specialty}&education=${this.userRegisterInfo.education}`,
            })
              .then((res) => {
                //请求成功后的响应函数
                console.log(JSON.stringify(res.data.msg) + "111");
                alert("注册成功");
                this.userDialog = false;
              })
              .catch((error) => {
                请求失败后的响应函数;
                console.log(error);
              });
          } else if (
            res.data.data[0].username == this.userRegisterInfo.username
          ) {
            alert("用户名已经被注册");
          }
        });
      } else if (this.radio === "3") {
        console.log(this.entrRegisterInfo);
        let params = this.entrRegisterInfo.username;
        params = JSON.stringify(params).replace(/\"/g, "");
        console.log(params);
        this.axios({
          url: `v1/enterprise/info/${params}`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          // data: `username=${this.adminRegisterInfo.username}`,
        }).then((res) => {
          console.log(res);
          if (res.data.code == 501) {
            this.axios({
              url: "v1/enterprise/reg",
              method: "post",
              responseType: "json",
              headers: { "content-type": "application/x-www-form-urlencoded" },
              data: `username=${this.entrRegisterInfo.username}&password=${this.entrRegisterInfo.password}&name=${this.entrRegisterInfo.name}&email=${this.entrRegisterInfo.email}&phone=${this.entrRegisterInfo.phone}&business=${this.entrRegisterInfo.manage}&address=${this.entrRegisterInfo.address}`,
            })
              .then((res) => {
                //请求成功后的响应函数
                console.log(JSON.stringify(res.data.msg) + "111");
                alert("注册成功");
                this.entrDialog = false;
              })
              .catch((error) => {
                请求失败后的响应函数;
                console.log(error);
              });
          } else if (
            res.data.data[0].username == this.entrRegisterInfo.username
          ) {
            alert("用户名已经被注册");
          }
        });
      }
    },
    //取消表单
    reset(formNameRef) {
      //管理员注册对话框
      (this.adminDialog = false),
        //用户注册对话框
        (this.userDialog = false),
        //企业注册对话框
        (this.entrDialog = false);
    },

    //右上角X 关闭注册对话框 重置表单
    closeDialog(formNameRef) {
      this.$refs[formNameRef].resetFields();
    },
  },
  //生命周期 - 创建完成
  created() {},

  //DOM挂载完毕
  mounted() {
    // 打开注册对话框
  },
};
</script>
<style lang='' scoped>
.log_bg {
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("../assets/img/login-bg.jpg");
  background-size: cover;
}

.login_box {
  height: 300px;
  width: 450px;
  background: rgba(126, 180, 180, 0.5);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}

.status {
  position: relative;
  top: 50px;
  bottom: 10px;
  left: 100px;
}

.register-button {
  text-align: center;
}
</style>