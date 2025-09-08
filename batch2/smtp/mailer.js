const nodemailer=require("nodemailer")

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d9cb942e5171bd",
    pass: "208cd6bd28e437"
  }
});

let mailoptions={
    from: 'noreply.livewirehub.com',
    to: 'rsuriya119@gmail.com',
    subject: "This mail from node js",
    text : "This is a finnal class of Mern stack"
};

transport.sendMail(mailoptions,(error,info)=>{
    if (error){
        console.log(error)
    }else{
        console.log('Email sent :'+info.response);
    }
});