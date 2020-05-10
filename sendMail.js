const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service:'qq',
    port:465,     //Smtp端口
    secureConnection:true, //使用了SSL
    auth:{
      user:997578871@qq.com,
      pass:'Smtp授权码'
    }
});

function sendMail(msg){
  let mailOptions = {
      from:'"997578871" <997578871@qq.com>', //发送地址
      to:'997578871@qq.com', //接受者
      subject:'git部署通知',
      html:msg
  };
  transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
          return console.log(error);
      }
      console.log('Massge sent:%s',info.messageId);
  });
}
module.exports = sendMail;
