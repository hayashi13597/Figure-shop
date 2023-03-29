const express = require("express");
const productController = require("../controller/productController");

let router = express.Router();

const productApi = (app) => {
  router.get('/', productController.getAllProducts);
  router.post('/', productController.createNewProduct);
  router.put('/:id', productController.updateProduct);
  router.delete('/:id', productController.deleteProduct);
  router.get('/:id', productController.getAProduct)

  return app.use('/api/products/', router)
}
module.exports = productApi;