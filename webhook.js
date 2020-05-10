let app = require("http");


let server = app.createServer(function(req,res){
    console.log(req.method,req.url)
    if(req.method === "POST" && req.url==="/webhook"){
        console.log("监听到触发事件")
    }
})

server.listen(4000,function(){
    console.log("webhook服务已启动")
})
