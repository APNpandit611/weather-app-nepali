"use client";
import React, { useEffect, useState } from "react";
import { WeatherHeader } from "./WeatherHeader";
import { WeatherCard } from "./WeatherCard";
import { WeatherStats } from "./WeatherStats";
import { ClothingSuggestions } from "./ClothingSuggestions";
import { WeeklyForecast } from "./WeeklyForecast";
import Spinner from "./Loader";
import { Loader2 } from "lucide-react";
import Loader from "./Loader";
import { getWeather } from "@/utils/getWeather";

type DailyForecastItem = {
    date: string; // ISO date string
    minTemp: number;
    maxTemp: number;
    weatherCode: number;
};

type WeatherStackResponse = {
    // location: { name: string; country: string };
    // current: {
    //     temperature: number;
    //     feelslike?: number;
    //     wind_speed: number;
    //     humidity?: number;
    //     visibility?: number;
    //     weather_descriptions: string[];
    //     weather_icons: string[];
    //     astro: {
    //         sunrise: string;
    //         sunset: string;
    //     };
    //     air_quality: {
    //         "us-epa-index": string;
    //     };
    // };

    countryName: string;
    cityName: string;
    temperature: number;
    feelsLike: number;
    windSpeed: number;
    humidity: number;
    visibility: number;
    weatherCode: number;
    sunrise: string;
    sunset: string;
    uvIndex: number;
    aqi: number;
    dailyForecast: DailyForecastItem[];
};

export default function WeatherApp() {
    const [weather, setWeather] = useState<WeatherStackResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("तपाईंको ब्राउजरले स्थान सेवा समर्थन गर्दैन");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    // const res = await fetch(
                    //     `/api/weather?lat=${latitude}&lon=${longitude}`
                    // );

                    const data: WeatherStackResponse = await getWeather(latitude, longitude)
                    // const data: WeatherStackResponse = await res.json();
                    setWeather(data);
                } catch {
                    setError("मौसम डेटा प्राप्त गर्न असफल");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("स्थान सेवा अनुमति अस्वीकृत");
                setLoading(false);
            },
            {
                enableHighAccuracy: true, // <-- IMPORTANT
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, []);
 
    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader
                    size={56}
                    color="#6366f1"
                    text="मौसम आउँदैछ !!"
                    className="text-slate-600"
                />
            </div>
        );

    if (error)
        return <div className="text-center mt-20 text-white">{error}</div>;

    // const city = weather?.country ?? "काठमाडौं";
    // const country = weather?.location?.country ?? "नेपाल";
    // const condition = weather?.current?.weather_descriptions[0];
    // const temp = weather?.current?.temperature ?? 20;
    // const feelsLike = weather?.current?.feelslike ?? temp;
    // const wind = weather?.current?.wind_speed ?? 10;
    // const humidity = weather?.current?.humidity ?? 50;
    // const visibility = weather?.current?.visibility ?? 8;
    // const sunrise = weather?.current?.astro.sunrise ?? "00:00";
    // const sunset = weather?.current?.astro.sunset ?? "00.00";
    // const weather_icons = weather?.current?.weather_icons ?? [];
    // const airQuality = weather?.current?.air_quality?.["us-epa-index"] ?? "0";

    // const tempRange:
    //     | "extremely_cold"
    //     | "very_cold"
    //     | "cold"
    //     | "mild"
    //     | "hot"
    //     | "very_hot"
    //     | "extremely_hot" =
    //     feelsLike <= -20
    //         ? "extremely_cold"
    //         : feelsLike <= -10
    //         ? "very_cold"
    //         : feelsLike <= -5
    //         ? "cold"
    //         : feelsLike <= 25
    //         ? "mild"
    //         : feelsLike <= 30
    //         ? "hot"
    //         : feelsLike <= 40
    //         ? "very_hot"
    //         : "extremely_hot";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 pb-6 px-4">
            <WeatherHeader
                city={weather?.cityName ?? ""}
                country={weather?.countryName ?? ""}
                temperature={weather?.temperature ?? 0}
            />
            <div className="mt-6 max-w-md mx-auto space-y-4">
                <WeatherCard
                    weatherCode={weather?.weatherCode ?? 0}
                    temperature={weather?.temperature ?? 0}
                    feelsLike={weather?.feelsLike ?? 0}
                    windSpeed={weather?.windSpeed ?? 0}
                    humidity={weather?.humidity ?? 0}
                    visibility={weather?.visibility ?? 0}
                />
                <WeeklyForecast dailyForecast={weather?.dailyForecast ?? []} />
                <WeatherStats
                    uvIndex={weather?.uvIndex ?? 0}
                    sunrise={weather?.sunrise ?? "00:00"}
                    sunset={weather?.sunset ?? "00:00"}
                    aqi={weather?.aqi ?? 0}
                />
                <ClothingSuggestions
                    weatherCode={weather?.weatherCode ?? 0}
                    feelsLike={weather?.feelsLike ?? 0}
                />
            </div>
        </div>
    );
}
