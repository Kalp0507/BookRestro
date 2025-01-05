require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const bookingRoutes = require("./routes/bookings");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);

client.connect().then(console.log('connected'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

// Routes
app.use(bookingRoutes);
app.use(restaurantRoutes);
