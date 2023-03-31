const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      message: 'Get all categories successfully',
      categories
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const getACategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({
      success: true,
      message: "get Category successfully",
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name })
    await newCategory.save();
    res.json({ success: true, message: "Thêm danh mục thành công", category: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const updateCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  try {
    let updatedCategory = {
      name
    }
    updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedCategory, { new: true })
    if (!updatedCategory) {
      res.status(401).json({
        success: false,
        message: "Category not found to update Product",
      });
    }
    res.json({
      success: true,
      message: "Cập nhật danh mục thành công",
      updatedCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      res.status(401).json({
        success: false,
        message: "Product not found to delete Product",
      });
    }
    res.json({
      success: true,
      message: "Xóa danh mục thành công",
      deletedCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = {
  getAllCategories, createNewCategory, updateCategory, deleteCategory, getACategory
}