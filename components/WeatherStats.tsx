import { Sun, Sunrise, Sunset, Gauge } from "lucide-react";

interface WeatherStatsProps {
    uvIndex: number;
    sunrise: string;
    sunset: string;
    aqi: number;
}

export function WeatherStats({
    uvIndex,
    sunrise,
    sunset,
    aqi,
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

    const airQualityIndex = Number(aqi);

    // ⭐ AQI जाँच र कन्डिसनिङको परिमार्जित भाग ⭐
    const getAirQuality = (index: number) => {
        // अमेरिकी EPA AQI मापदण्ड अनुसार संख्यात्मक दायरा जाँच
        if (index <= 50) {
            return {
                label: "राम्रो", // Good
                color: "text-green-600",
                bgColor: "bg-green-100",
            };
        } else if (index <= 100) {
            return {
                label: "मध्यम", // Moderate
                color: "text-yellow-600",
                bgColor: "bg-yellow-100 ",
            };
        } else if (index <= 150) {
            return {
                label: "संवेदनशील समूहको लागि अस्वस्थ", // Unhealthy for Sensitive Groups
                color: "text-orange-600",
                bgColor: "bg-orange-100 ",
            };
        } else if (index <= 200) {
            return {
                label: "अस्वस्थ", // Unhealthy
                color: "text-red-600",
                bgColor: "bg-red-100 ",
            };
        } else if (index <= 300) {
            return {
                label: "धेरै अस्वस्थ", // Very Unhealthy
                color: "text-purple-600",
                bgColor: "bg-purple-100 ",
            };
        } else if (index > 300) {
            return {
                label: "खतरनाक", // Hazardous
                color: "text-maroon-600", // Tailwind मा maroon नभएकाले bg-pink-900 जस्तै प्रयोग गर्न सकिन्छ
                bgColor: "bg-maroon-100 ",
            };
        } else {
            return {
                label: "छैन", // Not Available
                color: "text-gray-600",
                bgColor: "bg-gray-200 ",
            };
        }
    };

    // (नोट: मैले Tailwind मा 'bg-maroon-100' नभएकाले यसलाई काल्पनिक मानेको छु। तपाईंले आफ्नै कस्टम वर्ग वा उच्च pink/purple रंग प्रयोग गर्न सक्नुहुन्छ।)

    const { label: airQualityNepali, color: airQualityTextColor , bgColor: airQualityBgColor} =
        getAirQuality(airQualityIndex);
    // ⭐ परिमार्जित भागको अन्त्य ⭐

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
                    {uvIndex}
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
                        {/* नयाँ AQI मान पनि यहाँ प्रदर्शन गर्नुहोस् */}
                        <div
                            className={`${airQualityTextColor} text-lg text-gray-900`}
                        >
                            {airQualityIndex}
                        </div>
                    </div>
                </div>
                <div
                    className={`${airQualityTextColor} ${airQualityBgColor} text-center py-2 rounded-xl`}
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
                        <div className="text-orange-600">
                            {sunrise.split("T")[1]}
                        </div>
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
                        <div className="text-purple-600">
                            {sunset.split("T")[1]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
