// import http module
const http = require('http')

// create a nodejs server
const server=http.createServer((req,res)=>{
    // create urls
    if (req.url==="/"){
        res.writeHead(200,{'content-type':'text/plain'})
        res.end('Welcome to home page')
    }
    else if (req.url==="/about"){
        res.writeHead(200,{'content-type':'text/plain'})
        res.end('This is a about us page')
    }
    
})

// your computer port
const port=3000
// your computer ip
const host="192.168.1.11"


// nodejs server listen on localhost:3000
server.listen(port,host,()=>{
    console.log(`server running at http://${host}:${port}`)
})