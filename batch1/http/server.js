const http = require('http')
const url = require('url');


host="localhost"
port="8000"

const router=(req,res)=>{
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const value=parsedUrl.query
    console.log(value)

     // Routing logic
    if (method === 'get') {
        if (path === '') {
          if (value.id==1){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the home page!');
          }else {
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                res.end('Method Not Allowed');
            }

        } else if (path === 'about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About us page');
        } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        }
    } 
    else if(method==='post'){
        if (path === 'postmethod') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is Post Request');
        }
    }

    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
};


const server=http.createServer(router)

server.listen(port,host,()=>{
    console.log(`server running on http://${host}:${port}`)
})