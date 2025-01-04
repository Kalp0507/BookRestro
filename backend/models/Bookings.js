const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    contact: String,
    date: String,
    time: String,
    guests: Number,
    restaurantName: String
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
