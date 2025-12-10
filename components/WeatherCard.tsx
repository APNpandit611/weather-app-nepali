import {
    Wind,
    Droplets,
    Eye,
    Cloud,
    CloudRain,
    CloudSnow,
    Sun,
    Zap,
    CloudLightning,
    CloudHail,
    CloudFog,
} from "lucide-react";
import Image from "next/image";
import { WeatherCondition, weatherCodeMap } from "@/utils/weatherConditions";

// export type WeatherCondition =
//     | "स्पष्ट आकाश"
//     | "मुख्यतया स्पष्ट"
//     | "आंशिक बादल"
//     | "धेरै बादल"
//     | "कुहिरो"
//     | "बरफिलो कुहिरो"
//     | "हल्का पानी"
//     | "मध्यम पानी"
//     | "धेरै पानी"
//     | "हल्का जमेको पानी"
//     | "धेरै जमेको पानी"
//     | "थोरै पानी"
//     | "थोरै हिउँ"
//     | "मध्यम हिउँ"
//     | "धेरै हिउँ"
//     | "हिउँको दाना"
//     | "बिजुली चम्किरहेको छ"
//     | "थोरै हिमकणसहित बिजुली चम्किरहेको छ"
//     | "धेरै हिमकणसहित बिजुली चम्किरहेको छ";
// export type WeatherCondition =
//     | "घाम"
//     | "कुहिरो"
//     | "बादल"
//     | "वर्षा"
//     | "हल्का बादल"
//     | "हल्का वर्षा"
//     | "भारी वर्षा"
//     | "हिउँ"
//     | "हल्का हिउँ"
//     | "भारी हिउँ"
//     | "तुफान"
//     | "हावा"
//     | "धुंध"
//     | "बिजुली"
//     | "ओला";

interface WeatherCardProps {
    weatherCode: number;
    temperature: number;
    feelsLike: number;
    windSpeed: number;
    humidity: number;
    visibility: number;
}

// Map API strings to Nepali WeatherCondition
// const conditionMap: Record<string, WeatherCondition> = {
//     sunny: "घाम",
//     clear: "कुहिरो",
//     overcast: "हल्का बादल",
//     cloudy: "बादल",
//     rain: "वर्षा",
//     "light rain": "हल्का वर्षा",
//     "heavy rain": "भारी वर्षा",
//     snow: "हिउँ",
//     "light snow": "हल्का हिउँ",
//     "heavy snow": "भारी हिउँ",
//     storm: "तुफान",
//     windy: "हावा",
//     fog: "धुंध",
//     thunder: "बिजुली",
//     lightning: "बिजुली",
//     hail: "ओला",
// };

// const weatherCodeMap: Record<number, string> = {
//     0: "स्पष्ट आकाश", // Clear sky
//     1: "मुख्यतया स्पष्ट", // Mainly clear
//     2: "आंशिक बादल", // Partly cloudy
//     3: "धेरै बादल", // Overcast
//     45: "कुहिरो", // Fog
//     48: "बरफिलो कुहिरो", // Depositing rime fog
//     51: "हल्का पानी", // Drizzle: Light
//     53: "मध्यम पानी", // Drizzle: Moderate
//     55: "धेरै पानी", // Drizzle: Dense
//     56: "हल्का जमेको पानी", // Freezing Drizzle: Light
//     57: "धेरै जमेको पानी", // Freezing Drizzle: Dense
//     61: "थोरै पानी", // Rain: Slight
//     63: "मध्यम पानी", // Rain: Moderate
//     65: "धेरै पानी", // Rain: Heavy
//     66: "हल्का जमेको पानी", // Freezing Rain: Light
//     67: "धेरै जमेको पानी", // Freezing Rain: Heavy
//     71: "थोरै हिउँ", // Snow fall: Slight
//     73: "मध्यम हिउँ", // Snow fall: Moderate
//     75: "धेरै हिउँ", // Snow fall: Heavy
//     77: "हिउँको दाना", // Snow grains
//     80: "थोरै वर्षा", // Rain showers: Slight
//     81: "मध्यम वर्षा", // Rain showers: Moderate
//     82: "भारी वर्षा", // Rain showers: Violent
//     85: "थोरै हिउँ वर्षा", // Snow showers: Slight
//     86: "धेरै हिउँ वर्षा", // Snow showers: Heavy
//     95: "बिजुली चम्किरहेको छ", // Thunderstorm: Slight or moderate
//     96: "थोरै हिमकणसहित बिजुली चम्किरहेको छ", // Thunderstorm with slight hail
//     99: "धेरै हिमकणसहित बिजुली चम्किरहेको छ", // Thunderstorm with heavy hail
// };

