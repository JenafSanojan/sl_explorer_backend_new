const { response } = require("express");
const Wishlist = require("../../models/wishlist/wishlists.model");

//wishlist controller
// user id, [packageId]

//Local function for wishlist creation
const createWishlistLocalFunc = async (req, res) => {
  try {
    const newWishlist = new Wishlist({
      userId: req.body.userId,
    });
    const wishlist = await Wishlist.create(newWishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Create a new wishlist for a user
const createWishlist = async (req, res) => {
  try {
    await createWishlistLocalFunc(req, res);
    return res.status(201).json({ message: "Wishlist created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Add an item to a user's wishlist
const addWishlistItem = async (req, res) => {
  try {
    let existingWishlist = await Wishlist.findOne({
      userId: req.body.userId,
    });

    if (!existingWishlist) {
      await createWishlistLocalFunc(req, res);
      existingWishlist = await Wishlist.findOne({
        userId: req.body.userId,
      });
    }

    existingWishlist.wishes.push(req.body.packageId);
    await existingWishlist.save();

    return res
      .status(201)
      .json({ message: "Wishlist item added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//delete a wish for a user
const deleteWishlistItem = async (req, res) => {
  try {
    existingWishlist = await Wishlist.findOne({
      userId: req.body.userId,
    });

    if (!existingWishlist) {
      await createWishlistLocalFunc(req, res);
      existingWishlist = await Wishlist.findOne({
        userId: req.body.userId,
      });
    }

    existingWishlist.wishes = existingWishlist.wishes.filter(
      (wish) => wish != req.body.packageId
    );
    await existingWishlist.save();

    return res
      .status(201)
      .json({ message: "Wishlist item deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

//toggle wishlist item for a user
const toggleWishlistItem = async (req, res) => {
  try {
    existingWishlist = await Wishlist.findOne({
      userId: req.body.userId,
    });
    if (existingWishlist) {
      if (existingWishlist.wishes.includes(req.body.packageId)) {
        await deleteWishlistItem(req, res);
      } else {
        await addWishlistItem(req, res);
      }
    } else {
      await addWishlistItem(req, res);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

//get wishlist for a user
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

//get all wishlist for all users
const getWishlists = async (req, res) => {
  try {
    const response = await Wishlist.find();
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createWishlist,
  addWishlistItem,
  deleteWishlistItem,
  toggleWishlistItem,
  getWishlists,
  getWishlist,
};
