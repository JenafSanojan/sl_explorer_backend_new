const DayTripsModel = require("../../models/dayTrips/dayTrip.model");
const CategoryModel = require("../../models/dayTrips/category.model");

const createDayTrip = async (req, res) => {
  try {
    if (
      !req.body.packageCategoryName ||
      !req.body.packageCategoryImage ||
      !req.body.packageDays ||
      !req.body.packageName ||
      !req.body.packageShortDescription ||
      !req.body.packageCoverDescription ||
      !req.body.packageCoverImage ||
      !req.body.packageImageLinks ||
      !req.body.packageTitle ||
      !req.body.packageSubTitle ||
      !req.body.locations ||
      !req.body.hotels ||
      !req.body.services ||
      !req.body.price
    ) {
      return res.status(400).send({ message: "Request body is missing!" });
    }

    const existingCategory = await CategoryModel.findOne({
      categoryName: req.body.packageCategoryName,
    });

    if (!existingCategory) {
      await CategoryModel.create({
        categoryName: req.body.packageCategoryName,
        categoryImage: req.body.packageCategoryImage,
      });
    }

    const newDayTrip = {
      packageCategoryName: req.body.packageCategoryName,
      packageCategoryImage: req.body.packageCategoryImage,
      packageDays: req.body.packageDays,
      packageName: req.body.packageName,
      packageShortDescription: req.body.packageShortDescription,
      packageCoverDescription: req.body.packageCoverDescription,
      packageCoverImage: req.body.packageCoverImage,
      packageImageLinks: req.body.packageImageLinks,
      packageTitle: req.body.packageTitle,
      packageSubTitle: req.body.packageSubTitle,
      locations: req.body.locations,
      hotels: req.body.hotels,
      services: req.body.services,
      price: req.body.price,
    };

    const dayTrip = await DayTripsModel.create(newDayTrip);
    return res.status(201).send({ status: "success", data: dayTrip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDayTrips = async (req, res) => {
  try {
    const data = await DayTripsModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDayTripById = async (req, res) => {
  try {
    const data = await DayTripsModel.findById(req.params.packageId);
    if (!data) {
      return res.status(404).json({ message: "Day trip not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

const updateDayTrip = async (req, res) => {
  try {
    const newDayTrip = {
      packageCategoryName: req.body.packageCategoryName,
      packageCategoryImage: req.body.packageCategoryImage,
      packageDays: req.body.packageDays,
      packageName: req.body.packageName,
      packageShortDescription: req.body.packageShortDescription,
      packageCoverDescription: req.body.packageCoverDescription,
      packageCoverImage: req.body.packageCoverImage,
      packageImageLinks: req.body.packageImageLinks,
      packageTitle: req.body.packageTitle,
      packageSubTitle: req.body.packageSubTitle,
      locations: req.body.locations,
      hotels: req.body.hotels,
      services: req.body.services,
      price: req.body.price,
    };

    const dayTrip = await DayTripsModel.findByIdAndUpdate(
      req.params.id,
      newDayTrip
    );
    return res.status(201).send({ status: "success", data: dayTrip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDayTrip = async (req, res) => {
  try {
    const result = await DayTripsModel.deleteOne({ _id: req.params.id });

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

const getDayTripsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const dayTrips = await DayTripsModel.find({
      packageCategoryName: category,
    });
    res.json(dayTrips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDayTripsByPackageDays = async (req, res) => {
  try {
    const data = await DayTripsModel.find({
      packageDays: req.params.packageDays,
    });

    if (!data) {
      return res.status(404).json({ message: "Day trips not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

const getDayTripsByCategoryAndDuration = async (req, res) => {
  try {
    const { category, duration } = req.params;
    const dayTrips = await DayTripsModel.find({
      packageCategoryName: category,
      packageDays: duration,
    });

    if (!dayTrips) {
      return res.status(404).json({ message: "Day trips not found" });
    }

    res.status(200).json(dayTrips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" + error });
  }
};

module.exports = {
  createDayTrip,
  getDayTrips,
  getDayTripById,
  updateDayTrip,
  deleteDayTrip,
  getDayTripsByCategory,
  getDayTripsByPackageDays,
  getDayTripsByCategoryAndDuration,
};
