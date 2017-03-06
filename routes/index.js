var express = require('express');
var router = express.Router();
var AdminDao=require('../model/Admin/AdminDao');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('HomePage');
    }else{
        res.render('index');
    }
});
//返回当前登录用户的信息
router.get('/getCurrentAdminInfo', function(req, res) {
   res.json(req.session.user[0]);
});
router.post('/loginCms', function(req, res) {
    //进行登录验证处理
    AdminDao.validateLoginInfo(req,res);
});
//获取当前所有用户的信息
router.get('/getAllUserInfos', function(req, res) {

});
module.exports = router;
