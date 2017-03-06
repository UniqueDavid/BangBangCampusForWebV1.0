//生成权限模型
var mongoose=require('../../conf/db'),
    Schema=mongoose.Schema;
var PermissionSchema=new Schema({
    permissionId:Number,
    permissionName:String
});
module.exports=mongoose.model('PermissionModel',PermissionSchema,'tPermission');