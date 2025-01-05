import React, { Suspense } from "react";
import Restaurants from "../components/Restaurants";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Restaurants/>
        </Suspense>
    );
}
