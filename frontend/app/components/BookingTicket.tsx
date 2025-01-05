"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookingTicket() {
    const searchParams = useSearchParams();
    const restaurantName= searchParams.get('restaurantName');
    const tableId = searchParams.get('tableId');
    const time = searchParams.get('time');
    const dataParam = searchParams.get('formData');
    const formData = dataParam ? JSON.parse(decodeURIComponent(dataParam)) : null;
    const date = formData ? formData.date : null;
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Initialize useRouter
    const api = process.env.NEXT_PUBLIC_BACKEND_API

    const handleBooking = async () => {
        if (!restaurantName || !tableId || !date || !time) {
            setError("Missing booking details.");
            return;
        }

        // Prepare booking data
        const bookingData = {
            restaurantName,
            tableId,
            date,
            time,
            guests: formData?.guests,
            name: formData?.name,
            contact: formData?.contact,
        };

        try {
            // Make a POST request to save the booking
            const response = await fetch(`${api}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Booking successful:", data);
                setIsBookingConfirmed(true); // Show confirmation
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during booking:', error);
            setError('An error occurred. Please try again.');
        }
    };

    // Handle navigation to the home page
    const handleGoHome = () => {
        router.push("/"); // Redirect to the home page
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl font-bold mb-6">Booking Summary</h1>

            {isBookingConfirmed ? (
                <div className="p-4 bg-green-100 text-green-800 rounded-md">
                    <h2 className="text-xl font-bold">Booking Successful!</h2>
                    <p>Your booking has been confirmed. We look forward to seeing you.</p>
                    {/* Button to go back to home page */}
                    <button
                        onClick={handleGoHome}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                    >
                        Go to Home Page
                    </button>
                </div>
            ) : (
                <div>
                    {restaurantName && tableId && time && date ? (
                        <div>
                            <p><strong>Restaurant Name:</strong> {restaurantName}</p>
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Guests:</strong> {formData?.guests}</p>
                            <p><strong>Name:</strong> {formData?.name}</p>
                            <p><strong>Contact:</strong> {formData?.contact}</p>

                            <button
                                onClick={handleBooking}
                                className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    ) : (
                        <p>Loading booking details...</p>
                    )}

                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </div>
            )}
        </div>
    );
}
