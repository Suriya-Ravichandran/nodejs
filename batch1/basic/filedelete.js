const fs = require("fs")
const path = require("path")
filepath=path.join(__dirname,"hello.txt")

fs.unlink(filepath,(err)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log("File deleted sucess")
    }
})