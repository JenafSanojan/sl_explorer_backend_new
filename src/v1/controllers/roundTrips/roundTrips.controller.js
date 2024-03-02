const RoundTripsModel = require("../../models/roundTrips/roundTrips.mongo");

const createRoundTrip = async (req, res) => {
  try {
    if (
      !req.body.packageName ||
      !req.body.packageShortDescription ||
      !req.body.packageCoverDescription ||
      !req.body.packageCoverImage ||
      !req.body.packageImageLinks ||
      !req.body.packageTitle ||
      !req.body.packageSubTitle ||
      !req.body.packageTotalSeats ||
      !req.body.itenary ||
      !req.body.hotels ||
      !req.body.prices
    ) {
      return res.status(400).send({ message: "Request body is missing!" });
    }

    const newRoundTrip = {
      packageName: req.body.packageName,
      packageShortDescription: req.body.packageShortDescription,
      packageCoverDescription: req.body.packageCoverDescription,
      packageCoverImage: req.body.packageCoverImage,
      packageImageLinks: req.body.packageImageLinks,
      packageTitle: req.body.packageTitle,
      packageSubTitle: req.body.packageSubTitle,
      packageTotalSeats: req.body.packageTotalSeats,
      itenary: req.body.itenary,
      hotels: req.body.hotels,
      prices: req.body.prices,
    };

    const roundTrip = await RoundTripsModel.create(newRoundTrip);
    return res.status(201).send({ status: "success", data: roundTrip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRoundTrip = async (req, res) => {
  try {
    if (
      !req.body.packageName ||
      !req.body.packageShortDescription ||
      !req.body.packageCoverDescription ||
      !req.body.packageCoverImage ||
      !req.body.packageImageLinks ||
      !req.body.packageTitle ||
      !req.body.packageSubTitle ||
      !req.body.packageTotalSeats ||
      !req.body.itenary ||
      !req.body.hotels ||
      !req.body.prices
    ) {
      return res.status(400).send({ message: "Request body is missing!" });
    }

    const newRoundTrip = {
      packageName: req.body.packageName,
      packageShortDescription: req.body.packageShortDescription,
      packageCoverDescription: req.body.packageCoverDescription,
      packageCoverImage: req.body.packageCoverImage,
      packageImageLinks: req.body.packageImageLinks,
      packageTitle: req.body.packageTitle,
      packageSubTitle: req.body.packageSubTitle,
      packageTotalSeats: req.body.packageTotalSeats,
      itenary: req.body.itenary,
      hotels: req.body.hotels,
      prices: req.body.prices,
    };

    const roundTrip = await RoundTripsModel.findByIdAndUpdate(
      req.body.id,
      newRoundTrip
    );
    return res.status(201).send({ status: "success", data: roundTrip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRoundTrip = async (req, res) => {
  try {
    const result = await RoundTripsModel.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" + error });
  }
};

const getRoundTrips = async (req, res) => {
  try {
    const data = await RoundTripsModel.find().populate("hotels.hotel").exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRoundTripPackage = async (req, res) => {
  try {
    const data = await RoundTripsModel.findById(req.params.id)
      .populate("hotels.hotel")
      .exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRoundTrip,
  updateRoundTrip,
  deleteRoundTrip,
  getRoundTrips,
  getRoundTripPackage,
};
