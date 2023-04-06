const express = require("express");
const orderController = require("../controller/orderController");

let router = express.Router();

const productApi = (app) => {
  router.get('/', orderController.getAllOrders);
  router.post('/', orderController.createOrder);
  router.put('/:id', orderController.updateOrder);
  router.delete('/:id', orderController.deleteOrder);
  router.get('/:id', orderController.getOrder)

  return app.use('/api/orders/', router)
}
module.exports = productApi;