const mongoose = require('mongoose');

const mainCategorySchema = new mongoose.Schema({
    mainCategories: [String]
});

const MainCategoryModel = mongoose.model('MainCategory', mainCategorySchema);

module.exports = MainCategoryModel;
