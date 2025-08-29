const path = require("path")

file=path.join(__dirname,"img/logo.jpg")

checkpng=path.extname(file)

if (checkpng==".png"){
    console.log(true)
}else{
    console.log(false)
}
