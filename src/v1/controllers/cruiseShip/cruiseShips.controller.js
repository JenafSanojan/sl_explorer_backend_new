const cruiseShipsModel = require("../../models/cruiseShips/cruiseShip.model");

const createCruiseShip = async (req, res) => {
  try {
    if (
    
        !req.body.cruiseShipName ||
        !req.body.cruiseShipDescription ||
        !req.body.cruiseShipCoverImage ||
        !req.body.cruiseShipImageLinks ||
        !req.body.cruiseArrivalDay ||
        !req.body.packageDays ||
        !req.body.packageName ||
        !req.body.packageShortDescription ||
        !req.body.packageStepsDescription ||
        !req.body.packageCoverImage ||
        !req.body.packageImageLinks ||
        !req.body.packageTitle ||
        !req.body.adultPrice ||
        !req.body.childPrice ||
        !req.body.hotels

    ) {
      return res.status(400).send({ message: "Request body is missing!" });
    }

    const newCruiseShip = {
        cruiseShipName: req.body.cruiseShipName,
        cruiseShipDescription: req.body.cruiseShipDescription,
        cruiseShipCoverImage: req.body.cruiseShipCoverImage,
        cruiseShipImageLinks: req.body.cruiseShipImageLinks,
        cruiseArrivalDay: req.body.cruiseArrivalDay,
        packageDays: req.body.packageDays,
        packageName: req.body.packageName,
        packageShortDescription: req.body.packageShortDescription,
        packageStepsDescription: req.body.packageStepsDescription,
        packageCoverImage: req.body.packageCoverImage,
        packageImageLinks: req.body.packageImageLinks,
        packageTitle: req.body.packageTitle,
        adultPrice: req.body.adultPrice,
        childPrice: req.body.childPrice,
        hotels: req.body.hotels,
      };

    const cruiseShip = await cruiseShipsModel.create(newCruiseShip);
    return res.status(201).send({ status: "success", data: cruiseShip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCruiseShip = async (req, res) => {
  try {
    const data = await cruiseShipsModel.find().populate("hotels.hotel").exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCruiseShipPackage = async (req, res) => {
  try {
    const data = await cruiseShipsModel.findById(req.params.id)
      .populate("hotels.hotel")
      .exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCruiseShip,
  getCruiseShip,
  getCruiseShipPackage,
};
