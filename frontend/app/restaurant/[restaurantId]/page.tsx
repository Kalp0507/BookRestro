"use client"; // Mark this component as client-side
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  // Import useParams to get dynamic route parameters

interface Table {
    time: string;  // Time is in either 12-hour or 24-hour format
    availability: boolean;
    _id: string;
}

interface Restaurant {
    _id: string;
    name: string;
    location: string;
    closedDays: string[];
    tables: Table[];
}

export default function RestaurantDetail() {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const searchParams = useSearchParams();
    const { restaurantId } = useParams();  // Get the dynamic `restaurantId` from the route params
    const dataParam = searchParams.get('formData');
    const formData = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    const date = formData ? formData.date : null; 
    const selectedTime = formData ? formData.time : null;
    const serializedFormData = encodeURIComponent(JSON.stringify(formData));
    const api = process.env.NEXT_PUBLIC_BACKEND_API

    function convertTo24Hour(time: string): string {
        const [hourMin, modifier] = time.split(' ');
        const [hours, minutes] = hourMin.split(':');
    
        // Convert hours to number for calculation
        let hoursNum = parseInt(hours, 10);  // Using parseInt to convert to number
    
        // Handle PM and AM conversion
        if (modifier === 'PM' && hoursNum !== 12) {
            hoursNum += 12;  // Convert PM hours to 24-hour format (except 12 PM)
        } else if (modifier === 'AM' && hoursNum === 12) {
            hoursNum = 0;  // Convert 12 AM to 0 (midnight)
        }
    
        // Return the time in 24-hour format as a string, ensuring two digits for hours
        return `${hoursNum.toString().padStart(2, '0')}:${minutes}`;
    }
    
    

    // Use effect to fetch the restaurant data once the restaurantId and date are available
    useEffect(() => {
        if (!restaurantId || !date) return;  // Guard clause for missing params

        fetch(`${api}/restaurant/${restaurantId}?date=${date}`)
            .then((response) => response.json())
            .then((data) => setRestaurant(data))
            .catch((error) => console.error("Error fetching restaurant details:", error));
    }, [restaurantId, date, api]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    // Convert the selected time to 24-hour format
    const selectedTimeIn24Hour = selectedTime ? convertTo24Hour(selectedTime) : '';

    // Filter tables that match the selected time
    const availableAtSelectedTime = restaurant.tables.filter(table => {
        const tableTimeIn24Hour = convertTo24Hour(table.time);  // Convert table time to 24-hour format
        return tableTimeIn24Hour === selectedTimeIn24Hour && table.availability;
    });

    // Filter tables for other times
    const availableAtOtherTimes = restaurant.tables.filter(table => {
        const tableTimeIn24Hour = convertTo24Hour(table.time);
        return tableTimeIn24Hour !== selectedTimeIn24Hour && table.availability;
    });

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-bold mb-6">{restaurant.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{restaurant.location}</p>

            <div className="mb-6">
                <h3 className="text-xl font-semibold">Available Tables at {selectedTime}:</h3>
                {availableAtSelectedTime.length > 0 ? (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                    {availableAtSelectedTime.map((table) => (
                        <li key={table._id} className="flex flex-col border ">
                            <button
                                className='bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600'
                                onClick={() => {
                                    // Navigate to booking summary page with query parameters
                                    window.location.href = `/bookingTicket?restaurantName=${restaurant.name}&tableId=${table._id}&formData=${serializedFormData}`;
                                }}
                            >
                                Book table at <span>{table.time}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                ) : (
                    <p>No available tables at the selected time.</p>
                )}
            </div>

            <div>
                <h3 className="text-xl font-semibold">Available Tables at Other Times:</h3>
                {availableAtOtherTimes.length > 0 ? (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                        {availableAtOtherTimes.map((table) => (
                            <li key={table._id} className="flex flex-col border ">
                                <button
                                    className='bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600'
                                    onClick={() => {
                                        // Navigate to booking summary page with query parameters
                                        window.location.href = `/bookingTicket?restaurantName=${restaurant.name}&time=${table.time}&tableId=${table._id}&formData=${serializedFormData}`;
                                    }}
                                >
                                    Book table at <span>{table.time}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No available tables at other times.</p>
                )}
            </div>
        </div>
    );
}
