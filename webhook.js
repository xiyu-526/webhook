let app = require("http");
let {spawn} = require("child_process");
let crypto = require('crypto'); //hash 模块
//let sendMail = require('./sendMail');
function sign(body){
    //使用 hash.update() 方法将要计算的数据以流（stream）的方式写入，流输入结束后，使用 hash.digest() 方法计算数据的 hash 值。
    //sha1双重加密
    //sha256双重加密
    //md5双重加密
    console.log('createHmac'+crypto.createHmac('sha1','111111'));
    console.log('createHmac.update'+crypto.createHmac('sha1','111111').update(body));
    console.log('createHmac.update.digest'+crypto.createHmac('sha1','111111').update(body).digest('hex'));
    
    return `sha1=`+crypto.createHmac('sha1','111111').update(body).digest('hex');
}

let server = app.createServer(function(req,res){
    console.log(req.method,req.url);
    if(req.method === "POST" && req.url === "/webhook"){
        let bufs = [];
        console.log('req:::');
        console.log(req);
        req.on('data',function(buf){
            console.log("req-data:");
            console.log(buf);
            bufs.push(buf);
        })
        req.on('end',function(buf){
            let body = Buffer.concat(bufs);
            console.log("Buffer-body:");
            console.log(body);
            
            //触发传递的事件类型的名称。
            let eventname = req.headers['x-github-event']; //push事件
            let signature = req.headers['x-hub-signature']; //github请求过来的时候，要传递请求体body,还会传递一个signature(签名)，你需要验证签名对不对
            
            console.log("signature:");
            console.log(signature);
            
            console.log("sign-BODY:");
            console.log(sign(body));
            
            //sign 用于生成签名
            if(signature !== sign(body)){
               return res.end("没找到");
            }
            //设置回应格式 （Json）
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({status:'ok'}));
            if(eventname==="push"){
                let pay = JSON.parse(body);
                let child = spawn('sh',[`${pay.repository.name}.sh`]);
                let bufs = [];
                
                console.log("pay:");
                console.log(pay);
                
                child.stdout.on("data",function(buffer){
                    console.log("childe-data-on:"+buffer);
                    bufs.push(buffer);
                })
                child.stdout.on("end",function(buffer){
                    console.log('bufs:'+bufs);
                    let logs = Buffer.concat(bufs);
                   
                    console.log('logs:'+logs);
                    let tologs = logs.toString();
                    //sendMail(`
                    //    <h3>部署日期：${new Date()}</h3>
                    //    <h3>部署人：${pay.pusher.name}</h3>
                    //    <h3>部署邮箱：${pay.pusher.email}</h3>
                    //    <h3>提交信息：${pay.head_commit&&pay.head_commit['message']}</h3>
                     //   <h3>部署日志：${tologs.replace("\r\n","<br />")}</h3>
                    //`);
                })
            } 
            
        })
        
    }else{
        res.end("Not Found 404");
    }
})

server.listen(4000,function(){
    console.log("已连接上webhook服务")
})
