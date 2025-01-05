"use client";
import BookingForm from './components/BookingForm';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  type FormData = {
    date: string;
    time: string;
    guests: number;
    name: string;
    contact: string;
  };

  const handleReservation = async (formData: FormData) => {
    try {
      const serializedData = encodeURIComponent(JSON.stringify(formData));
      router.push(`/restaurant?data=${serializedData}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Restaurant Table Booking System</h1>

      {/* Booking Form Component */}
      <BookingForm onSubmit={handleReservation} />

      {/* Button to navigate to the user's bookings */}
      <div className="mt-4 flex w-full">
        <button
          onClick={()=>router.push('/bookings')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-auto"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
