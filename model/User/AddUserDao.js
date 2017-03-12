//新增一个帮帮用户
var mongoose=require('../../conf/db'),
    Schema=mongoose.Schema;
var User=require('../../db/User/UserModel');
//新建一个用户IDSchema
var UserIdSchema=new Schema({
    _id:String,
    next: {type: Number, default: 1}
});
//添加一个方法
UserIdSchema.statics.increment=function (counter, callback) {
    return this.findByIdAndUpdate(counter, { $inc: { next: 1 } }, {new: true, upsert: true, select: {next: 1}}, callback);
};
module.exports.addBangBangUser=function (req,res) {
    //this.collection.findAndModify(query, sort, doc, options, callback);
    var UserId=mongoose.model('UserIdModel',UserIdSchema);
    UserId.increment('userid',function (err,result) {
        if(err)
            throw err;
        else {
            //之所以要在这里进行插入操作，是因为nodejs单线程异步的特点导致了计算id操作在插入之后进行，从而不能获得id
            var BangBangUser = new User({
                userNickName:req.body.usernickname,
                userId: result.next,
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
                userSafeQuestion:{question:req.body.usersafequestion,answer:req.body.usersafeanswer},
                userCredit:0,
                userFans:[],
                userFollow:[],
                userBangBiValue:0,
                userBonus:0
            });
            BangBangUser.save(function (err) {
                if(err)
                    throw err;
                else
                    res.json("新增用户成功！");
            });
        }
    });
};
