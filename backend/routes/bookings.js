// routes/bookings.js
const express = require('express');
const Booking = require('../models/Bookings');
const router = express.Router();

// Create a booking
router.post('/api/bookings', async (req, res) => {
    const { name, contact, date, time, guests, restaurantName } = req.body;

    try {
        const booking = new Booking({ name, contact, date, time, guests, restaurantName });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
});

// Get All Bookings for a Specific name
router.get('/api/bookings', async (req, res) => {
    const { name } = req.query; // Get the 'name' from query params

    if (!name) {
        return res.status(400).json({ message: 'Name is required to fetch bookings' });
    }

    try {
        // Find all bookings that match the name
        const bookings = await Booking.find({ name });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the provided name' });
        }

        res.json(bookings); // Return the found bookings
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

module.exports = router;