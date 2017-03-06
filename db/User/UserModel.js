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
        type:Schema.Types.ObjectId,
        ref:'UserSkill'
    },
    userStatus:{
        type:Schema.Types.ObjectId,
        ref:'UserStatus'
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
        type:Schema.Types.ObjectId,
        ref:'UserReputation'
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
    reputationValue:Number,
    reputationLevel:Number
});

//生成对应的Model
var UserSkill=mongoose.model('UserSkill',UserSkillSchema,'tUserSkill');
var UserStatus=mongoose.model('UserStatus',UserStatusSchema,'tUserStatus');
var UserReputation=mongoose.model('UserReputation',UserReputationSchema,'tUserReputation');

//生成User模型
module.exports=mongoose.model('User',UserSchema,'tUser');