let app = require("http");

app.createServer(function(req,res){
    if(req.method === "POST" && req.url === "/webhook"){
        //设置回应格式 （Json）
        res.setHeader('Content-Type','application/json');
        res.end({status:'ok'});
    }else{
        res.end("Not Found 404");
    }
})

app.linsten(4000,function(){
    console.log("已连接上webhook服务")
})