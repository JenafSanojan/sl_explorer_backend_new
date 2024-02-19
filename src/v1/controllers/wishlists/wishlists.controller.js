const Wishlist = require("../../models/wishlist/wishlists.model");
class WishlistsController {
  // Create a new wishlist for a user
  createWishlist(req, res) {
    try{
        const newWishlist = new Wishlist({
            userId: req.body.userId
        })
        const wishlist = await Wishlist.create(newWishlist);
        return res.status(201).json({ message: "Wishlist created successfully" });
    }catch(error){
        
    }
}

  // Create a new wishlist item
  createWishlistItem(req, res) {}

  // Update an existing wishlist item
  updateWishlistItem(req, res) {
    // TODO: Implement update wishlist item logic
  }

  // Delete a wishlist item
  deleteWishlistItem(req, res) {
    // TODO: Implement delete wishlist item logic
  }

  // Create a new wishlist for a user
  createWishlist(req, res) {
    // TODO: Implement create wishlist logic
  }

  // Add an item to a user's wishlist
  addWishlistItem(req, res) {
    // TODO: Implement add wishlist item logic
  }

  // Get all wishlists
  getWishlists(req, res) {
    // TODO: Implement get wishlists logic
  }

  // Get a user's wishlist
  getWishlist(req, res) {
    // TODO: Implement get wishlist logic
  }

  // Delete one item from a user's wishlist
  deleteWishlistItem(req, res) {
    // TODO: Implement delete wishlist item logic
  }
}

module.exports = WishlistsController;
