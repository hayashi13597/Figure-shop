const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  productId: [{
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending',
  },
  paypalPayment: {
    type: Object
  }
}, { timestamps: true })

module.exports = mongoose.model('orders', OrderSchema);