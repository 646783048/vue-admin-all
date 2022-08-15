//����expressģ��
const express=require('express');
//����pool.jsģ��
const pool=require('../pool.js');
//����·��������
const r=express.Router();
//1.ɾ����Ƹ��Ϣ�ӿ�
//��ַ��127.0.0.1:8083/v1/recruitmentInformation/
//����ʽdelete
r.delete('/:uid',(req,res,next)=>{
	var obj = req.params;
	pool.query('delete from zp_recruitmentInformation where uid=?',[obj.uid],(err,result)=>{
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
//2.������Ƹ��Ϣ�ӿ�
//��ַ:127.0.0.1:8083/v1/recruitmentInformation/info
//����ʽget
r.get('/info/:uname',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_recruitmentInformation where bussiness=?',[obj.uname],(err,result)=>{
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
//3.�޸���Ƹ��Ϣ�ӿ�
//��ַ:127.0.0.1:8083/v1/recruitmentInformation/info
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
	pool.query('update zp_recruitmentInformation set? where uid=?',[obj,obj.uid],(err,result)=>{
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
//��ַ:127.0.0.1:8083/v1/recruitmentInformation/infos
//����ʽget
r.get('/infos',(req,res,next)=>{
	var obj=req.params;
	console.log(req.params)
	pool.query('select * from zp_recruitmentInformation',[obj.bussiness],(err,result)=>{
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
//��ַ:127.0.0.1:8083/v1/recruitmentInformation/reg/information
//����ʽ:post
r.post('/reg/information',(req,res,next)=>{
	//��ò���
	var obj=req.body
	console.log(obj)
	//�����ݲ��뵽���ݿ����
	pool.query('insert into zp_recruitmentInformation set?',[obj],(err,result)=>{
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