//引入express模块
const express=require("express");
// 跨域问题
const cors=require('cors')
//引入用户路由器模块
const userRouter=require('./routes/user.js');
//引入管理员路由器模块
const userRouter_2=require('./routes/admin.js');
//引入企业路由器模块
const userRouter_3=require('./routes/enterprise.js');
//引入招聘信息路由器模块
const userRouter_4=require('./routes/recruitmentResume.js');
//引入招聘简历路由器模块
const userRouter_5=require('./routes/recruitmentInformation.js');
//引入用户留言板路由器模块 zp_enterprisemessage
const userRouter_6=require('./routes/user_message.js');
//引入企业留言板路由器模块
const userRouter_7=require('./routes/enterprise_message.js');
//创建web服务器
const app = express();
// app.use(cors({
//   origin:['http://127.0.0.1:8080']
// }))
//设置响应的端口号

app.use(cors());
// 改了一下
app.listen(8083,()=>{
	console.log("服务器响应成功8083")
});  
//将post传递的参数转化为对象
app.use( express.urlencoded({
  extended:true
}) );
//使用用户路由器,添加前缀/v1/users
app.use('/v1/user',userRouter);
//使用用户路由器,添加前缀/v1/users
app.use('/v1/admin',userRouter_2);
//使用用户路由器,添加前缀/v1/users
app.use('/v1/enterprise',userRouter_3);
//使用用户路由器,添加前缀/v1/users
app.use('/v1/recruitmentResume',userRouter_4);
//使用用户路由器,添加前缀/v1/users
app.use('/v1/recruitmentInformation',userRouter_5);
//使用用户路由器,添加前缀/v1/users
app.use('/v1/user_message',userRouter_6);
//使用用户路由器,添加前缀/v1/users
app.use('/v1/enterprise_message',userRouter_7);
//添加错误处理中间件，拦截所有路由传递的错误
app.use( (err,req,res,next)=>{
  //err 接收的错误内容
  console.log(err);
  res.send({code:500,msg:'服务器端错误'});
} );

