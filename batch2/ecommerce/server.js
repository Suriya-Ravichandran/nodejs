// import project lib
const express = require('express')
const bodyparser=require('body-parser')
const connectDB = require('./db')
const Product = require('./models/Product')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const auth = require('./middleware/auth')
// database connectivity
connectDB()
// creating express app
const app = express()
app.use(bodyparser.json())

// create url routes

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            "dfhsdfadnsdfyhasf348", // Replace with your real secret key
            { expiresIn: "1h" }
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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
app.get("/api/product",auth,async (req,res)=>{
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
