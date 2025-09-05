// import project lib
const express = require('express');

// creating express app
const app = express()

// create url routes
app.use((req,res)=>{
    console.log(req.method+" Request Received")
    req.next()
})

app.get("/",(req,res)=>{
    res.status(200).send("Hello world")
})

app.post("/",(req,res)=>{
    res.status(201).send("This is a post request")
})

app.use((req,res)=>{
    res.status(404).send("Page Not found")
})

// create a server
app.listen(5000,()=>{
    console.log("Welcome To Ecommerce RestAPI v1.0.0")
    console.log("Your Server listing on http://localhost:5000")
})