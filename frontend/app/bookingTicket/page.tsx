import React, { Suspense } from 'react';
import BookingTicket from '../components/BookingTicket';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingTicket />
        </Suspense>
    );
}
