require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./routes/bookings");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit the server if connection fails
    });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

// Routes
app.use(bookingRoutes);
app.use(restaurantRoutes);
