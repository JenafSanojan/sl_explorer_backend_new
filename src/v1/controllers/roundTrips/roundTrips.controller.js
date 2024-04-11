const RoundTripsModel = require("../../models/roundTrips/roundTrips.mongo");
const admin = require("firebase-admin");

const deleteImage = async (deleteUrl) => {
  try {
    const bucket = admin.storage().bucket();
    const path = decodeURIComponent(deleteUrl.split("o/")[1].split("?")[0]);
    await bucket.file(path).delete();
  } catch (e) {
    console.log(e.message);
  }
};

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

    const estimatedCount = await RoundTripsModel.estimatedDocumentCount();

    console.log("current roundtrips count: " + estimatedCount);

    const newRoundTrip = {
      order: estimatedCount + 1,
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

const moveUp = async (req, res) => {
  //id, order required
  try {
    // retriving the roundTrip
    const roundTrip = await RoundTripsModel.findOne({ order: req.body.order });

    // verifying if the order is unique
    if (roundTrip._id != req.params.id)
      return res
        .status(500)
        .send({ message: "Something went wrong, refresh..!" });

    // retriving needed detaiils
    const estimatedCount = await RoundTripsModel.estimatedDocumentCount();
    if (req.body.order == estimatedCount)
      return res.status(200).json({ message: "Already at the top" });

    // moving the order
    if (req.body.order < estimatedCount && req.body.order > 0) {
      // down
      await RoundTripsModel.updateOne(
        { order: req.body.order + 1 },
        { $inc: { order: -1 } }
      );
      // up
      await RoundTripsModel.updateOne(
        { _id: req.params.id },
        { $inc: { order: 1 } }
      );
    }

    return res.status(200).json({ message: "Moved Up successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const moveDown = async (req, res) => {
  //id, order required
  try {
    // retriving the roundTrip
    const roundTrip = await RoundTripsModel.findOne({ order: req.body.order });

    // verifying if the order is unique
    if (roundTrip._id != req.params.id)
      return res
        .status(500)
        .send({ message: "Something went wrong, refresh..!" });

    // retriving needed detaiils
    const estimatedCount = await RoundTripsModel.estimatedDocumentCount();
    if (req.body.order == 1)
      return res.status(200).json({ message: "Already at the bottom" });

    // moving the order
    if (req.body.order <= estimatedCount && req.body.order > 1) {
      // up
      await RoundTripsModel.updateOne(
        { order: req.body.order - 1 },
        { $inc: { order: 1 } }
      );
      // down
      await RoundTripsModel.updateOne(
        { _id: req.params.id },
        { $inc: { order: -1 } }
      );
    }

    return res.status(200).json({ message: "Moved Down successfully" });
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

    // const newRoundTrip = {
    //   packageName: req.body.packageName,
    //   packageShortDescription: req.body.packageShortDescription,
    //   packageCoverDescription: req.body.packageCoverDescription,
    //   packageCoverImage: req.body.packageCoverImage,
    //   packageImageLinks: req.body.packageImageLinks,
    //   packageTitle: req.body.packageTitle,
    //   packageSubTitle: req.body.packageSubTitle,
    //   packageTotalSeats: req.body.packageTotalSeats,
    //   itenary: req.body.itenary,
    //   hotels: req.body.hotels,
    //   prices: req.body.prices,
    // };

    // let existingRoundTrip = await RoundTripsModel.findById(req.params.id);

    // if (existingRoundTrip) {
    //   if (existingRoundTrip.packageCoverImage != req.body.packageCoverImage) {
    //     await deleteImage(existingRoundTrip.packageCoverImage);
    //   }
    //   for (
    //     let index = 0;
    //     index < existingRoundTrip.packageImageLinks.length &&
    //     index < req.body.packageImageLinks.length;
    //     index++
    //   ) {
    //     if (
    //       existingRoundTrip.packageImageLinks[index] !=
    //       req.body.packageImageLinks[index]
    //     ) {
    //       await deleteImage(existingRoundTrip.packageImageLinks[index]);
    //     }
    //   }
    // }

    const roundTrip = await RoundTripsModel.findByIdAndUpdate(req.body.id, {
      $set: {
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
      },
    });
    return res.status(201).send({ status: "success", data: roundTrip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRoundTrip = async (req, res) => {
  try {
    let existingRoundTrip = await RoundTripsModel.findById(req.params.id);

    if (existingRoundTrip) {
      //deleting images
      await deleteImage(existingRoundTrip.packageCoverImage);
      await Promise.all(
        existingRoundTrip.packageImageLinks.map(async (element) => {
          await deleteImage(element);
        })
      );
      //updating order
      await RoundTripsModel.updateMany(
        { order: { $gt: existingRoundTrip.order } },
        { $inc: { order: -1 } }
      );
      //deleting package
      await RoundTripsModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Document deleted successfully" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error, " + error });
  }
};

const getRoundTrips = async (req, res) => {
  try {
    const data = await RoundTripsModel.find()
      .sort({ order: -1 })
      .populate("hotels.hotel")
      .exec();
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
  moveUp,
  moveDown,
  updateRoundTrip,
  deleteRoundTrip,
  getRoundTrips,
  getRoundTripPackage,
};
