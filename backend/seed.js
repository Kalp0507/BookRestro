require("dotenv").config();
const { default: mongoose } = require("mongoose");
const Restaurant = require('./models/Restaurant');

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI)
mongoose.connect(`${mongoURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Mock restaurant data
const mockData = [
    {
        "name": "La Pizzeria",
        "location": "Downtown",
        "closedDays": [
            "Monday"
        ],
        "tables": [
            {
                "time": "12:00 PM",
                "availability": true
            },
            {
                "time": "1:00 PM",
                "availability": false
            },
            {
                "time": "2:00 PM",
                "availability": true
            }
        ]
    },
    {
        "name": "Sushi House",
        "location": "Uptown",
        "closedDays": [
            "Tuesday"
        ],
        "tables": [
            {
                "time": "6:00 PM",
                "availability": true
            },
            {
                "time": "7:00 PM",
                "availability": true
            },
            {
                "time": "8:00 PM",
                "availability": false
            }
        ]
    },
    {
        "name": "The Steakhouse",
        "location": "City Center",
        "closedDays": [
            "Sunday"
        ],
        "tables": [
            {
                "time": "5:00 PM",
                "availability": true
            },
            {
                "time": "6:00 PM",
                "availability": false
            },
            {
                "time": "7:00 PM",
                "availability": true
            }
        ]
    },
    {
        "name": "Veggie Delight",
        "location": "Old Town",
        "closedDays": [
            "Wednesday"
        ],
        "tables": [
            {
                "time": "12:30 PM",
                "availability": true
            },
            {
                "time": "1:30 PM",
                "availability": true
            },
            {
                "time": "2:30 PM",
                "availability": false
            }
        ]
    },
    {
        "name": "Indian Spice",
        "location": "West End",
        "closedDays": [
            "Monday",
            "Friday"
        ],
        "tables": [
            {
                "time": "1:00 PM",
                "availability": true
            },
            {
                "time": "2:00 PM",
                "availability": true
            },
            {
                "time": "3:00 PM",
                "availability": false
            }
        ]
    },
    {
        "name": "Burger Haven",
        "location": "East Side",
        "closedDays": [],
        "tables": [
            {
                "time": "11:00 AM",
                "availability": true
            },
            {
                "time": "12:00 PM",
                "availability": true
            },
            {
                "time": "1:00 PM",
                "availability": false
            }
        ]
    },
    {
        "name": "Seafood Bay",
        "location": "Seaside",
        "closedDays": [
            "Thursday"
        ],
        "tables": [
            {
                "time": "5:30 PM",
                "availability": true
            },
            {
                "time": "6:30 PM",
                "availability": true
            },
            {
                "time": "7:30 PM",
                "availability": false
            }
        ]
    },
    {
        "name": "French Bistro",
        "location": "Downtown",
        "closedDays": [
            "Sunday"
        ],
        "tables": [
            {
                "time": "1:00 PM",
                "availability": true
            },
            {
                "time": "2:00 PM",
                "availability": true
            },
            {
                "time": "3:00 PM",
                "availability": false
            }
        ]
    },
    {
        "name": "Mexican Fiesta",
        "location": "South End",
        "closedDays": [
            "Wednesday"
        ],
        "tables": [
            {
                "time": "6:00 PM",
                "availability": true
            },
            {
                "time": "7:00 PM",
                "availability": false
            },
            {
                "time": "8:00 PM",
                "availability": true
            }
        ]
    },
    {
        "name": "Cafe Corner",
        "location": "North Side",
        "closedDays": [
            "Saturday"
        ],
        "tables": [
            {
                "time": "9:00 AM",
                "availability": true
            },
            {
                "time": "10:00 AM",
                "availability": false
            },
            {
                "time": "11:00 AM",
                "availability": true
            }
        ]
    }
];

const seedData = async () => {
    try {
        await Restaurant.deleteMany({}); 
        await Restaurant.insertMany(mockData); 
        console.log('Mock data seeded successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
