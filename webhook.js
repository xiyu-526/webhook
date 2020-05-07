let app = require("http");

let server = app.createServer(function(req,res){
    console.log(req.method,req.url);
    if(req.method === "POST" && req.url === "/webhook"){
        //设置回应格式 （Json）
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify({status:'ok'}));
    }else{
        res.end("Not Found 404");
    }
})

server.listen(4000,function(){
    console.log("已连接上webhook服务")
})