import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json(
            { error: "Missing coordinates" },
            { status: 400 }
        );
    }

    // const WEATHERSTACK_KEY = process.env.NEXT_PUBLIC_WEATHERSTACK_KEY; // server-only
    const openMateoResponse = await fetch(
        // `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${lat},${lon}&units=m`
        // `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=kokkola&units=m`
        // `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&units=m`
        //   `https://api.open-meteo.com/v1/forecast
        // ?latitude=${lat}
        // &longitude=${lon}
        // &current_weather=true
        // &timezone=auto
        // &daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset`.replace(
        //       /\s+/g,
        //       ""
        //   )
        // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
        `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,uv_index,apparent_temperature,uv_index,weather_code,wind_speed_10m,relative_humidity_2m,visibility` +
            `&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset,weather_code` +
            `&timezone=auto`
    );

    const geoResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    );

    const openMeteoAqiResponse = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?` +
            `latitude=${lat}&longitude=${lon}` +
            `&current=us_aqi` + // Requesting the current US AQI
            `&timezone=auto`
    );

    const weatherData = await openMateoResponse.json();
    const geoData = await geoResponse.json();
    const aqiData = await openMeteoAqiResponse.json();

    const response = {
        countryName: geoData.countryName || "नेपाल",
        cityName: geoData.city || geoData.locality || "अज्ञात",
        temperature: weatherData.current?.temperature_2m ?? 0,
        feelsLike: weatherData.current?.apparent_temperature ?? 0,
        windSpeed: weatherData.current?.wind_speed_10m ?? 0,
        humidity: weatherData.current?.relative_humidity_2m ?? 0,
        visibility: weatherData.current?.visibility ?? 0,
        weatherCode: weatherData.current?.weather_code ?? 0,
        sunrise: weatherData.daily?.sunrise?.[0] ?? "00:00",
        sunset: weatherData.daily?.sunset?.[0] ?? "00:00",
        airQuality: "0", // TODO: Add real AQI if available
        uvIndex: weatherData.current?.uv_index ?? 0,
        aqi: aqiData.current?.us_aqi ?? 0,
        dailyForecast: weatherData.daily
            ? weatherData.daily.time.map((date: string, i: number) => ({
                  date, // ISO date string
                  minTemp: weatherData.daily.temperature_2m_min[i],
                  maxTemp: weatherData.daily.temperature_2m_max[i],
                  weatherCode: weatherData.daily.weather_code[i],
              }))
            : [],
    };
    return NextResponse.json(response);
}
