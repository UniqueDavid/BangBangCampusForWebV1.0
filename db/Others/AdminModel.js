//生成管理员模型
var mongoose=require('../../conf/db'),
    Schema=mongoose.Schema;
var PermissionModel=require('../Permission/PermissionModel');
var AdminSchema=new Schema({
    adminId:Number,
    adminName:String,
    adminPassword:String,
    adminAvatar:String,
    adminPosition:String,
    adminDept:String,
    adminPermission:{
        type:Schema.Types.ObjectId,
        ref:'PermissionModel'
    }
});
module.exports=mongoose.model('AdminModel',AdminSchema,'tAdminInfo');
