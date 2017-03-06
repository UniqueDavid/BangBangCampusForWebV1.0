//生成订单模型页面
var mongoose=require('../../conf/db'),
    Schema=mongoose.Schema;
var OrderSchema=new OrderSchema({
    orderId:Number,
    orderRecievedTime:Number,
    orderDoneTime:Number,
    orderStatus:{
        type:Schema.Types.ObjectId,
        ref:'OrderStatus'
    },
    orderCancelLimit:{
        type:Number,
        default:3
    },
    orderEffectiveTime:Number,
    orderLocation:{
        x:Number,
        y:Number
    },
    orderTitle:String,
    orderContext:String,
    orderImg:String,
    orderType:{
        type:Schema.Types.ObjectId,
        ref:'OrderType'
    },
    orderBonusValue:Number,
    orderBangBiValue:Number,
    posterId:Number,
    recieverId:Number,
    verification:Number,
    orderQR:String
});
//创建于Order相关的两个Schema
var OrderStatusSchema=new Schema({
    statusId:Number,
    statusValue:Number,
    statusName:String
});
var OrderTypeSchema=new Schema({
    typeId:Number,
    typeName:String
});

//生成对应的model
var OrderStatus=mongoose.model('OrderStatus',OrderStatusSchema,'tOrderStatus');
var OrderType=mongoose.model('OrderType',OrderTypeSchema,'tOrderType');

//最终生成订单模型
module.exports=mongoose.model('Order',OrderSchema,'tOrder');
