const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
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
    }
});

const AdminModel = mongoose.model('admin_users', dataSchema);

module.exports = AdminModel;
