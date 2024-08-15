const mongoose = require('mongoose');

const mainCategorySchema = new mongoose.Schema({
    mainCategories: {
        type: Map, // Map használata a dinamikus kulcsokhoz
        of: String
    }
});

const MainCategoryModel = mongoose.model('MainCategory', mainCategorySchema);

module.exports = MainCategoryModel;
