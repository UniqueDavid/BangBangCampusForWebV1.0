//生成评论模型
var mongoose=require('../../conf/db'),
    Schema=mongoose.Schema;
var CommentSchema=new Schema({
    orderId:Number,
    userId:Number,
    commentText:String,
    commentValue:Number,
    commentTime:Number,
    commentImg:String
});
module.exports=mongoose.model('Comment',CommentSchema,'tComment');