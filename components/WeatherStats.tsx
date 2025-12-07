import { Sun, Sunrise, Sunset, Gauge } from "lucide-react";

interface WeatherStatsProps {
    uvIndex: number;
    sunrise: string;
    sunset: string;
    airQuality: string;
}

export function WeatherStats({
    uvIndex,
    sunrise,
    sunset,
    airQuality,
}: WeatherStatsProps) {
    const getUVColor = () => {
        if (uvIndex <= 2) return "text-green-600";
        if (uvIndex <= 5) return "text-yellow-600";
        if (uvIndex <= 7) return "text-orange-600";
        return "text-red-600";
    };

    const getUVLabel = () => {
        if (uvIndex <= 2) return "कम";
        if (uvIndex <= 5) return "मध्यम";
        if (uvIndex <= 7) return "उच्च";
        return "धेरै उच्च";
    };

    const airQualityIndex = Number(airQuality);
    const getAirQuality = (index: number) => {
        switch (index) {
            case 1:
                return {
                    label: "राम्रो",
                    color: "bg-green-200 text-green-800",
                };
            case 2:
                return {
                    label: "मध्यम",
                    color: "bg-yellow-200 text-yellow-800",
                };
            case 3:
                return {
                    label: "संवेदनशील समूहको लागि अस्वस्थ",
                    color: "bg-orange-200 text-orange-800",
                };
            case 4:
                return { label: "अस्वस्थ", color: "bg-red-200 text-red-800" };
            case 5:
                return {
                    label: "धेरै अस्वस्थ",
                    color: "bg-purple-200 text-purple-800",
                };
            case 6:
                return { label: "खतरनाक", color: "bg-pink-200 text-pink-800" };
            default:
                return {
                    label: "छैन",
                    color: "bg-gray-200 text-gray-800",
                };
        }
    };
    const { label: airQualityNepali, color: airQualityColor } =
        getAirQuality(airQualityIndex);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* UV Index */}
            <div className="backdrop-blur-md bg-white/80 rounded-2xl p-5 shadow-xl border border-white/50">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl shadow-md">
                        <Sun className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <div className="text-gray-700">UV सूचकाङ्क</div>
                        <div className={`${getUVColor()}`}>{getUVLabel()}</div>
                    </div>
                </div>
                <div
                    className={`text-center ${getUVColor()} py-2 bg-white/60 rounded-xl`}
                >
                    {uvIndex}/10
                </div>
            </div>

            {/* Air Quality */}
            <div className="backdrop-blur-md bg-white/80 rounded-2xl p-5 shadow-xl border border-white/50">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-teal-400 to-cyan-500 p-3 rounded-xl shadow-md">
                        <Gauge className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <div className="text-gray-700">हावाको गुणस्तर</div>
                    </div>
                </div>
                <div
                    className={`text-center py-2 rounded-xl ${airQualityColor}`}
                >
                    {airQualityNepali}
                </div>
            </div>

            {/* Sunrise */}
            <div className="backdrop-blur-md bg-white/80 rounded-2xl p-5 shadow-xl border border-white/50">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-3 rounded-xl shadow-md">
                        <Sunrise className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <div className="text-gray-700">सूर्योदय</div>
                        <div className="text-orange-600">{sunrise}</div>
                    </div>
                </div>
            </div>

            {/* Sunset */}
            <div className="backdrop-blur-md bg-white/80 rounded-2xl p-5 shadow-xl border border-white/50">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-3 rounded-xl shadow-md">
                        <Sunset className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <div className="text-gray-700">सूर्यास्त</div>
                        <div className="text-purple-600">{sunset}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
