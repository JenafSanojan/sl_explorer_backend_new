const Wishlist = require("../../models/wishlist/wishlists.model");

// Create a new wishlist for a user
const createWishlist = async (req, res) => {
  try {
    const newWishlist = new Wishlist({
      userId: req.body.userId,
    });
    const wishlist = await Wishlist.create(newWishlist);
    return res.status(201).json({ message: "Wishlist created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Add an item to a user's wishlist
const addWishlistItem = async (req, res) => {
  try {
    existingWishlist = await Wishlist.findOne({
      userId: req.body.userId,
    });
    if (existingWishlist) {
      existingWishlist.wishes.push({
        packageType: req.body.packageType,
        packageId: req.body.packageId,
      });
      await existingWishlist.save();
    } else {
      const newWishlist = new Wishlist({
        userId: req.body.userId,
      });
      newWishlist.wishes.push({
        packageType: req.body.packageType,
        packageId: req.body.packageId,
      });
      const wishlist = await Wishlist.create(newWishlist);
    }
    return res
      .status(201)
      .json({ message: "Wishlist item added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//delete wish
//delete using pack id or wish id ??
const deleteWishlistItem = async (req, res) => {
  try {
    existingWishlist = await Wishlist.findOne({
      userId: req.body.userId,
    });

    if (existingWishlist) {
      existingWishlist.wishes = existingWishlist.wishes.filter(
        (wish) => wish.packageId != req.body.packageId
      );

      await existingWishlist.save();

      return res
        .status(201)
        .json({ message: "Wishlist item deleted successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "No wishlist found for the user" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

//get all wishes
const getWishlists = async (req, res) => {
  try {
    const response = await Wishlist.find();

    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const resp = await Wishlist.findOne({
      userId: req.params.userId,
    });

    return res.status(200).json(resp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createWishlist,
  addWishlistItem,
  deleteWishlistItem,
  getWishlists,
  getWishlist,
};
