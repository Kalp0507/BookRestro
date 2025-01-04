const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');
const restaurantRoutes = require('./routes/restaurants');

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/BookRestro', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!!"))
    .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

// Use routes
app.use(bookingRoutes);
app.use(restaurantRoutes);

