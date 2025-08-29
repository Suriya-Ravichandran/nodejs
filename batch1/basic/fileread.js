const fs = require("fs")
const path = require("path")
filepath=path.join(__dirname,"hello.txt")

fs.readFile(filepath,'utf-8',(err,data)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log(data)
    }
})