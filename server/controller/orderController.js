const Order = require('../models/Order');
const User = require('../models/User');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const newOrder = await new Order({
        userId: req.body.userId,
        productId: req.body.productId,
        paypalPayment: req.body.paypalPayment,
      });
      const order = await newOrder.save();
      res.status(200).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate('userId', 'email')
        .populate({
          path: 'productId',
          select: 'name'
        })
      res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getOrder: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const order = await Order.find({
        userId: {
          _id: user._id
        }
      }).populate('productId');
      res.status(200).json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Order has been deleted...');
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Order has been updated...');
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = orderController;