const OrdersModel = require("../../models/orders/orders.model");

const createOrder = async (req, res) => {
  try {
    //const { customerId, package, orderDate, noOfPeople, option } = req.body;

    // if (!customerId || !package || !tripDate) {
    //   return res.status(400).json({ message: "Required fields are missing" });
    // }

    const newOrder = new OrdersModel({
      customerId: req.body.customerId,
      packageId: {
        roundTrip: req.body.package.roundTrip,
        dayTrip: req.body.package.dayTrip,
      },
      orderDate: req.body.orderDate,
      tripDate: req.body.tripDate, // Assuming 'tripDate' is part of the request body
      noOfPeople: {
        adults: req.body.noOfPeople.adults,
        children: req.body.noOfPeople.children,
      },
      rooms: {
        single: req.body.rooms.single,
        double: req.body.rooms.double,
        triple: req.body.rooms.triple,
        Quadruple: req.body.rooms.Quadruple,
      },
      status: req.body.status,
      price: {
        shownPrice: req.body.price.shownPrice,
        exactPrice: req.body.price.exactPrice,
        discount: req.body.price.discount,
        finalPrice: req.body.price.finalPrice,
      },
      option: req.body.option,
    });

    // Assuming 'option' is part of the request body, and it's an array
    // If 'option' is not an array, modify accordingly

    // const newOrder = new OrdersModel({
    //   customerId: req.body.customerId,
    //   package: req.body.package,
    //   orderDate: req.body.orderDate,
    //   noOfPeople: req.body.noOfPeople,
    //   option: req.body.option,
    // });

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
    const resp = await OrdersModel.find()
      .populate("packageId.roundTrip" || "packageId.dayTrip")
      .exec();
    return res.status(200).json(resp);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ message: "Internal server error: " + error });
  }
};

const getOrderByCustomerId = async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      customerId: req.params.customerId,
    })
      .populate("packageId.roundTrip" || "packageId.dayTrip")
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
  getOrders,
  getOrderByCustomerId,
};
