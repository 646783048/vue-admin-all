//引入express模块
const express=require('express');
//引入pool.js模块
const pool=require('../pool.js');
//创建路由器对象
const r=express.Router();
//1.删除简历信息接口
//地址：127.0.0.1:8083/v1/recruitmentResume/
//请求方式delete
r.delete('/:uid',(req,res,next)=>{
	var obj = req.params;
	pool.query('delete from zp_recruitmentResume where uid=?',[obj.uid],(err,result)=>{
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
//2.查找简历信息接口
//地址:127.0.0.1:8083/v1/recruitmentResume/info
//请求方式get
r.get('/info/:user',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_recruitmentResume where user=?',[obj.user],(err,result)=>{
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
//3.修改简历信息接口
//地址:127.0.0.1:8083/v1/recruitmentResume/info
//请求方式put
r.put('/info',(req,res,next)=>{
	var obj=req.body;
	console.log(obj);
	var i=400;
	for(var k in obj){
		i++;
		console.log(k,obj[k])
		if(!obj[k]){
			res.send({code:i,msg:k+'不能为空'})
			return;
		}
	}
	pool.query('update zp_recruitmentResume set? where uid=?',[obj,obj.uid],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.affectedRows===0){
			res.send({code:501,msg:'修改错误'})
		}else{
			res.send({code:200,msg:'修改成功'})
		}
	})
})
//4.集体查询接口
//地址:127.0.0.1:8080/v1/user/infos
//请求方式get
r.get('/infos',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_recruitmentResume',[obj.username],(err,result)=>{
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
//5.添加简历信息接口
//地址:127.0.0.1:8083/v1/recruitmentResume/reg/information
//请求方式:post
r.post('/reg/information',(req,res,next)=>{
	//获得参数
	var obj=req.body
	console.log(obj)
	//将数据插入到数据库表中
	pool.query('insert into zp_recruitmentResume set?',[obj],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		console.log(result);
		//执行成功再响应
		res.send({code:200,msg:'员工添加成功'})
	})
});
//暴露路由器对象
module.exports=r;