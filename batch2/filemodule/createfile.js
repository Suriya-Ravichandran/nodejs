const fs= require("fs");
const path = require('path')
fs.writeFile(path.join(__dirname,'/hello.html'),"<h1>helloworld</h1>",(err)=>{
        if(err)throw err;
        console.log('file created success')
})