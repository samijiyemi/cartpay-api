const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  title: {
    type: String,
    trim: true,
    required: [true, "product title required"],
    unique: true,
  },
  description: {
    type: String,
    required: true,
    max: 200,
  },
  category: {
    type: String,
    required: true,
    default: "uncategorized",
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = Product;
