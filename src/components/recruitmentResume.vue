<template>
  <div class="userAuthority">
    <div class="header">
      <el-input
        class="header-ipt"
        v-model="userName"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="success" @click="add" v-if="bar != 3">添加</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData" height="540" border style="width: 100%">
        <el-table-column fixed prop="user" label="求职者姓名" width="120">
        </el-table-column>
        <el-table-column prop="business" label="求职行业" width="120">
        </el-table-column>
        <el-table-column prop="experience" label="工作经验" width="120">
        </el-table-column>
        <el-table-column prop="address" label="工作地点" width="130">
        </el-table-column>
        <el-table-column prop="salary" label="期望薪资" width="130">
        </el-table-column>
        <el-table-column prop="job" label="意向职位" width="130">
        </el-table-column>
        <el-table-column prop="state" label="求职状态" width="130">
        </el-table-column>
        <el-table-column prop="data" label="发布时间" width="130">
        </el-table-column>
        <el-table-column prop="svdata" label="有效时间" width="130">
        </el-table-column>
        <el-table-column label="操作" width="130" v-if="usertable == true">
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.$index, scope.row)"
              type="text"
              size="small"
              v-if="bar != 3"
              >编辑</el-button
            >
            <el-button
              @click="delete_item(scope.$index)"
              type="text"
              size="small"
              v-if="bar != 3"
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
      <el-dialog title="招聘简历" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <el-form-item label="求职者姓名" :label-width="formLabelWidth">
            <el-input v-model="form.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="求职行业" :label-width="formLabelWidth">
            <el-input v-model="form.business" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作经验" :label-width="formLabelWidth">
            <el-input v-model="form.experience" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作地点" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="期望薪资" :label-width="formLabelWidth">
            <el-input v-model="form.salary" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="意向职位" :label-width="formLabelWidth">
            <el-input v-model="form.job" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="求职状态" :label-width="formLabelWidth">
            <el-input v-model="form.state" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" :label-width="formLabelWidth">
            <el-input v-model="form.data" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="有效时间" :label-width="formLabelWidth">
            <el-input v-model="form.svdata" autocomplete="off"></el-input>
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
  name: "recruitmentResume",
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      usertable: true,
      bar: "",
      index: "",
      item: 1,
      uid: "",
      userName: "",
      user_name: "",
      tableData: [],
      tableDataCopy: [
        {
          user: "",
          business: "",
          experience: "",
          address: "",
          salary: "",
          job: "",
          state: "",
          data: "",
          svdata: "",
        },
      ],
      form: {
        user: "",
        business: "",
        experience: "",
        address: "",
        salary: "",
        job: "",
        state: "",
        data: "",
        svdata: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    add() {
      this.dialogTableVisible = true;
      this.item = 0;
    },
    cancle() {
      this.dialogTableVisible = false;
    },
    confirm() {
      // this.tableDataCopy[this.index].user = this.form.user;
      // this.tableDataCopy[this.index].business = this.form.business;
      // this.tableDataCopy[this.index].experience = this.form.experience;
      // this.tableDataCopy[this.index].address = this.form.address;
      // this.tableDataCopy[this.index].salary = this.form.salary;
      // this.tableDataCopy[this.index].job = this.form.job;
      // this.tableDataCopy[this.index].state = this.form.state;
      // this.tableDataCopy[this.index].data = this.form.data;
      // this.tableDataCopy[this.index].svdata = this.form.svdata;
      if (this.item == 1) {
        this.axios({
          url: "v1/recruitmentResume/info",
          method: "put",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `uid=${++this.index}&user=${this.form.user}&business=${
            this.form.business
          }&experience=${this.form.experience}&address=${
            this.form.address
          }&salary=${this.form.salary}&job=${this.form.job}&state=${
            this.form.state
          }&data=${this.form.data}&svdata=${this.form.svdata}`,
        }).then((res) => {
          console.log(res);
          // res.
          // this.$router.go(-2)
        });
        this.dialogTableVisible = false;
        this.tableData = this.tableDataCopy;
      } else if (this.item == 0) {
        this.axios({
          url: `v1/recruitmentResume/infos`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          console.log(res.data.data);
          let uer_id = res.data.data.length;
          
          if(uer_id==''){uer_id=0}
          this.axios({
            url: "v1/recruitmentResume/reg/information",
            method: "post",
            responseType: "json",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: `user=${this.form.user}&uid=${++uer_id}&business=${
              this.form.business
            }&experience=${this.form.experience}&address=${
              this.form.address
            }&salary=${this.form.salary}&job=${this.form.job}&state=${
              this.form.state
            }&data=${this.form.data}&svdata=${this.form.svdata}`,
          }).then((res) => {
            console.log(res);
            this.dialogTableVisible = false;
          });
        });
      }
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
          console.log(item)
          if (item.user.indexOf(this.userName) >= 0) {
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
      this.form.user = i.user;
      this.form.business = i.business;
      this.form.experience = i.experience;
      this.form.address = i.address;
      this.form.salary = i.salary;
      this.form.job = i.job;
      this.form.state = i.state;
      this.form.data = i.data;
      this.form.svdata = i.svdata;
      this.index = index;
      this.dialogTableVisible = true;
    },
    delete_item(index) {
      this.index = index;
      this.dialogVisible = true;
    },
    handleDelete() {
      this.axios({
        url: `v1/recruitmentResume/${++this.index}`,
        method: "delete",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        alert("删除成功");
        this.tableData.splice(++this.index, 1);
        this.tableDataCopy.splice(++this.index, 1);
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
        url: `v1/recruitmentResume/infos`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        this.tableDataCopy = res.data.data;
        this.tableData = res.data.data;
        console.log(res.data.data.length);
        this.uid = res.data.data.length;
      });
    }
    if (this.bar == 3) {
      this.axios({
        url: `v1/recruitmentResume/infos`,
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
      this.axios({
        url: `v1/user/info/${this.user_name}`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        console.log(res.data.data.length);
        this.user_name = res.data.data[0].name;
        console.log(this.user_name);
        this.axios({
          url: `v1/recruitmentResume/info/${this.user_name}`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          console.log(res);
          this.tableDataCopy = res.data.data;
          this.tableData = res.data.data;
        });
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
