SET NAMES UTF8;
DROP DATABASE IF EXISTS zp;
CREATE DATABASE zp CHARSET=UTF8;
USE zp;

/**管理员信息**/
CREATE TABLE zp_admin(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),
  password VARCHAR(32)
);

/**用户信息**/
CREATE TABLE zp_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),
  password VARCHAR(32),
  name VARCHAR(4),
  age VARCHAR(4),
  sex VARCHAR(4),
  birth VARCHAR(32),
  school VARCHAR(32),
  phone VARCHAR(16),
  email VARCHAR(32),
  major VARCHAR(32),
  education VARCHAR(32)
);
/**企业信息**/
CREATE TABLE zp_enterprise(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32),
  password VARCHAR(32),
  name VARCHAR(32),
  email VARCHAR(32),
  phone VARCHAR(23),
  business VARCHAR(32),
  address VARCHAR(32)
);
/**简历信息**/
CREATE TABLE zp_recruitmentResume(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(32),
  business VARCHAR(32),
  experience VARCHAR(32),
  address VARCHAR(32),
  salary VARCHAR(23),
  job VARCHAR(32),
  state VARCHAR(32),
  data VARCHAR(32),
  svdata VARCHAR(32)
);
/**招聘信息**/
CREATE TABLE zp_recruitmentInformation(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  bussiness VARCHAR(32),
  bussiness_job VARCHAR(32),
  bussiness_salary VARCHAR(32),
  bussiness_address VARCHAR(32),
  bussiness_data VARCHAR(23),
  bussiness_svdata VARCHAR(32),
  bussiness_education VARCHAR(32),
  bussiness_exprience VARCHAR(32),
  bussiness_man VARCHAR(32)
);
/**留言板信息**/
CREATE TABLE zp_usermessage(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(32),
  data VARCHAR(32),
  time VARCHAR(32),
  message VARCHAR(32)
);

/**留言板信息**/
CREATE TABLE zp_enterprisemessage(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(32),
  data VARCHAR(32),
  time VARCHAR(32),
  message VARCHAR(32)
);

/**插入管理员信息**/
INSERT INTO zp_admin VALUES
(NULL, 'admin','123456');

/**插入用户信息**/
INSERT INTO zp_user VALUES
(NULL, 'dingding','123456','王小虎','21','1','1998-12-21','山大商务','15534471264','1123178395@qq.com','电子信息','本科');

/**插入企业信息**/
INSERT INTO zp_enterprise VALUES
(NULL, 'wangyi','123456','网易','646783048@qq.com','15534471264','IT互联网','北京');

/**插入简历信息**/
INSERT INTO zp_recruitmentResume VALUES
(NULL, '王小虎','互联网','北京','北京','6000','前端工程师','求职中','2022-4-3','2023-4-3');

/**插入招聘信息**/
INSERT INTO zp_recruitmentInformation VALUES
(NULL, '网易','IT互联网','8000','北京','2022-4-3','2023-4-3','本科','1-3年','3');