export function WeatherCard({
    weatherCode,
    temperature,
    feelsLike,
    windSpeed,
    humidity,
    visibility,
}: WeatherCardProps) {
    // Convert API string to Nepali condition
    // const condition: WeatherCondition = apiCondition
    //     ? conditionMap[apiCondition.split(",")?.[0].toLowerCase()] ?? "घाम"
    //     : "घाम";

    // Weather icon mapping
    // const getWeatherIcon = () => {
    //     const iconClass = "w-16 h-16";
    //     switch (condition) {
    //         case "घाम":
    //             return <Sun className={iconClass} />;
    //         case "कुहिरो":
    //             return <Sun className={iconClass} />;
    //         case "बादल":
    //             return <Cloud className={iconClass} />;
    //         case "हल्का बादल":
    //             return <Cloud className={iconClass} />;
    //         case "वर्षा":
    //             return <CloudRain className={iconClass} />;
    //         case "हल्का वर्षा":
    //             return <CloudRain className={iconClass} />;
    //         case "भारी वर्षा":
    //             return <CloudRain className={iconClass} />;
    //         case "हिउँ":
    //             return <CloudSnow className={iconClass} />;
    //         case "हल्का हिउँ":
    //             return <CloudSnow className={iconClass} />;
    //         case "भारी हिउँ":
    //             return <CloudSnow className={iconClass} />;
    //         case "हावा":
    //             return <Wind className={iconClass} />;
    //         case "धुंध":
    //             return <CloudFog className={iconClass} />;
    //         case "तुफान":
    //             return <CloudLightning className={iconClass} />;
    //         case "बिजुली":
    //             return <Zap className={iconClass} />;
    //         case "ओला":
    //             return <CloudHail className={iconClass} />;
    //     }
    // };

    const condition = weatherCodeMap[weatherCode] || "स्पष्ट आकाश";

    const getWeatherIcon = (condition: WeatherCondition) => {
        const iconClass = "w-16 h-16";
        switch (condition) {
            case "स्पष्ट आकाश":
            case "मुख्यतया स्पष्ट":
                return <Sun className={iconClass} />;
            case "आंशिक बादल":
            case "धेरै बादल":
                return <Cloud className={iconClass} />;
            case "हल्का पानी":
            case "मध्यम पानी":
            case "धेरै पानी":
            case "थोरै पानी":
                return <CloudRain className={iconClass} />;
            case "हल्का जमेको पानी":
            case "धेरै जमेको पानी":
                return <CloudHail className={iconClass} />;
            case "थोरै हिउँ":
            case "मध्यम हिउँ":
            case "धेरै हिउँ":
            case "हिउँको दाना":
                return <CloudSnow className={iconClass} />;
            case "कुहिरो":
            case "बरफिलो कुहिरो":
                return <CloudFog className={iconClass} />;
            case "बिजुली चम्किरहेको छ":
            case "थोरै हिमकणसहित बिजुली चम्किरहेको छ":
            case "धेरै हिमकणसहित बिजुली चम्किरहेको छ":
                return <Zap className={iconClass} />;
            default:
                return <Sun className={iconClass} />;
        }
    };

    // Temperature emoji mapping
    // const getTempEmoji = () => {
    //     switch (tempRange) {
    //         case "extremely_cold":
    //             return "🥶🧊";
    //         case "very_cold":
    //             return "🥶";
    //         case "cold":
    //             return "🧥";
    //         case "mild":
    //             return "🙂";
    //         case "hot":
    //             return "🥵";
    //         case "very_hot":
    //             return "🔥";
    //         case "extremely_hot":
    //             return "🌞🔥";
    //     }
    // };

    const getTempEmoji = (temp: number): string => {
        if (temp <= -30) return "💀🥶❄️🧊"; // Extreme Frostbite Danger
        else if (temp <= -20) return "🥶❄️🧊"; // Severely Cold
        else if (temp <= -10) return "🧣🥶"; // Very Cold, requires bundling up
        else if (temp <= -5) return "🧥🧤❄️"; // Freezing/Icy
        else if (temp <= 0) return "🧥❄️"; // Near Freezing
        else if (temp <= 5) return "🧥☔️"; // Chilly, light jacket/rain
        else if (temp <= 10) return "🧥🌬️"; // Cool
        else if (temp <= 15) return "🙂👍"; // Mild and pleasant
        else if (temp <= 20) return "😊🌱"; // Comfortable and ideal
        else if (temp <= 23) return "😎☀️"; // Warm and sunny
        else if (temp <= 26) return "☀️🏖️"; // Hot, beach weather
        else if (temp <= 30) return "🥵💧"; // Very Hot, sweating, stay hydrated
        else if (temp <= 35) return "🔥🌡️"; // Extreme Heat Warning
        else if (temp <= 40) return "🌋🌞🔥"; // Dangerously Hot
        else return "☢️🔥🔥🔥"; // Unsurvivable/Extreme record heat
    };

    // Temperature gradient color mapping
    // const getTempColor = () => {
    //     switch (tempRange) {
    //         case "extremely_cold":
    //             return "from-blue-600 to-blue-800";
    //         case "very_cold":
    //             return "from-blue-400 to-blue-600";
    //         case "cold":
    //             return "from-blue-200 to-blue-400";
    //         case "mild":
    //             return "from-green-300 to-green-500";
    //         case "hot":
    //             return "from-yellow-400 to-yellow-600";
    //         case "very_hot":
    //             return "from-orange-400 to-orange-600";
    //         case "extremely_hot":
    //             return "from-red-400 to-red-600";
    //     }
    // };

    // Temperature text color
    // const getTempTextColor = () => {
    //     switch (tempRange) {
    //         case "extremely_cold":
    //         case "very_cold":
    //         case "cold":
    //             return "text-blue-600";
    //         case "mild":
    //             return "text-green-600";
    //         case "hot":
    //         case "very_hot":
    //             return "text-orange-600";
    //         case "extremely_hot":
    //             return "text-red-600";
    //     }
    // };

    return (
        // <div className="backdrop-blur-md bg-white/80 rounded-3xl p-6 shadow-2xl border border-white/50">
        //     <div className="flex items-center justify-between mb-4">
        //         <div className="flex items-center gap-4">
        //             <div
        //                 className={`bg-gradient-to-br ${getTempColor()} p-6 rounded-2xl shadow-lg text-white`}
        //             >
        //                 {getWeatherIcon()}
        //             </div>
        //             <div>
        //                 <h2 className="text-gray-800 mb-1">{condition}</h2>
        //                 <div className="flex items-center gap-2">
        //                     <span className="text-4xl">{getTempEmoji()}</span>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="text-right">
        //             <div className={`${getTempTextColor()} mb-1`}>
        //                 तापमान {temperature}°C
        //             </div>
        //             <div className="text-gray-600">महसुस {feelsLike}°C</div>
        //         </div>
        //     </div>

        //     <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
        //         <div className="text-center">
        //             <Wind className="w-6 h-6 text-cyan-600 mx-auto mb-1" />
        //             <div className="text-gray-600">{windSpeed} km/h</div>
        //         </div>
        //         <div className="text-center">
        //             <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-1" />
        //             <div className="text-gray-600">{humidity}%</div>
        //         </div>
        //         <div className="text-center">
        //             <Eye className="w-6 h-6 text-purple-600 mx-auto mb-1" />
        //             <div className="text-gray-600">{visibility} km</div>
        //         </div>
        //     </div>
        // </div>

        <div className="backdrop-blur-md bg-white/80 rounded-3xl p-6 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div
                        className={`bg-gradient-to-br from-blue-300 to-blue-500 p-6 rounded-2xl shadow-lg text-white`}
                    >
                        {getWeatherIcon(condition)}
                    </div>
                    <div>
                        <h2 className="text-gray-800 mb-1 text-lg font-semibold">{condition}</h2>
                        <div className="text-2xl">
                            {getTempEmoji(temperature)}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-blue-600 mb-1 font-semibold">
                        तापमान {temperature}°C
                    </div>
                    <div className="text-gray-600 font-semibold">महसुस {feelsLike}°C</div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                <div className="text-center">
                    <Wind className="w-6 h-6 text-cyan-600 mx-auto mb-1" />
                    <div className="text-gray-600">{windSpeed} km/h</div>
                </div>
                <div className="text-center">
                    <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-gray-600">{humidity}%</div>
                </div>
                <div className="text-center">
                    <Eye className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-gray-600">{visibility / 1000} km</div>
                </div>
            </div>
        </div>
    );
}
