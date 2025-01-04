const mongoose = require('mongoose');

// Define the schema for table slots
const tableSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
});

// Define the schema for restaurants
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    closedDays: {
        type: [String], // Array of days the restaurant is closed
        default: []     // Default is no closed days
    },
    tables: [tableSchema]  // Array of tables with time slots and availability
});

// Create the Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
