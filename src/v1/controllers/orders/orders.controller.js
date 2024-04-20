const Order = require("../../models/orders/orders.model");

const createOrder = async (req, res) => {
  try {
    //const { customerId, package, orderDate, noOfPeople, option } = req.body;

    // if (!customerId || !package || !tripDate) {
    //   return res.status(400).json({ message: "Required fields are missing" });
    // }

    const newOrder = new Order({
      customerId: req.body.customerId,
      packageId: {
        roundTrip: req.body.packageId.roundTrip,
        dayTrip: req.body.packageId.dayTrip,
      },
      orderDate: req.body.orderDate, //order date is date when the order is placed
      tripDate: req.body.tripDate, //trip date is the date of the trip
      noOfPeople: {
        adults: req.body.noOfPeople.adults,
        children: req.body.noOfPeople.children,
      },
      pickUpLocation: req.body.pickUpLocation,
      clientRequests: req.body.clientRequests,
      rooms: {
        single: req.body.rooms.single,
        double: req.body.rooms.double,
        triple: req.body.rooms.triple,
        Quadruple: req.body.rooms.Quadruple,
      },
      status: req.body.status,
      userDeviceToken: req.body.userDeviceToken,
      price: {
        shownPrice: req.body.price.shownPrice,
        exactPrice: req.body.price.exactPrice,
        discount: req.body.price.discount,
        finalPrice: req.body.price.finalPrice,
      },
      advance: {
        amount: req.body.advance.amount,
        reference: req.body.advance.reference,
        isPaid: req.body.advance.isPaid,
      },
      paymentComments: req.body.paymentComments,
      option: {
        name: req.body.option.name,
        amount: req.body.option.amount,
      },
    });

    const order = await Order.create(newOrder);

    // Send success response
    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    // const orderId = req.body.orderId;

    // if (!orderId) {
    //   return res.status(400).json({
    //     message: "orderId is required for updating the reference.",
    //   });
    // }

    existingOrder = await Order.findById(req.body.orderId);

    // Checking if the document exists
    // if (!existingOrder) {
    //   return res
    //     .status(404)
    //     .json({ message: "Order not found for the specified customer ID." });
    // }

    // Updating only the "reference" field
    existingOrder.status = req.body.status || existingOrder.status;

    // Saving the updated document
    await existingOrder.save();

    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { finalPrice, advancePrice, discount } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.price.finalPrice = finalPrice;
    order.advance.amount = advancePrice;
    order.price.discount = discount;

    await order.save();

    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (e) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const resp = await Order.find()
      .populate("packageId.roundTrip")
      .populate("packageId.dayTrip") 
      .exec();
    return res.status(200).json(resp);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ message: "Internal server error: " + error });
  }
};

const getOrderByCustomerId = async (req, res) => {
  try {
    const orders = await Order.find({
      customerId: req.params.customerId,
    })
      .populate("packageId.roundTrip")
      //.populate("packageId.dayTrip")
      .exec(); //one customer can have multiple orders

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    //console.log("orders");
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

module.exports = {
  createOrder,
  updateStatus,
  getOrders,
  getOrderByCustomerId,
  updateOrder,
};
