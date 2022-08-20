const express = require("express");
const router = express.Router();

// The Product Model
const Product = require("../model/products");

// Endpoints to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).send("Not products found!");
    }

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint to get a specific product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint to add product to the database
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint to update product
router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).send("No product with the id found");
    }

    res.status(201).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Endpoint to delete the product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }

    res.status(200).send(`${product.title} deleted`);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
