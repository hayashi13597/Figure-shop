const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Products', ProductSchema);