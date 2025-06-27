const Product = require("../model/productModel");
const Order = require("../model/Order");

exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      address,
      items,
      totalPrice,
      paymentMethod,
    } = req.body;

    const itemsWithSellerId = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found with id: ${item.productId}`);
        }
        if (!product.seller) {
          throw new Error(`SellerId missing for product: ${item.productId}`);
        }
        return {
          ...item,
          sellerId: product.seller,
        };
      })
    );

    const newOrder = new Order({
      customerName,
      phone,
      email,
      address,
      items: itemsWithSellerId,
      totalPrice,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getOrdersBySeller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const orders = await Order.find({ "items.sellerId": sellerId }).populate(
      "items.productId"
    );

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this seller." });
    }

    const filteredOrders = orders.map((order) => {
      const filteredItems = order.items.filter(
        (item) => item.sellerId.toString() === sellerId
      );
      return {
        ...order.toObject(),
        items: filteredItems,
      };
    });

    res.status(200).json(filteredOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
};

