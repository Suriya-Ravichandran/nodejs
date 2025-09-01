const http = require('http')

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/plain'})
    res.end('hello world')
})

const port=3000
server.listen(port,'localhost',()=>{
    console.log(`server running at http://localhost:${port}`)
})