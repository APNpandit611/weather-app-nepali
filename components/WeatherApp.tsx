"use client";
import React, { useEffect, useState } from "react";
import { WeatherHeader } from "./WeatherHeader";
import { WeatherCard } from "./WeatherCard";
import { WeatherStats } from "./WeatherStats";
import { ClothingSuggestions } from "./ClothingSuggestions";

interface WeatherStackResponse {
    location: { name: string; country: string };
    current: {
        temperature: number;
        feelslike?: number;
        wind_speed: number;
        humidity?: number;
        visibility?: number;
        weather_descriptions: string[];
        weather_icons: string[];
        astro: {
            sunrise: string;
            sunset: string;
        };
        air_quality: {
            "us-epa-index": string;
        };
    };
}

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
                    const res = await fetch(
                        `/api/weather?lat=${latitude}&lon=${longitude}`
                    );
                    const data: WeatherStackResponse = await res.json();
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
            }
        );
    }, []);

    if (loading)
        return (
            <div className="text-center mt-20 text-white">
                मौसम लोड हुँदैछ...
            </div>
        );
    if (error)
        return <div className="text-center mt-20 text-white">{error}</div>;

    const city = weather?.location.name ?? "काठमाडौं";
    const country = weather?.location.country ?? "नेपाल";
    const condition = weather?.current.weather_descriptions[0];
    const temp = weather?.current.temperature ?? 20;
    const feelsLike = weather?.current?.feelslike ?? temp;
    const wind = weather?.current.wind_speed ?? 10;
    const humidity = weather?.current.humidity ?? 50;
    const visibility = weather?.current.visibility ?? 8;
    const sunrise = weather?.current.astro.sunrise ?? "00:00";
    const sunset = weather?.current.astro.sunset ?? "00.00";
    const weather_icons = weather?.current?.weather_icons ?? [];
    const airQuality = weather?.current?.air_quality?.["us-epa-index"] ?? "0";

    const tempRange:
        | "extremely_cold"
        | "very_cold"
        | "cold"
        | "mild"
        | "hot"
        | "very_hot"
        | "extremely_hot" =
        feelsLike <= -20
            ? "extremely_cold"
            : feelsLike <= -10
            ? "very_cold"
            : feelsLike <= -5
            ? "cold"
            : feelsLike <= 25
            ? "mild"
            : feelsLike <= 30
            ? "hot"
            : feelsLike <= 40
            ? "very_hot"
            : "extremely_hot";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 pb-6 px-4">
            <WeatherHeader city={city} country={country} temperature={temp} />
            <div className="mt-6 max-w-md mx-auto space-y-4">
                <WeatherCard
                    apiCondition={condition}
                    temperature={temp}
                    feelsLike={feelsLike}
                    windSpeed={wind}
                    humidity={humidity}
                    visibility={visibility}
                    tempRange={tempRange}
                    weather_icons={weather_icons}
                />
                <WeatherStats
                    uvIndex={3}
                    sunrise={sunrise}
                    sunset={sunset}
                    airQuality={airQuality}
                />
                <ClothingSuggestions
                    condition={condition ?? "घाम"}
                    tempRange={tempRange}
                />
            </div>
        </div>
    );
}
