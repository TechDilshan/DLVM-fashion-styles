const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const deliverySchema = new Schema({
    deliveryId: Number,
    deliveryName: String,
    deliveryAddress: String,
    zipCode: String,
    deliveryPhone: String,
    deliveryEmail: String,
});

const Delivery = mongoose.model('Delivery',deliverySchema);

module.exports = Delivery;