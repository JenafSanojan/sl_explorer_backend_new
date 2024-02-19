const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  wishes: {
    type: [
      {
        packageType: {
          type: String,
          required: true,
        },
        packageID: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
