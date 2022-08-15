<template>
  <div class="header">
    <div class="logo">招聘管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <el-button type="primary" @click="logout()">退出</el-button>
      </div>
    </div>
  </div>
</template>
<script>
 export default {
   name: 'app-header',
   data(){
         return {
          } 
        },
        methods:{
          logout(){
            this.$router.push('/');
          }
        }
  }
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: #242f42;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
  margin-left: 20px;
}
.logo {
  color: white;
  line-height: 35px;
}
.el-row {
  margin-bottom: 20px;
}

.user-avator{
  margin-right:10px
}
.user-avator img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
