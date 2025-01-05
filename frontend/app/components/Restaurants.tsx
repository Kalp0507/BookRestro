"use client"; // Mark this component as client-side
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Restaurant {
    _id: string;
    name: string;
    location: string;
    tables: { time: string; availability: boolean; _id: string }[];
}

export default function Restaurants() {
    const searchParams = useSearchParams(); // Hook to get query params
    const [data, setData] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter();

    const dataParam = searchParams.get('data');
    const formData = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    const date = formData ? formData.date : null; 
    const time = formData ? formData.time : null; 
    const api = process.env.NEXT_PUBLIC_BACKEND_API

    useEffect(() => {
        if (date) {
            // Fetch data based on 'date' from the query params
            console.log(api)
            fetch(`${api}/restaurants?date=${date}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    const restaurants = data;  // Adjust this according to your API
                    setData(restaurants);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [date, api]);

    useEffect(() => {
        if (data?.length > 0 && time) {
            const selectedTimestamp = new Date(`1970-01-01T${time}:00Z`).getTime();

            const filtered = data.filter((restaurant) => {
                const availableTables = restaurant.tables?.filter((table) => table.availability);

                if (availableTables.length === 0) {
                    return false;
                }

                let closestTable = availableTables[0];
                let minTimeDifference = Infinity;

                if (closestTable && closestTable.time) {
                    const [hours, minutes] = closestTable.time.split(':');
                    const hoursNumber = parseInt(hours, 10);
                    const minutesNumber = parseInt(minutes, 10);

                    if (!isNaN(hoursNumber) && !isNaN(minutesNumber)) {
                        const closestTableTimestamp = new Date(Date.UTC(1970, 0, 1, hoursNumber, minutesNumber));
                        minTimeDifference = Math.abs(closestTableTimestamp.getTime() - selectedTimestamp);
                    }
                }

                availableTables.forEach((table) => {
                    const [hours, minutes] = table.time.split(':');
                    const hoursNumber = parseInt(hours, 10);
                    const minutesNumber = parseInt(minutes, 10);

                    if (!isNaN(hoursNumber) && !isNaN(minutesNumber)) {
                        const tableTimestamp = new Date(Date.UTC(1970, 0, 1, hoursNumber, minutesNumber));
                        const timeDifference = Math.abs(tableTimestamp.getTime() - selectedTimestamp);

                        if (timeDifference < minTimeDifference) {
                            closestTable = table;
                            minTimeDifference = timeDifference;
                        }
                    }
                });

                return minTimeDifference !== Infinity;
            });

            setFilteredRestaurants(filtered);
        }
    }, [data, time]);

    const handleBookTable = (restaurantId: string) => {
        // Re-serialize the formData and pass it to the next page
        const serializedFormData = encodeURIComponent(JSON.stringify(formData));
        router.push(`/restaurant/${restaurantId}?formData=${serializedFormData}`);
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Available Restaurants</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <div key={restaurant._id} className="border p-4 rounded-lg shadow-md">
                            <div className='flex items-center w-full justify-between'>
                                <div>
                                    <h2 className="text-lg sm:text-xl font-medium sm:font-semibold">{restaurant.name}</h2>
                                    <p className="text-sm text-gray-600">{restaurant.location}</p>
                                </div>
                                <button
                                    onClick={() => handleBookTable(restaurant._id)}
                                    className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600"
                                >
                                    Book Table
                                </button>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-medium sm:font-semibold">Available Tables:</h3>
                                <ul>
                                    {restaurant.tables
                                        .filter((table) => table.availability)
                                        .map((table) => (
                                            <li key={table._id} className="flex justify-between items-center">
                                                <span>{table.time}</span>
                                                <span className="text-green-600">Available</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='whitespace-nowrap'>No available restaurants for this date.</p>
                )}
            </div>
        </div>
    );
}
