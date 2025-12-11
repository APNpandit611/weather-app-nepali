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
                        <span>{condition}</span>
                    </button>
                );
            })}
        </div>

        // <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/40 max-w-md mx-auto">
        //     {dailyForecast.map((day, i) => {
        //         const condition: WeatherCondition = weatherCodeMap[
        //             day.weatherCode
        //         ] as WeatherCondition;
        //         return (
        //             <button
        //                 key={i}
        //                 onClick={() => toggle(i)}
        //                 className="w-full flex justify-between items-center gap-3 px-5 py-3 mb-3 rounded-2xl text-white font-medium bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 shadow-lg
        //            hover:from-indigo-500 hover:to-cyan-500 active:scale-[0.98] transition-all duration-300 ease-in-out transform"
        //             >
        //                 <div className="flex flex-col text-left">
        //                     <span className="text-sm opacity-90">
        //                         {new Date(day.date).toLocaleDateString(
        //                             "ne-NP",
        //                             {
        //                                 weekday: "short",
        //                                 day: "numeric",
        //                                 month: "short",
        //                             }
        //                         )}
        //                     </span>
        //                 </div>

        //                 <div className="flex flex-col items-end">
        //                     <span className="text-lg font-semibold">
        //                         {day.minTemp}°C – {day.maxTemp}°C
        //                     </span>
        //                     <span className="text-sm opacity-80">
        //                         {condition}
        //                     </span>
        //                 </div>
        //             </button>
        //         );
        //     })}
        // </div>
    );
}
