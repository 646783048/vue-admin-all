<template>
  <div class="content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="管理名" width="250">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>管理名: {{ scope.row.name }}</p>
            <p>密码: {{ scope.row.keyw }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
       <el-table-column label="密码" width="250">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.keyw }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: 'tables',
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          keyw: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          keyw: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          keyw: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          keyw: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  //生命周期 - 创建完成
  created() {},

  //DOM挂载完毕
  mounted() {},
};
</script>
<style lang='' scoped>
.content {
  float: right;
    width: 1300px;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>