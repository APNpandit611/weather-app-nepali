"use client";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";

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
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-b-[3rem] shadow-2xl"></div>
            <div className="relative backdrop-blur-sm bg-white/10 rounded-b-[3rem] px-6 py-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-white/80">📍</div>
                    <div className="flex-1 text-center">
                        <h1 className="text-white inline-block relative">
                            {city}    
                            <Image
                                src="/hat.png"
                                alt="Hat"
                                width={30}
                                height={30}
                                className="absolute -top-3.5 -right-4"
                            />                       
                        </h1>
                         
                    </div>

                    <RefreshCcw
                        className="text-white cursor-pointer"
                        onClick={() => window.location.reload()}
                    />
                </div>
                <div className="text-center text-white/90 flex items-center justify-center gap-2">
                    <p>{country}</p>•
                    <p className="font-semibold">{temperature} °C</p>
                </div>
            </div>
        </div>
    );
}
