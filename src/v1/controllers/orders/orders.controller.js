const OrdersModel = require("../../models/orders.model");

const createOrder = async (req, res) => {
  try {
    const { customerId, package, orderDate, noOfPeople, option } = req.body;

    if (!customerId || !package || !orderDate) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newOrder = new OrdersModel({
      customerId: req.body.customerId,
      package: req.body.package,
      orderDate: req.body.orderDate,
      noOfPeople: req.body.noOfPeople,
      option: req.body.option,
    });

    const order = await OrdersModel.create(newOrder);

    // Send success response
    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find()
      .populate("package.roundTrip")
      .exec();
    return res.status(200).json(orders);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
