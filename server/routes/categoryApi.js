const express = require("express");
const categoryController = require("../controller/categoryController");

let router = express.Router();

const productApi = (app) => {
  router.get('/', categoryController.getAllCategories);
  router.post('/', categoryController.createNewCategory);
  router.put('/:id', categoryController.updateCategory);
  router.delete('/:id', categoryController.deleteCategory);
  router.get('/:id', categoryController.getACategory)

  return app.use('/api/categories/', router)
}
module.exports = productApi;