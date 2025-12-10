"use client"
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

interface WeatherHeaderProps {
    city: string | undefined;
    country: string | undefined;
    temperature: number;
}

export function WeatherHeader({
    city,
    country,
    temperature,
}: WeatherHeaderProps) {
    const router = useRouter()
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-b-[3rem] shadow-2xl"></div>
            <div className="relative backdrop-blur-sm bg-white/10 rounded-b-[3rem] px-6 py-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-white/80">📍</div>
                    <h1 className="text-white text-center flex-1">{city}</h1>
                    <RefreshCcw className="text-white cursor-pointer" onClick={() => router.refresh()}/>
                </div>
                <div className="text-center text-white/90 flex items-center justify-center gap-2">
                    <p>{country}</p>•<p className="font-semibold">{temperature} °C</p>
                </div>
            </div>
        </div>
    );
}
