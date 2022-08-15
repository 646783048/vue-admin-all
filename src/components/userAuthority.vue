<template>
  <div class="userAuthority">
    <div class="header">
      <el-input
        class="header-ipt"
        v-model="search_username"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success" @click="search">查询</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData" height="540" border style="width: 100%">
        <el-table-column fixed prop="username" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="100"> </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="100">
        </el-table-column>
        <el-table-column prop="school" label="毕业学校" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="130">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="100">
        </el-table-column>
        <el-table-column prop="major" label="所学专业" width="100">
        </el-table-column>
        <el-table-column prop="education" label="最高学历" width="130">
        </el-table-column>
        <el-table-column label="操作" width="110">
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.$index, scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="delete_item(scope.$index)"
              type="text"
              size="small"
              v-if="bar == 1"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 对话框 -->
    <div>
      <el-dialog
        title="删除"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>你确定要删除该用户吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDelete">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="用户" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <!-- <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="form.sex" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth">
            <el-input v-model="form.birth" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="毕业学校" :label-width="formLabelWidth">
            <el-input v-model="form.school" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所学专业" :label-width="formLabelWidth">
            <el-input v-model="form.major" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最高学历" :label-width="formLabelWidth">
            <el-input v-model="form.education" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  // 用户权限
  name: "userAuthority",
  data() {
    return {
      uid:'',
      dialogVisible: false,
      dialogTableVisible: false,
      index: 0,
      bar: "",
      usertable: false,
      user_name: "",
      search_username: "",
      tableData: [],
      tableDataCopy: [
        {
          username: "",
          password: "",
          name: "",
          age: "",
          sex: "",
          birth: "",
          school: "",
          phone: "",
          email: "",
          major: "",
          education: "",
        },
      ],
      form: {
        username: "",
        password: "",
        name: "",
        age: "",
        sex: "",
        birth: "",
        school: "",
        phone: "",
        email: "",
        major: "",
        education: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancle() {
      this.dialogTableVisible = false;
    },
    confirm() {
      // this.tableDataCopy[this.index].username = this.form.username;
      this.tableDataCopy[this.index].password = this.form.password;
      this.tableDataCopy[this.index].name = this.form.name;
      this.tableDataCopy[this.index].age = this.form.age;
      this.tableDataCopy[this.index].sex = this.form.sex;
      this.tableDataCopy[this.index].birth = this.form.birth;
      this.tableDataCopy[this.index].school = this.form.school;
      this.tableDataCopy[this.index].phone = this.form.phone;
      this.tableDataCopy[this.index].email = this.form.email;
      this.tableDataCopy[this.index].major = this.form.major;
      this.tableDataCopy[this.index].education = this.form.education;
      if(this.bar==1){
      this.axios({
        url: "v1/user/info",
        method: "put",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: `password=${this.form.password}&uid=${++this.index}&name=${
          this.form.name
        }&age=${this.form.age}&sex=${this.form.sex}&birth=${
          this.form.birth
        }&school=${this.form.school}&phone=${this.form.phone}&email=${
          this.form.email
        }&major=${this.form.major}`,
      }).then((res) => {
        console.log(res);
        // this.$router.go(-2)
      });
      this.dialogTableVisible = false;
      this.tableData = this.tableDataCopy;
    }else if(this.bar==2){
         this.axios({
        url: "v1/user/info",
        method: "put",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: `password=${this.form.password}&uid=${this.uid}&name=${
          this.form.name
        }&age=${this.form.age}&sex=${this.form.sex}&birth=${
          this.form.birth
        }&school=${this.form.school}&phone=${this.form.phone}&email=${
          this.form.email
        }&major=${this.form.major}`,
      }).then((res) => {
        console.log(res);
        // this.$router.go(-2)
      });
      this.dialogTableVisible = false;
      this.tableData = this.tableDataCopy;
    }
    },
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log(this.search_username);
      if (this.search_username == "") {
        this.tableData = this.tableDataCopy;
      } else {
        let arr = [];
        this.tableDataCopy.forEach((item) => {
          if (this.search_username == item.name) {
            arr.push(item);
          }
        });
        this.tableData = arr;
      }
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    edit(index, i) {
      console.log(index, i);
      this.form.username = i.username;
      this.form.password = i.password;
      this.form.name = i.name;
      this.form.age = i.age;
      this.form.sex = i.sex;
      this.form.birth = i.birth;
      this.form.school = i.school;
      this.form.birth = i.birth;
      this.form.phone = i.phone;
      this.form.email = i.email;
      this.form.major = i.major;
      this.form.education = i.education;
      this.index = index;
      this.dialogTableVisible = true;
    },
    delete_item(index) {
      this.index = index;
      this.dialogVisible = true;
    },
    handleDelete() {
      this.axios({
        url: `v1/user/${++this.index}`,
        method: "delete",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        alert("删除成功");
      this.tableDataCopy.splice(this.index, 1);
      this.tableData.splice(this.index, 1);
      this.dialogVisible = false;
      this.tableData = this.tableDataCopy;
      });
    },
  },
  mounted() {
    this.tableData = this.tableDataCopy;
  },
  created() {
    this.bar = this.$route.params.bar;
    if (this.bar == 1) {
      this.axios({
        url: `v1/user/infos`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        this.tableDataCopy = res.data.data;
        this.tableData = res.data.data;
      });
    }
    if (this.bar == 2) {
      this.user_name = this.$route.params.username;
      console.log(this.$route.params.bar);
      console.log(this.$route.params.username);
      let params = this.user_name;
      this.axios({
        url: `v1/user/info/${params}`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res); 
        this.uid=res.data.data[0].uid;
        console.log(res.data.data[0].uid);
        this.tableDataCopy = res.data.data;
        this.tableData = res.data.data;
      });
    }
  },
};
</script>

<style scoped>
.userAuthority {
  width: 100%;
}
.header {
  display: flex;
  margin-bottom: 16px;
}
.header-ipt {
  width: 200px;
  margin-right: 16px;
}
</style>
