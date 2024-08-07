const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^data:[a-z]+\/[a-z]+;base64,/.test(v);
            },
            message: 'A fájl nem base64 kódolt.'
        }
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maincategory: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    type_of_paid: {
        type: String,
        required: true
    },
    type_of_delivery: {
        type: String,
        required: true
    },
    date_of_publication: {
        type: Date,
        required: true
    },
    date_of_upload: {
        type: Date,
        required: true
    },
    number_of_items: {
        type: Number,
        required: true
    },
});

const DataModel = mongoose.model('datas', dataSchema);

module.exports = DataModel;
