const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type : String, required : true },
  quantity: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
