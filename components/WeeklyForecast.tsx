"use client";
import { useState } from "react";
import { WeatherCondition, weatherCodeMap } from "@/utils/weatherConditions";

interface DailyForecastItem {
    date: string;
    minTemp: number;
    maxTemp: number;
    weatherCode: number;
}

interface WeeklyForecastProps {
    dailyForecast: DailyForecastItem[];
}

export function WeeklyForecast({ dailyForecast }: WeeklyForecastProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        // <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/50">
        //     {dailyForecast.map((day, i) => {
        //         const condition: WeatherCondition = weatherCodeMap[day.weatherCode] as WeatherCondition;
        //         return (
        //             <div key={i} className="mb-2">
        //                 <button
        //                     onClick={() => toggle(i)}
        //                     className="w-full text-left px-4 py-2 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-xl text-white font-semibold shadow-md"
        //                 >
        //                     {new Date(day.date).toLocaleDateString("ne-NP", { weekday: "long", day: "numeric", month: "short" })} - {condition}
        //                 </button>
        //                 {openIndex === i && (
        //                     <div className="mt-2 px-4 py-3 bg-white/60 rounded-xl shadow-inner text-gray-700">
        //                         <div>न्यूनतम तापक्रम: {day.minTemp}°C</div>
        //                         <div>अधिकतम तापमान: {day.maxTemp}°C</div>
        //                         <div>सूर्योदय: {day.sunrise}</div>
        //                         <div>सूर्यास्त: {day.sunset}</div>
        //                     </div>
        //                 )}
        //             </div>
        //         );
        //     })}
        // </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-white/50">
            {dailyForecast.map((day, i) => {
                const condition: WeatherCondition = weatherCodeMap[
                    day.weatherCode
                ] as WeatherCondition;
                return (
                    <button
                        key={i}
                        onClick={() => toggle(i)}
                        className="w-full flex justify-between items-center px-4 py-2 mb-2 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-xl text-white font-semibold shadow-md"
                    >
                        <span>
                            {new Date(day.date).toLocaleDateString("ne-NP", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                            })}
                        </span>
                        <span>
                            {day.minTemp}°C - {day.maxTemp}°C
                        </span>
                        <span>
                            {condition}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
