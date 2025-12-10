import Loader from "@/components/Loader"; // Assuming this is your loading component
import WeatherApp from "@/components/WeatherApp";
import { Suspense } from "react";

export default function Home() {
    return (
        // The Suspense boundary wraps the component that might be asynchronously loading data
        // <Suspense
        //     fallback={
        //         <Loader
        //             size={56}
        //             color="#6366f1"
        //             text="मौसम आउँदैछ !!"
        //             className="text-slate-600"
        //         />
        //     }
        // >
        //     <WeatherApp />
        // </Suspense>

        <WeatherApp />
    );
}
