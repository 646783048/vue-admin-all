<template>
  <div class="nav">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="home" @click="GoPath">
            <template slot="title">
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2" v-if="bar === '1'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="adminAuthority" @click="GoPath"
                >管理员</el-menu-item
              >
              <el-menu-item index="userAuthority" @click="GoPath"
                >用户</el-menu-item
              >
              <el-menu-item index="enterpriseAuthority" @click="GoPath"
                >企业</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="bar === '1'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>招聘信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="recruitmentResume" @click="GoPath"
                >招聘简历</el-menu-item
              >
              <el-menu-item index="recruitmentInformation" @click="GoPath"
                >招聘信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" v-if="bar === '2'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="personalInformation" @click="GoPath"
                >个人信息</el-menu-item
              >
              <el-menu-item index="resumeInformation" @click="GoPath"
                >简历信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5" v-if="bar === '2'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人招聘信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="recruitmentInfo" @click="GoPath"
                >招聘信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6" v-if="bar === '3'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>企业信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="enterpriseInformation" @click="GoPath"
                >企业信息</el-menu-item
              >
              <el-menu-item index="recruitment" @click="GoPath"
                >职位招聘信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7" v-if="bar === '3'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>招聘信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="resumeInfo" @click="GoPath"
                >简历信息</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="8" v-if="bar === '2' || bar === '3'">
            <template slot="title">
             <el-menu-item index="messages" @click="GoPath"
                >留言板</el-menu-item
              >
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: "",
      usernmae: "",
      // amidn:1,
      // user:2,
      // offer:3,
    };
  },
  created() {
    this.bar = this.$route.params.bar;
    this.username = this.$route.params.username;
    console.log(this.bar, this.username);
    // this.bar =this.$route.query.bar;
    // console.log(this.$route.query.bar)
  },
  name: "nav-bar",
  methods: {
    GoPath(data) {
      console.log(data);
      this.$router.push({
              name: data.index,
              params: {
                username:this.username,
                bar: this.bar,
              },
          });
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  position: absolute;
  width: 200px;
  min-height: 90vh;
}
</style>
