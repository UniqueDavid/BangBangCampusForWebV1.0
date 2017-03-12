var express = require('express');
//首先获取到User模型
var User=require('../../db/User/UserModel');
var UserSkill=User.UserSkill;
//查询所有注册用户的信息
module.exports.getAllBangBangUserInfos=function (req,res) {
    User.find({},function (err,result) {
        if(!err)
            res.json(result);
        else
            throw err;
    });
};

module.exports.findBangBangUserInfoByUserNickName=function (req,res) {
    var findUserNickName=req.body.findUserNickName;
    var wherestr={userNickName:'David'};
    User.find(wherestr,function (err,result) {
        if(!err&&result!=''){
            res.json(result);
        }else
            throw err;
    });
};
//根据用户ID号查询用户信息
module.exports.findBangBangUserInfoByUserId=function (req,res) {
    var findUserId=req.body.userId;
    var wherestr={userId:findUserId};
    User.find(wherestr,function (err,result) {
        if(!err&&result!=''){
            res.json(result);
        }else
            throw err;
    });
};
//更新用户信息
module.exports.alterBangBangUserInfo=function (req,res) {
    console.log(req.body);
    User.update({userId:req.body.userid},{$set:{userNickName:req.body.usernickname,
        userPassword:req.body.userpassword,
        userSex:req.body.usersex,
        userAvatar:req.body.useravatar,
        userBirth:new Date(req.body.userbirth).getTime(),
        userPhone:parseInt(req.body.userphone),
        userAddress:req.body.useraddress,
        userSchool:req.body.userschool,
        userOrganization:req.body.userorganization,
        userFocus:[req.body.userfocus],
        userLabel:[req.body.userlabel],
        userFavor:[req.body.userfavor],
        userSkill:[req.body.userskill],
        userSafeQuestion:{question:req.body.usersafequestion,answer:req.body.usersafeanswer}}},function (err,result) {
        if(!err&&result!=''){
            res.send(result);
        }else
            throw err;
    });
};
//删除用户
module.exports.deleteBangBangUserInfo=function (req,res) {
    console.log(req.body);
    User.remove({userId:req.body.userId},function (err,result) {
        if(!err&&result!=''){
            res.send(result);
        }else
            throw err;
    });
};
//批量删除用户
module.exports.deleteCheckedBangBangUserInfo=function (req,res) {
    var userIds=req.body.userIds.split(",");
    User.remove({userId:{$in:userIds}},function (err,result) {
        if(!err&&result!=''){
            res.send(result);
        }else
            throw err;
    });
};

module.exports.findBangBangUserInfo=function (findUserNickName) {
    var wherestr={userNickName:findUserNickName};
    User.find(wherestr,function (err,result) {
        if(!err&&result!=''){
            console.log(result);
        }else
            throw err;
    });
};
//查看所有用户技能信息
module.exports.findBangBangUserSkillInfo=function (req,res) {
    var wherestr={};
    UserSkill.find(wherestr,function (err,result) {
        if(!err&&result!='')
            res.json(result);
        else
            throw err;
    });
};