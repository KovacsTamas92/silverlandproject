const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    tracking_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipc_ode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const AdminModel = mongoose.model('users', dataSchema);

module.exports = AdminModel;
