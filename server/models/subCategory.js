const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    mainCategories: {
        type: Map, 
        of: [String]  
    }
});

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategoryModel;
