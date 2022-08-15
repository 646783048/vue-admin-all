<template>
  <div class="userAuthority">
    <div class="header">
      <el-input
        class="header-ipt"
        v-model="userName"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success" @click="search">查询</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData" height="540" border style="width: 100%">
        <el-table-column fixed prop="username" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="150">
        </el-table-column>
        <el-table-column prop="name" label="企业名称" width="160">
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="160">
        </el-table-column>
        <el-table-column prop="business" label="从事行业" width="150">
        </el-table-column>
        <el-table-column prop="address" label="企业地址" width="160">
        </el-table-column>
        <el-table-column label="操作" width="160">
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
      <el-dialog title="企业" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <!-- <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="从事行业" :label-width="formLabelWidth">
            <el-input v-model="form.business" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
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
  name: "enterpriseAuthority",
  data() {
    return {
      uid:'',
      dialogVisible: false,
      dialogTableVisible: false,
      index: 0,
      bar: "",
      userName: "",
      tableData: [],
      tableDataCopy: [
        {
          username: "",
          password: "",
          name: "",
          email: "",
          phone: "",
          business: "",
          address: "",
        },
      ],
      form: {
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        business: "",
        address: " ",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleDelete() {
      this.axios({
        url: `v1/enterprise/${++this.index}`,
        method: "delete",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        alert("删除成功");
        this.tableData.splice(this.index, 1);
        this.tableDataCopy.splice(this.index, 1);
        this.dialogVisible = false;
        this.tableData = this.tableDataCopy;
      });
    },
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log(this.userName);
      if (this.userName == "") {
        this.tableData = this.tableDataCopy;
      } else {
        let arr = [];
        this.tableDataCopy.forEach((item) => {
          if (this.userName == item.name) {
            arr.push(item);
          }
        });
        this.tableData = arr;
      }
    },
    handleClose(done) {
      this.dialogVisible = false;
    },

    delete_item(index) {
      this.index = index;
      this.dialogVisible = true;
    },
    cancle() {
      this.dialogTableVisible = false;
    },
    confirm() {
      console.log(this.form);
      // this.tableDataCopy[this.index].username = this.form.username;
      this.tableDataCopy[this.index].password = this.form.password;
      this.tableDataCopy[this.index].name = this.form.name;
      this.tableDataCopy[this.index].email = this.form.email;
      this.tableDataCopy[this.index].phone = this.form.phone;
      this.tableDataCopy[this.index].business = this.form.business;
      this.tableDataCopy[this.index].address = this.form.address;
      if(this.bar==1){

      
      this.axios({
        url: "v1/enterprise/info",
        method: "put",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: `password=${this.form.password}&uid=${++this.index}&name=${
          this.form.name
        }&email=${this.form.email}&phone=${this.form.phone}&business=${
          this.form.business
        }&address=${this.form.address}`,
      }).then((res) => {
        console.log(res);
        // this.$router.go(-2)
      });
      this.dialogTableVisible = false;
      this.tableData = this.tableDataCopy;
      }else if(this.bar==3){
              
      this.axios({
        url: "v1/enterprise/info",
        method: "put",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: `password=${this.form.password}&uid=${this.uid}&name=${
          this.form.name
        }&email=${this.form.email}&phone=${this.form.phone}&business=${
          this.form.business
        }&address=${this.form.address}`,
      }).then((res) => {
        console.log(res);
        // this.$router.go(-2)
      });
      this.dialogTableVisible = false;
      this.tableData = this.tableDataCopy;
      }
    },
    edit(index, i) {
      console.log(index, i);
      this.form.username = i.username;
      this.form.password = i.password;
      this.form.name = i.name;
      this.form.email = i.email;
      this.form.phone = i.phone;
      this.form.business = i.business;
      this.form.address = i.address;
      this.index = index;
      this.dialogTableVisible = true;
    },
  },
  mounted() {
    this.tableData = this.tableDataCopy;
  },
  created() {
    this.bar = this.$route.params.bar;
    if (this.bar == 1) {
      this.axios({
        url: `v1/enterprise/infos`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        this.tableDataCopy = res.data.data;
        this.tableData = res.data.data;
        console.log(this.tableData + "111");
      });
    }
    if (this.bar == 3) {
      this.user_name = this.$route.params.username;
      console.log(this.$route.params.bar);
      console.log(this.$route.params.username);
      let params = this.user_name;
      this.axios({
        url: `v1/enterprise/info/${params}`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        this.uid=res.data.data[0].uid;
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
