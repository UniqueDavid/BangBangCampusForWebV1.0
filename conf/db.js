//数据库配置文件
var mongoose=require('mongoose');
DB_URL="mongodb://112.74.41.59/sos";
//创建数据库连接
mongoose.connect(DB_URL,function (err) {
    if(!err)
        console.log('connect success！');
    else
        throw err;
});
module.exports=mongoose;