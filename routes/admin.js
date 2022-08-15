//引入express模块
const express=require('express');
//引入pool.js模块
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();
//1.管理员注册接口
//地址:127.0.0.1:8083/v1/admin/reg
//请求方式:post
r.post('/reg',(req,res,next)=>{
	//获得参数
	var obj=req.body
	console.log(obj)
	//验证用户名密码不能为空
	if(!obj.username){
		res.send({code:401,msg:'username不能为空'})
		return;
	}else if(!obj.password){
		res.send({code:402,msg:'password不能为空'})
		return;
	}
	//将数据插入到数据库表中
	pool.query('insert into zp_admin set?',[obj],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		console.log(result);
		//执行成功再响应
		res.send({code:200,msg:'员工添加成功'})
	})
});
//2.管理员登录接口
//地址：127.0.0.1:8083/v1/admin/login
//请求方式post
r.post('/login',(req,res,next)=>{
	var obj=req.body
	//console.log(obj)
	if(!obj.username){
		res.send({code:401,msg:'username不能为空'})
		return;
	}else if(!obj.password){
		res.send({code:402,msg:'password不能为空'})
		return;
	}
	pool.query('select * from zp_admin where username=? and password=?',[obj.username,obj.password],(err,result)=>{
		if (err)
		{
			next(err);
			return;
		}
		if(result.length!=0){
			res.send({code:200,msg:"登录成功"})
		}else{
			res.send({code:501,msg:"登陆失败"})
		}
	})
})
//3.管理员用户接口
//地址：127.0.0.1:8083/v1/admin/
//请求方式delete
//请求方式delete
r.delete('/:uid',(req,res,next)=>{
	var obj = req.params;
	pool.query('delete from zp_admin where uid=?',[obj.uid],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.affectedRows===0){
			res.send({code:501,msg:'删除失败'});
		}else{
			res.send({code:200,msg:'删除成功'});
		}
	})
})
//4.查找管理员接口
//地址:127.0.0.1:8083/v1/admin/info
//请求方式get
r.get('/info/:username',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_admin where username=?',[obj.username],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.length===0){
			res.send({code:501,msg:'查询失败'});
		}else{
			res.send({code:200,msg:'查询成功',data:result});
		}
	})
})
//5.修改管理员接口
//地址:127.0.0.1:8083/v1/admin/info
//请求方式put
r.put('/info',(req,res,next)=>{
	var obj=req.body;
	console.log(obj.username);
	console.log(obj.password);
	var i=400;
	for(var k in obj){
		i++;
		console.log(k,obj[k])
		if(!obj[k]){
			res.send({code:i,msg:k+'不能为空'})
			return;
		}
	}
	//UPDATE 表名 SET 字段名1='a',字段名2='b' WHERE 字段名3='c';
	pool.query('UPDATE zp_admin SET username=?,password=? WHERE uid=?',[obj.username,obj.password,obj.uid],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.affectedRows===0){
			res.send({code:501,msg:'修改错误'})
		}else{
			res.send({code:200,msg:'修改成功',msg:result})
		}
	})
})
//暴露路由器对象
module.exports=r;