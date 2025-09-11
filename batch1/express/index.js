const express = require("express")
const connectDB = require("./db")
const User = require("./models/User")
const Product = require("./models/Product")
const bodyParser=require("body-parser")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

// create express app
const app = express()
app.use(bodyParser.json())
// database connections 
connectDB()


// create routes

app.post("/api/signin",async (req,res)=>{
    try{
        const {name,email,password}=req.body

        const existingUser= await User.findOne({email})
        if (existingUser){
            return res.status(400).json({error: "User already exists"})
        }

        const hashedpassword= await bcrypt.hash(password,10)

        const user = new User({
            name,email,password:hashedpassword
        })

        await user.save()
        res.status(201).json({message: "user register successfully"})

    }catch (err){
         res.status(500).json({Error: err.message})
    }
})


app.post("/api/login",async(req,res)=>{
    try{
        const {email,password}=req.body

        const user= await User.findOne({email})
        if (!user){
            return res.status(400).json({error: "Invaild email"})
        }

        const isMatch= bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({error: "Invaild password"})
        }

        const token=jwt.sign(
            {id: user._id,email: user.email},
            "ydfhdsjfjksdhfsdf",
            {expiresIn: "1h"}
        );
        res.status(200).json({message: "Login successfull",token})

    }catch (err){
         res.status(500).json({Error: err.message})
    }
    

})


// create product
app.post("/api/product",async (req,res)=>{
    const data = req.body
    try{
        const product = new Product(data)
        await product.save()
        res.status(201).json(product)
    }catch (err){
        res.status(500).json({Error: err.message})
    }
})

// Get all products
app.get("/api/product",auth,async (req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json(product)
    }catch (err){
       res.status(500).json({Error:err.message})
    }
})


// single products
app.get("/api/product/:id",async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            res.status(404).json({Error:"product not found"})
        }
        res.status(200).json(product)
    }catch (err){
       res.status(500).json({Error:err.message})
    }
})


// update product

app.put("/api/product/:id",async (req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!product){
            res.status(404).json({Error:"product not found"})
        }
        res.status(200).json(product)
    }catch (err){
        res.status(500).json({Error:err.message})
    }
})

app.delete("/api/product/:id",async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404).json({Error:"product not found"})
        }
        res.status(200).json({message:"Product deleted success "+req.params.id})
    }catch (err){
        res.status(500).json({Error:err.message})
    }
})



app.use((req,res)=>{
    res.status(404).send("Page not found")
})


app.listen(5000,()=>{
    console.log("Welcome to Express app ...")
    console.log("Node server listen on http://localhost:5000")
})