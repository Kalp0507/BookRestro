require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');
const restaurantRoutes = require('./routes/restaurants');

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI)
// Connect to MongoDB
mongoose.connect(`${mongoURI}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    socketTimeoutMS: 60000,  // Increase timeout to 30 seconds
    serverSelectionTimeoutMS: 30000  // Increase timeout for server selection
})
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

