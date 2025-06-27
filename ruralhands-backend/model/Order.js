const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      quantity: { type: Number, required: true },
      price: Number,
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
      },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
