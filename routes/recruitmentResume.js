//����expressģ��
const express=require('express');
//����pool.jsģ��
const pool=require('../pool.js');
//����·��������
const r=express.Router();
//1.ɾ��������Ϣ�ӿ�
//��ַ��127.0.0.1:8083/v1/recruitmentResume/
//����ʽdelete
r.delete('/:uid',(req,res,next)=>{
	var obj = req.params;
	pool.query('delete from zp_recruitmentResume where uid=?',[obj.uid],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.affectedRows===0){
			res.send({code:501,msg:'ɾ��ʧ��'});
		}else{
			res.send({code:200,msg:'ɾ���ɹ�'});
		}
	})
})
//2.���Ҽ�����Ϣ�ӿ�
//��ַ:127.0.0.1:8083/v1/recruitmentResume/info
//����ʽget
r.get('/info/:user',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_recruitmentResume where user=?',[obj.user],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.length===0){
			res.send({code:501,msg:'��ѯʧ��'});
		}else{
			res.send({code:200,msg:'��ѯ�ɹ�',data:result});
		}
	})
})
//3.�޸ļ�����Ϣ�ӿ�
//��ַ:127.0.0.1:8083/v1/recruitmentResume/info
//����ʽput
r.put('/info',(req,res,next)=>{
	var obj=req.body;
	console.log(obj);
	var i=400;
	for(var k in obj){
		i++;
		console.log(k,obj[k])
		if(!obj[k]){
			res.send({code:i,msg:k+'����Ϊ��'})
			return;
		}
	}
	pool.query('update zp_recruitmentResume set? where uid=?',[obj,obj.uid],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.affectedRows===0){
			res.send({code:501,msg:'�޸Ĵ���'})
		}else{
			res.send({code:200,msg:'�޸ĳɹ�'})
		}
	})
})
//4.�����ѯ�ӿ�
//��ַ:127.0.0.1:8080/v1/user/infos
//����ʽget
r.get('/infos',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_recruitmentResume',[obj.username],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		if(result.length===0){
			res.send({code:501,msg:'��ѯʧ��'});
		}else{
			res.send({code:200,msg:'��ѯ�ɹ�',data:result});
		}
	})
})
//5.��Ӽ�����Ϣ�ӿ�
//��ַ:127.0.0.1:8083/v1/recruitmentResume/reg/information
//����ʽ:post
r.post('/reg/information',(req,res,next)=>{
	//��ò���
	var obj=req.body
	console.log(obj)
	//�����ݲ��뵽���ݿ����
	pool.query('insert into zp_recruitmentResume set?',[obj],(err,result)=>{
		if(err){
			next(err);
			return;
		}
		console.log(result);
		//ִ�гɹ�����Ӧ
		res.send({code:200,msg:'Ա����ӳɹ�'})
	})
});
//��¶·��������
module.exports=r;