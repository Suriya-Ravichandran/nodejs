const nodemailer = require("nodemailer")

function mysmtp(sender,reciver,subject,message){
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d9cb942e5171bd",
    pass: "208cd6bd28e437"
  }
});

let mail ={
    from: sender,
    to: reciver,
    subject: subject,
    text: message
}

transport.sendMail(mail,(error,info)=>{
    if(error){
        console.log("Error: ",error)
    }else{
        console.log("Email sent: ",info.response)
    }
})

}


let senderemail='noreplay@liverwire.com'
let receivermail='rsuriya119@gmail.com'
let subjectmail='This mail send via nodejs'
let message='Hello Albin this mail from node js this your smtp class in livewire'
mysmtp(senderemail,receivermail,subjectmail,message)