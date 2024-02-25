const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryImage: { type: String}
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
