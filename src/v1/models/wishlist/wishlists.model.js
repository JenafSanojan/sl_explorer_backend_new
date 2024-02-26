const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  wishes: {
    type: [
      {
        type: String,
      },
    ],
    default: [],
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
