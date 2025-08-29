const url = require("url")

address="http://localhost:8000/request/server.php?email=rsuriya119%40gmail.com&password=dfdsfsg"

urldata=url.parse(address,true)

console.log(urldata.protocol)
console.log(urldata.hostname)
console.log(urldata.port)