const express = require("express")
const app = express()


app.use((req,res)=>{
    console.log(req.url)
    req.next()
})

app.get("/",(req,res)=>{
    res.status(200).send("Hello world")
})

app.post("/",(req,res)=>{
    res.status(201).send("This is a post resquest")
})


app.use((req,res)=>{
    res.status(404).send("Page not found")
})


app.listen(5000,()=>{
    console.log("Welcome to Express app ...")
    console.log("Node server listen on http://localhost:5000")
})