const express = require("express")
const connectDB = require("./db")
const Product = require("./models/Product")
const bodyParser=require("body-parser")

// create express app
const app = express()
app.use(bodyParser.json())
// database connections 
connectDB()


// create routes

// create product
app.post("/api/product",async (req,res)=>{
    const data = req.body
    try{
        const product = new Product(data)
        await product.save()
        res.status(201).json(product)
    }catch (err){
        res.status(500).json({"Error": err.message})
    }
})

// Get all products
app.get("/api/product",async (req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json(product)
    }catch (err){
        res.status(500)
    }
})


app.use((req,res)=>{
    res.status(404).send("Page not found")
})


app.listen(5000,()=>{
    console.log("Welcome to Express app ...")
    console.log("Node server listen on http://localhost:5000")
})