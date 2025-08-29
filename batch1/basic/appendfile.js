const fs = require("fs")
const path = require("path")
filepath=path.join(__dirname,"hello.txt")

fs.appendFile(filepath,'new data',(err)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log("File update sucess")
    }
})