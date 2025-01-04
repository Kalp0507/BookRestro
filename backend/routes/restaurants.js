// routes/restaurants.js
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();


// Get available restaurants for a specific date
router.get('/api/restaurants', async (req, res) => {
    const { date } = req.query;

    try {
        const restaurants = await Restaurant.find();
        const availableRestaurants = restaurants.filter(restaurant => {
            const isClosedOnDay = restaurant.closedDays.includes(getDayOfWeek(date));
            return !isClosedOnDay;
        });

        res.json(availableRestaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error });
    }
});

router.get('/api/restaurant/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurant', error });
    }
});

const getDayOfWeek = (date) => {
    const day = new Date(date).getDay(); // Get day of the week (0-6)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
};

module.exports = router;
