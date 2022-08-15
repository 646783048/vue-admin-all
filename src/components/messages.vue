<template>
  <div class="tab">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <!-- 留言列表 -->
        <div class="liuyan" v-for="(item, index) in list" :key="index">
          <!-- 每一个留言列表3行  第一行:ueser 用户信息-->
          <div class="users">{{ item.user }}: {{ item.data }}</div>
          <!-- 第二个留言内容 -->
          <div class="content">
            {{ item.message }}
          </div>
          <div class="list-bottom">
            <!-- <div class="left">
              <el-link :underline="false">回复</el-link>
            </div> -->
            <!-- :underline='false' 去除下划线 -->
            <!-- <el-link type="danger" :underline="false" @click="del(index, item)"
              >删除</el-link
            > -->
          </div>
        </div>

        <!-- 留言 -->
        <el-form ref="form" :model="form" label-width="80px">
          <!-- lebel表示标签文本 -->
          <el-form-item label="留言">
            <!-- desc代表留言框内的内容 -->
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">留言</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // 用户权限
  name: "message",
  data() {
    return {
      index: "",
      user_name: "",
      bar: "",
      form: {
        id: "",
        // nikename是指昵称框内的内容
        nikename: "",
        // desc是指留言框内的内容
        desc: "",
        //createTime指的是时间
        createTime: "",
        //时间戳
        time: "",
      },
      //list 留言数据
      list: [],
      //默认没有点赞的颜色
      starColor: "#999",
    };
  },
  methods: {
    //onSubmit提交事件
    onSubmit() {
      // 创建时间
      let date = new Date();
      //将时间转化为X年 - X月 - X日 X时：X分：X秒 形式存入到form中的createTime中
      this.form.time = date.getTime();
      this.form.createTime = `${date.getFullYear()}-${
        date.getMonth() + 1
      } - ${date.getDay()}  ${date.getHours()} : ${date.getMinutes()} : ${date.getDate()}`;
      //将每一次的form中的内容追加到list(列表)中
      this.list.push(this.form);
      // 这里出现form是做的清空操作，当内容追加进去之后把所有的框内内容清空
      if (this.bar == 2) {
        this.axios({
          url: `/v1/user_message/reg`,
          method: "post",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `user=${this.user_name}&data=${this.form.createTime}&message=${
            this.form.desc
          }&time=${this.form.time}&uid=${++this.index}`,
        }).then((res) => {
          console.log(res);
          this.form = {
            // nikename是指昵称框内的内容
            nikename: "",
            // desc是指留言框内的内容
            desc: "",
            //增加message
            message: "",
            //createTime指的是时间
            createTime: "",
            //createTime指的是时间
            time: "",
          };
        });
      } else if (this.bar == 3) {
        this.axios({
          url: `/v1/enterprise_message/reg`,
          method: "post",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: `user=${this.user_name}&data=${this.form.createTime}&message=${
            this.form.desc
          }&time=${this.form.time}&uid=${++this.index}`,
        }).then((res) => {
          console.log(res);
          this.form = {
            // nikename是指昵称框内的内容
            nikename: "",
            // desc是指留言框内的内容
            desc: "",
            //增加message
            message: "",
            //createTime指的是时间
            createTime: "",
          };
        });
      }
    },
    del(index, item) {
      //删除事件
      let me = confirm("你确定要删除该条消息吗");
      if (this.bar == 2) {
        if (me) {
          this.axios({
            url: `/v1/user_message/${++index}`,
            method: "delete",
            responseType: "json",
            headers: { "content-type": "application/x-www-form-urlencoded" },
          }).then((res) => {
            console.log(res);
            // this.list.splice(index, 1);
          });
        }
      } else if (this.bar == 3) {
        this.axios({
          url: `/v1/enterprise_message/${++index}`,
          method: "delete",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          console.log(res);
          // this.list.splice(index, 1);
        });
      }
    },
  },
  mounted() {},
  created() {
    this.bar = this.$route.params.bar;
    if (this.bar == 2) {
      this.user_name = this.$route.params.username;
      console.log(this.$route.params.username);
      this.axios({
        url: `/v1/user_message/info/${this.user_name}`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        res.data.data.forEach((element) => {
          this.list.push(element);
        });
        this.axios({
          url: `/v1/enterprise_message/infos`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          res.data.data.forEach((element) => {
            this.list.push(element);
          });
          this.list.sort((a, b) => {
            return a.time - b.time;
          });
          this.index = this.list.length;
          //  console.log(this.form)
        });
      });
      // this.list.forEach((element)=>{
      //   console.log(element.data)
      // })
      // console.log(this.list[0].data);

      // console.log(arr);
    }
    if (this.bar == 3) {
      this.user_name = this.$route.params.username;
      console.log(this.$route.params.username);
      this.axios({
        url: `/v1/user_message/infos`,
        method: "get",
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }).then((res) => {
        console.log(res);
        res.data.data.forEach((element) => {
          console.log(element);
          this.list.push(element);
        });
        this.axios({
          url: `/v1/enterprise_message/info/${this.user_name}`,
          method: "get",
          responseType: "json",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }).then((res) => {
          console.log(res);
          res.data.data.forEach((element) => {
            this.list.push(element);
          });
          this.list.sort((a, b) => {
            return a.time - b.time;
          });
          this.index = this.list.length;
        });
      });
    }
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
