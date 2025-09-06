const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    pname:String,
    description:String,
    price:Number,
    quantity:Number,
})

module.exports = mongoose.model("Product",ProductSchema)