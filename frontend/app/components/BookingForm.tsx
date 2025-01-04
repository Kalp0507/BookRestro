import { useState } from 'react';

interface BookingFormProps {
    onSubmit: (formData: {
        date: string;
        time: string;
        guests: number;
        name: string;
        contact: string
    }) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 1,
        name: '',
        contact: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md border sm:w-full md:w-96 mx-auto">

            <div>
                <label htmlFor="guests" className="block text-sm font-medium">
                    Number of Guests:
                </label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label htmlFor="name" className="block text-sm font-medium">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                    <label htmlFor="date" className="block text-sm font-medium">
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="w-full sm:w-1/2">
                    <label htmlFor="time" className="block text-sm font-medium">
                        Time:
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="contact" className="block text-sm font-medium">
                    Contact Details:
                </label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Check Availability
            </button>
        </form>
    );
};

export default BookingForm;
