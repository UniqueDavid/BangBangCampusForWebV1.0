var express = require('express');
var router = express.Router();
var AdminDao=require('../model/Admin/AdminDao');
var UserDao=require('../model/User/UserDao');
var AddUserDao=require('../model/User/AddUserDao');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    if(req.session.loginInfo){
        res.render('HomePage');
    }else{
        res.render('index');
    }
});
//返回当前登录用户的信息
router.get('/getCurrentAdminInfo', function(req, res) {
   res.json(req.session.loginInfo[0]);
});
router.post('/loginCms', function(req, res) {
    //进行登录验证处理
    AdminDao.validateLoginInfo(req,res);
});
//获取当前所有用户的信息
router.post('/getAllUserInfos', function(req, res) {
    UserDao.getAllBangBangUserInfos(req,res);
});
//使用get方式获取所有用户信息
router.get('/getAllUserInfos', function(req, res) {
    UserDao.getAllBangBangUserInfos(req,res);
});
//使用post方式请求注册用户
router.post('/registerUserInfo',function (req,res) {
    console.log(req.body);
    AddUserDao.addBangBangUser(req,res);
});
//获取用户的技能信息
router.get('/getUserSkills', function(req, res) {
    UserDao.findBangBangUserSkillInfo(req,res);
});
module.exports = router;
