<template>
  <div class="userAuthority">
    <div class="header">
      <el-input
        class="header-ipt"
        v-model="userName"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="success" @click="add" v-if="bar != 2">添加</el-button>
    </div>
    <div class="body">
      <el-table :data="tableData" height="540" border style="width: 100%">
        <el-table-column fixed prop="bussiness" label="企业名称" width="130">
        </el-table-column>
        <el-table-column prop="bussiness_job" label="所属行业" width="120">
        </el-table-column>
        <el-table-column prop="bussiness_salary" label="招聘薪资" width="120">
        </el-table-column>
        <el-table-column prop="bussiness_address" label="工作地点" width="120">
        </el-table-column>
        <el-table-column prop="bussiness_data" label="发布时间" width="130">
        </el-table-column>
        <el-table-column prop="bussiness_svdata" label="有效时间" width="130">
        </el-table-column>
        <el-table-column prop="bussiness_education" label="学历" width="130">
        </el-table-column>
        <el-table-column prop="bussiness_exprience" label="经验" width="130">
        </el-table-column>
        <el-table-column prop="bussiness_man" label="人数" width="130">
        </el-table-column>
        <el-table-column label="操作" width="130" v-if="usertable == true">
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.$index, scope.row)"
              type="text"
              size="small"
              v-if="bar != 2"
              >编辑</el-button
            >
            <el-button
              @click="delete_item(scope.$index)"
              type="text"
              size="small"
              v-if="bar != 2"
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
      <el-dialog title="招聘信息" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <el-form-item label="企业名称" :label-width="formLabelWidth">
            <el-input v-model="form.bussiness" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属行业" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_job"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="招聘薪资" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_salary"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作地点" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_address"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="发布时间" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_data"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效时间" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_svdata"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_education"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="经验" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_exprience"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="人数" :label-width="formLabelWidth">
            <el-input
              v-model="form.bussiness_man"
              autocomplete="off"
            ></el-input>
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
  name: "recruitmentInformation",
  data() {
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      userName: "",
      index: "",
      bar: "",
      item: 1,
      uid: "",
      usertable: true,
      tableData: [],
      tableDataCopy: [
        {
          bussiness: "",
          bussiness_job: "",
          bussiness_salary: "",
          bussiness_address: "",
          bussiness_data: "",
          bussiness_svdata: "",
          bussiness_education: "",
          bussiness_exprience: "",
          bussiness_man: "",
        },
      ],
      form: {
        bussiness: "",
        bussiness_job: "",
        bussiness_salary: "",
        bussiness_address: "",
        bussiness_data: "",
        bussiness_svdata: "",
        bussiness_education: "",
        bussiness_exprience: "",
        bussiness_man: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    add() {
      this.dialogTableVisible = true;
      this.item = 0;
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
          console.log(item);
          if (item.bussiness.indexOf(this.userName) >= 0) {
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
      this.form.bussiness = i.bussiness;
      this.form.bussiness_job = i.bussiness_job;
      this.form.bussiness_salary = i.bussiness_salary;
      this.form.bussiness_address = i.bussiness_address;
      this.form.bussiness_data = i.bussiness_data;
      this.form.bussiness_svdata = i.bussiness_svdata;
      this.form.bussiness_education = i.bussiness_education;
      this.form.bussiness_exprience = i.bussiness_exprience;
      this.form.bussiness_man = i.bussiness_man;
      this.index = index;
      this.dialogTableVisible = true;
    },
    delete_item(index) {
      this.index = index;
      this.dialogVisible = true;
    },
    handleDelete() {
      this.axios({
        url: `v1/recruitmentInformation/${++this.index}`,
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
    cancle() {
      this.dialogTableVisible = false;
    },
    confirm() {
      // this.tableDataCopy[this.index].bussiness_job = this.form.bussiness_job;
      // this.tableDataCopy[this.index].bussiness_salary =
      //   this.form.bussiness_salary;
      // this.tableDataCopy[this.index].bussiness_address =
      //   this.form.bussiness_address;
      // this.tableDataCopy[this.index].bussiness_data = this.form.bussiness_data;
      // this.tableDataCopy[this.index].bussiness_svdata =
      //   this.form.bussiness_svdata;
      // this.tableDataCopy[this.index].bussiness_education =
      //   this.form.bussiness_education;
      // this.tableDataCopy[this.index].bussiness_exprience =
      //   this.form.bussiness_exprience;
      // this.tableDataCopy[this.index].bussiness_man = this.form.bussiness_man;
      if (this.item == 1) {
        this.axios({
          url: "v1/recruitmentInformation/info",
          method: "put",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `uid=${++this.index}&bussiness=${
            this.form.bussiness
          }&&bussiness_job=${this.form.bussiness_job}&bussiness_salary=${
            this.form.bussiness_salary
          }&bussiness_address=${this.form.bussiness_address}&bussiness_data=${
            this.form.bussiness_data
          }&bussiness_svdata=${
            this.form.bussiness_svdata
          }&bussiness_education=${
            this.form.bussiness_education
          }&bussiness_exprience=${
            this.form.bussiness_exprience
          }&bussiness_man=${this.form.bussiness_man}`,
        }).then((res) => {
          console.log(res);
          this.dialogTableVisible = false;
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
          console.log(res)
          let uer_id = res.data.data.length;
          this.axios({
            url: "v1/recruitmentInformation/reg/information",
            method: "post",
            responseType: "json",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: `uid=${++uer_id}&bussiness=${
              this.form.bussiness
            }&bussiness_job=${this.form.bussiness_job}&bussiness_salary=${
              this.form.bussiness_salary
            }&bussiness_address=${this.form.bussiness_address}&bussiness_data=${
              this.form.bussiness_data
            }&bussiness_svdata=${
              this.form.bussiness_svdata
            }&bussiness_education=${
              this.form.bussiness_education
            }&bussiness_exprience=${
              this.form.bussiness_exprience
            }&bussiness_man=${this.form.bussiness_man}`,
          }).then((res) => {
            console.log(res);
            this.dialogTableVisible = false;
          });
        });
      }
    },
  },
  mounted() {
    this.tableData = this.tableDataCopy;
  },
  created() {
    this.bar = this.$route.params.bar;
    if (this.bar == 1) {
      this.axios({
        url: `v1/recruitmentInformation/infos`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res.data.data);
        this.tableDataCopy = res.data.data;
        this.tableData = res.data.data;
        this.uid = res.data.data.length;
      });
    }
    if (this.bar == 2) {
      this.axios({
        url: `v1/recruitmentInformation/infos`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        // console.log(res);
        this.tableDataCopy = res.data.data;
        this.tableData = res.data.data;
      });
    }
    if (this.bar == 3) {
      this.user_name = this.$route.params.username;
      console.log(this.$route.params.bar);
      console.log(this.$route.params.username);
      this.axios({
        url: `v1/enterprise/info/${this.user_name}`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        this.user_name = res.data.data[0].name;
        console.log(this.user_name);
        this.axios({
          url: `v1/recruitmentInformation/info/${this.user_name}`,
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
