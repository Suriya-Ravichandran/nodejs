const mongoose = require("mongoose")

const connectDB= async ()=>{
    try{
        await mongoose.connect("mongodb://mongo:27017/ecommerce")
        console.log("Mongodb database connected")
    }catch (err){
        console.log("Mongodb database connection failed:",err.message)
        process.exit(1)
    }
}

module.exports = connectDB