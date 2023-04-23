//item model using mongoose and mongoDB

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);