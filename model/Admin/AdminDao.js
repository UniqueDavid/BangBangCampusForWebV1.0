//管理员相关操作
var AdminModel=require('../../db/Others/AdminModel');
var express = require('express');
//管理员登录验证操作
module.exports.validateLoginInfo=function (req,res) {
    console.log(req.session);
    var username=req.body.username;
    var password=req.body.password;
    AdminModel.find({adminName:username,adminPassword:password},function (err,result) {
        if(!err&&result!=''){
            if(req.session.loginInfo&&req.session.loginInfo.adminId==result.adminId){
                res.redirect('/');
            }else{
                req.session.loginInfo=result;
                res.redirect('/');
            }
        }else
            res.send('用户名或者密码错误！');
    });
};