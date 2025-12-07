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

export type WeatherCondition =
    | "घाम"
    | "कुहिरो"
    | "बादल"
    | "वर्षा"
    | "हल्का वर्षा"
    | "भारी वर्षा"
    | "हिउँ"
    | "हल्का हिउँ"
    | "भारी हिउँ"
    | "तुफान"
    | "हावा"
    | "धुंध"
    | "बिजुली"
    | "ओला";

interface WeatherCardProps {
    apiCondition?: string; // Accept API string
    temperature: number;
    feelsLike: number;
    windSpeed: number;
    humidity: number;
    visibility: number;
    tempRange:
        | "extremely_cold"
        | "very_cold"
        | "cold"
        | "mild"
        | "hot"
        | "very_hot"
        | "extremely_hot";
    weather_icons: string[];
}

// Map API strings to Nepali WeatherCondition
const conditionMap: Record<string, WeatherCondition> = {
    sunny: "घाम",
    clear: "कुहिरो",
    cloudy: "बादल",
    rain: "वर्षा",
    "light rain": "हल्का वर्षा",
    "heavy rain": "भारी वर्षा",
    snow: "हिउँ",
    "light snow": "हल्का हिउँ",
    "heavy snow": "भारी हिउँ",
    storm: "तुफान",
    windy: "हावा",
    fog: "धुंध",
    thunder: "बिजुली",
    lightning: "बिजुली",
    hail: "ओला",
};

export function WeatherCard({
    apiCondition,
    temperature,
    feelsLike,
    windSpeed,
    humidity,
    visibility,
    tempRange,
    weather_icons,
}: WeatherCardProps) {
    // Convert API string to Nepali condition
    const condition: WeatherCondition = apiCondition
        ? conditionMap[apiCondition.toLowerCase()] ?? "घाम"
        : "घाम";

    // Weather icon mapping
    const getWeatherIcon = () => {
        const iconClass = "w-16 h-16";
        switch (condition) {
            case "घाम":
                return <Sun className={iconClass} />;
            case "कुहिरो":
                return <Sun className={iconClass} />;
            case "बादल":
                return <Cloud className={iconClass} />;
            case "वर्षा":
                return <CloudRain className={iconClass} />;
            case "हल्का वर्षा":
                return <CloudRain className={iconClass} />;
            case "भारी वर्षा":
                return <CloudRain className={iconClass} />;
            case "हिउँ":
                return <CloudSnow className={iconClass} />;
            case "हल्का हिउँ":
                return <CloudSnow className={iconClass} />;
            case "भारी हिउँ":
                return <CloudSnow className={iconClass} />;
            case "हावा":
                return <Wind className={iconClass} />;
            case "धुंध":
                return <CloudFog className={iconClass} />;
            case "तुफान":
                return <CloudLightning className={iconClass} />;
            case "बिजुली":
                return <Zap className={iconClass} />;
            case "ओला":
                return <CloudHail className={iconClass} />;
        }
    };

    // Temperature emoji mapping
    const getTempEmoji = () => {
        switch (tempRange) {
            case "extremely_cold":
                return "🥶🧊";
            case "very_cold":
                return "🥶";
            case "cold":
                return "🧥";
            case "mild":
                return "🙂";
            case "hot":
                return "🥵";
            case "very_hot":
                return "🔥";
            case "extremely_hot":
                return "🌞🔥";
        }
    };

    // Temperature gradient color mapping
    const getTempColor = () => {
        switch (tempRange) {
            case "extremely_cold":
                return "from-blue-600 to-blue-800";
            case "very_cold":
                return "from-blue-400 to-blue-600";
            case "cold":
                return "from-blue-200 to-blue-400";
            case "mild":
                return "from-green-300 to-green-500";
            case "hot":
                return "from-yellow-400 to-yellow-600";
            case "very_hot":
                return "from-orange-400 to-orange-600";
            case "extremely_hot":
                return "from-red-400 to-red-600";
        }
    };

    // Temperature text color
    const getTempTextColor = () => {
        switch (tempRange) {
            case "extremely_cold":
            case "very_cold":
            case "cold":
                return "text-blue-600";
            case "mild":
                return "text-green-600";
            case "hot":
            case "very_hot":
                return "text-orange-600";
            case "extremely_hot":
                return "text-red-600";
        }
    };

    return (
        <div className="backdrop-blur-md bg-white/80 rounded-3xl p-6 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div
                        className={`bg-gradient-to-br ${getTempColor()} p-6 rounded-2xl shadow-lg text-white`}
                    >
                        {getWeatherIcon()}
                       
                    </div>
                    <div>
                        <h2 className="text-gray-800 mb-1">{condition}</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl">{getTempEmoji()}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`${getTempTextColor()} mb-1`}>
                        तापमान {temperature}°C
                    </div>
                    <div className="text-gray-600">महसुस {feelsLike}°C</div>
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
                    <div className="text-gray-600">{visibility} km</div>
                </div>
            </div>
        </div>
    );
}

