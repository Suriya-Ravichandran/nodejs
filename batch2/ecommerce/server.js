// import project lib
const express = require('express')
const bodyparser=require('body-parser')
const connectDB = require('./db')
const Product = require('./models/Product')


// database connectivity
connectDB()
// creating express app
const app = express()
app.use(bodyparser.json())

// create url routes

// create products
app.post("/api/product",async (req,res)=>{
    try{
        const data= req.body
        const product = new Product(data)
        await product.save()
        res.status(201).json(product)
    }catch (err){
        res.status(500).json({error:err.message})
    }
})

//  get all products
app.get("/api/product",async (req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

// get a single product
app.get("/api/product/:id",async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        console.log(req.params.id)
        if (!product){
             res.status(404).json({error:"Product Not Found"})
        }
        res.status(200).json(product);
    }catch(err){
         res.status(404).json({error:"Product Not Found"})
    }
})


// update product

app.put("/api/product/:id",async(req,res)=>{
    try{
        const product =await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})

        if (!product){
            res.status(404).json({error:"Product Not Found"})
        }
         res.status(201).json(product);
    }catch (err){
        res.status(500).json({error:err.message})
    }
})


app.delete("/api/product/:id",async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product){
            res.status(404).json({error:"Product Not Found"})
        }
        res.status(201).json({message: "product delete successfully"});
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


app.use((req,res)=>{
    res.status(404).send("Page Not found")
})

// create a server
app.listen(5000,()=>{
    console.log("Welcome To Ecommerce RestAPI v1.0.0")
    console.log("Your Server listing on http://localhost:5000")
})
