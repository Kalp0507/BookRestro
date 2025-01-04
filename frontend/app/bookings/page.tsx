"use client";
import { useState } from 'react';

type Booking = {
    contact: string;
    id: string;
    restaurantName: string;
    tableId: string;
    date: string;
    time: string;
    guests: number;
};

export default function Bookings() {
    const [userName, setUserName] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const findBookings = async () => {
        if (!userName) {
            setError('Please enter your name.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/bookings?name=${userName}`);
            if (response.ok) {
                const data = await response.json();
                const uniqueBookings = Array.from(new Set(data.map((booking: Booking) => booking.id)))
                    .map((id) => data.find((booking: Booking) => booking.id === id));

                setBookings(uniqueBookings);
            } else {
                setError('Failed to fetch bookings.');
            }
        } catch (err) {
            setError('Failed to fetch bookings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading bookings...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">{error}</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8">My Bookings</h1>

            <div className="flex flex-col items-center">
                <label className="block text-lg font-medium text-gray-700 mb-2">Enter Your Name:</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full max-w-md">
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your name"
                    />
                    <button
                        onClick={findBookings}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
                    >
                        Find
                    </button>
                </div>
            </div>

            <div className="mt-10">
                {bookings.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{booking.restaurantName}</h2>
                                <p className="text-sm text-gray-600"><strong>Date:</strong> {booking.date}</p>
                                <p className="text-sm text-gray-600"><strong>Time:</strong> {booking.time}</p>
                                <p className="text-sm text-gray-600"><strong>Guests:</strong> {booking.guests}</p>
                                <p className="text-sm text-gray-600"><strong>Contact:</strong> {booking.contact}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    userName && <p className="text-center text-gray-600 mt-6">No bookings found for <strong>{userName}</strong>.</p>
                )}
            </div>
        </div>
    );
}
