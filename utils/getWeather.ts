export async function getWeather(lat: number, lon: number) {
    // 1. Open-Meteo weather
    const openMeteo = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,uv_index,apparent_temperature,uv_index,weather_code,wind_speed_10m,relative_humidity_2m,visibility` +
        `&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset,weather_code`
    );

    // 2. Reverse geocode
    const geo = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    );

    // 3. AQI
    const aqiReq = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?` +
        `latitude=${lat}&longitude=${lon}` +
        `&current=us_aqi` +
        `&timezone=auto`
    );

    const weatherData = await openMeteo.json();
    const geoData = await geo.json();
    const aqiData = await aqiReq.json();

    return {
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
        uvIndex: weatherData.current?.uv_index ?? 0,
        aqi: aqiData.current?.us_aqi ?? 0,

        dailyForecast: weatherData.daily
            ? weatherData.daily.time.map((date: string, i: number) => ({
                  date,
                  minTemp: weatherData.daily.temperature_2m_min[i],
                  maxTemp: weatherData.daily.temperature_2m_max[i],
                  weatherCode: weatherData.daily.weather_code[i],
              }))
            : [],
    };
}
