<template>
  <div class="adminAuthority">
    <div class="header">
      <el-input
        class="header-ipt"
        v-model="search_userName"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success" @click="search">查询</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData" height="540" border style="width: 100%">
        <el-table-column fixed prop="username" label="用户名" width="510">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="540">
        </el-table-column>
        <el-table-column label="操作" width="220">
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
      <el-dialog title="管理员" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
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
  name: "adminAuthority",
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      index: 0,
      uid: "",
      search_userName: "",
      userName: "",
      tableData: [],
      tableDataCopy: [
        {
          username: "",
          password: "",
        },
        {
          username: "",
          password: "",
        },
      ],
      form: {
        username: "",
        password: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancle() {
      this.dialogTableVisible = false;
    },
    confirm() {
      this.tableDataCopy[this.index].username = this.form.username;
      this.tableDataCopy[this.index].password = this.form.password;
      this.axios({
        url: "v1/admin/info",
        method: "put",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: `username=${this.form.username}&password=${
          this.form.password
        }&uid=${++this.index}`,
      }).then((res) => {
        console.log(res);
        alert("请重新登录")
        this.$router.push({path:'/'})
        // this.$router.go(-2)
      });
      this.dialogTableVisible = false;
      this.tableData = this.tableDataCopy;
    },
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log(this.tableDataCopy);
      if (this.search_userName == "") {
        this.tableData = this.tableDataCopy;
      } else {
        let arr = [];
        this.tableDataCopy.forEach((item) => {
          console.log(item);
          if (item.username.indexOf(this.search_userName) >= 0) {
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
      this.index = index;
      this.dialogTableVisible = true;
    },
    delete_item(index) {
      this.index = index;
      this.dialogVisible = true;
    },
    handleDelete() {
      this.axios({
        url: `v1/admin/${++this.index}`,
        method: "delete",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res)
         alert("删除成功")
        this.$router.push({path:'/'})
        this.tableDataCopy.splice(this.index, 1);
        this.dialogVisible = false;
        this.tableData = this.tableDataCopy;
      });
    },
  },
  mounted() {
    this.tableData = this.tableDataCopy;
  },
  created() {
    this.userName = this.$route.params.username;
    console.log(this.userName);
    let params = this.userName;
    this.axios({
      url: `v1/admin/info/${params}`,
      method: "get",
      responseType: "json",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }).then((res) => {
      console.log(res);
      this.tableDataCopy = res.data.data;
      this.tableData = res.data.data;
    });
  },
};
</script>

<style scoped>
.adminAuthority {
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
