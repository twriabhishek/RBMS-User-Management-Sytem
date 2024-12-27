const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: { type: String, required: [true, "Please Enter Description"] },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price can't exceed 8 characters"],
  },
  category: { type: String, required: [true, "Please Enter Product Category"] },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
