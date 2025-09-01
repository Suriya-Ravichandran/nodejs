const http = require('http')
const fs = require('fs')
const port=8000
const host="192.168.1.11"



function router(req,res){

    if (req.url==="/"){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the home page!');
    }
    else if (req.url==="/about"){
        console.log(req.url)
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About page!');
    }
    else if (req.url==="/file"){
        const stream = fs.createReadStream('video.mp4');
        console.log(stream)
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        stream.pipe(res);
    }

    else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('page not found!');
    }
}


const server=http.createServer(router)

server.listen(port,host,()=>{
    console.log(`server running on http://${host}:${port}`)
})