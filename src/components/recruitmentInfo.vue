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
        <el-table-column fixed prop="user" label="求职者姓名" width="120">
        </el-table-column>
        <el-table-column prop="business" label="求职行业" width="120">
        </el-table-column>
        <el-table-column prop="experience" label="工作经验" width="120">
        </el-table-column>
        <el-table-column prop="address" label="工作地点" width="130"> </el-table-column>
        <el-table-column prop="salary" label="期望薪资" width="130"> </el-table-column>
        <el-table-column prop="job" label="意向职位" width="130">
        </el-table-column>
        <el-table-column prop="state" label="求职状态" width="130">
        </el-table-column>
        <el-table-column prop="data" label="发布时间" width="130">
        </el-table-column>
        <el-table-column prop="svdata" label="有效时间" width="130">
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template>
            <el-button
              type="text"
              size="small"
              @click="dialogTableVisible = true"
              >编辑</el-button
            >
            <el-button @click="dialogVisible = true" type="text" size="small"
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
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
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
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false"
            >确 定</el-button
          >
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
      tableData: [],
      tableDataCopy: [
        {
          user: "王小虎",
          business: "互联网",
          experience: "1年",
          address: "北京",
          salary: "6000",
          job: "前端工程师",
          state:"求职中",
          data: "2022-4-3",
          svdata: "2023-4-3",
        },
      ],
       form: {
          user: "王小虎",
          business: "互联网",
          experience: "1年",
          address: "北京",
          salary: "6000",
          job: "前端工程师",
          state:"求职中",
          data: "2022-4-3",
          svdata: "2023-4-3",
        },
          formLabelWidth: '120px' 
    };
  },
  methods: {
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
  },
  mounted() {
    this.tableData = this.tableDataCopy;
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
