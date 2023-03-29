const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      message: 'Get all Products successfully',
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const getAProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({
      success: true,
      message: "get Product successfully",
      product
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const createNewProduct = async (req, res) => {
  const { name, categoryId, image, price, amount, quantity } = req.body;
  if (!name || !image || !price || !amount || !quantity) {
    return res.status(400).json({
      success: false,
      message: "All field is required",
    });
  }
  try {
    const newProduct = new Product({
      name, categoryId, image, price, amount, quantity
    })
    await newProduct.save();
    res.json({ success: true, message: "Add Product successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const updateProduct = async (req, res) => {
  const { name, image, price, amount, quantity } = req.body;
  if (!name || !image || !price || !amount || !quantity) {
    return res.status(400).json({
      success: false,
      message: "All field is required",
    });
  }
  try {
    let updatedProduct = {
      name, image, price, amount, quantity
    }
    updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
    if (!updatedProduct) {
      res.status(401).json({
        success: false,
        message: "Product not found to update Product",
      });
    }
    res.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(401).json({
        success: false,
        message: "Product not found to delete Product",
      });
    }
    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  getAllProducts, createNewProduct, updateProduct, deleteProduct, getAProduct
}