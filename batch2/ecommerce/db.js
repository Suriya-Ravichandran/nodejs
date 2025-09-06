const mongoose = require("mongoose")

const connectDB= async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/ecommerceapp")
        console.log("Mongodb database connected")
    }catch (err){
        console.log("Mongodb database connection failed:",err.message)
        process.exit(1)
    }
}

module.exports = connectDB