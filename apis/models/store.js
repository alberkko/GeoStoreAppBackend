const mongoose = require('mongoose');

//model class for db

const storeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Store', storeSchema);