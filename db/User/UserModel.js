//帮帮用户模型
var mongoose=require('../../conf/db'),
    Schema=mongoose.Schema;
//这里定义user表的结构
var UserSchema=new Schema({
    userId:Number,
    userNickName:String,
    userPassword:String,
    userSex:String,
    userAvatar:String,
    userBirth:Number,
    userPhone:Number,
    userAddress:String,
    userSchool:String,
    userOrganization:String,
    userLevel:{
        type:Number,
        default:1
    },
    userFocus:{
        type:[String],
        default:[""]
    },
    userLabel:{
        type:[String],
        default:[""]
    },
    userFavor:{
        type:[String],
        default:[""]
    },
    userSkill:{
        type:[String],
        default:[""]
    },
    userStatus:{
        type:Number,
        default:1
    },
    userSafeQuestion:{
        question:{
            type:String,
            default:""
        },
        answer:{
            type:String,
            default:""
        }
    },
    userReputation:{
        type:Number,
        default:1
    },
    userCredit:{
        type:Number,
        default:0
    },
    userFans:{
        type:[String],
        default:[""]
    },
    userFollow:{
        type:[String],
        default:[""]
    },
    userBangBiValue:{
        type:Number,
        default:0
    },
    userBonus:{
        type:Number,
        default:0
    }
});
//分别创建其他三个与用户信息相关的Schema
var UserSkillSchema=new Schema({
    skillId:Number,
    skillName:String,
    skillType:String
});
var UserStatusSchema=new Schema({
    statusId:Number,
    statusName:String
});
var UserReputationSchema=new Schema({
    reputationId:Number,
    reputationMinValue:Number,
    reputationMaxValue:Number,
    reputationLevel:Number
});

//生成对应的Model
var UserSkill=mongoose.model('UserSkill',UserSkillSchema,'tUserSkill');
var UserStatus=mongoose.model('UserStatus',UserStatusSchema,'tUserStatus');
var UserReputation=mongoose.model('UserReputation',UserReputationSchema,'tUserReputation');

//生成User模型
var User=mongoose.model('User',UserSchema,'BangBangUserInfo');
module.exports=User;
//生成其他相关模型
User.UserSkill=UserSkill;
User.UserStatus=UserStatus;
User.UserReputation=UserReputation;