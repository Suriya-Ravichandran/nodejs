const path = require('path')

location=path.basename(__dirname+"/hello.txt")

fullpath=path.join(__dirname)
console.log(fullpath)
console.log(location)