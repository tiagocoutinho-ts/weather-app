export async function fetchWeatherData(cityName) {
    if (!cityName) {
        return undefined;
    }

    const encodedCity = encodeURIComponent(cityName);
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=1`);
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
        return undefined
    }

    const {
        latitude,
        longitude,
        name: city,
        country
    } = geoData.results[0];


    const paramsHourly = 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code';
    const paramsDaily = 'temperature_2m_max,temperature_2m_min,weather_code,uv_index_max';

    const urlForecast = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=${paramsHourly}&daily=${paramsDaily}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&timeformat=iso8601`;

    const forecastResponse = await fetch(urlForecast);
    const data = await forecastResponse.json();

    if (!data || !data.current_weather) {
        return undefined
    }

    //Format date
    const currentDateTime = new Date(data.current_weather.time);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = currentDateTime.toLocaleDateString('en-US', options);

    const currentHourISO = data.current_weather.time.substring(0, 13) + ':00'; 

    const currentTimeIndex = data.hourly.time.findIndex(
        time => time.startsWith(currentHourISO)
    );

    const indexToUse = currentTimeIndex !== -1 ? currentTimeIndex : 0;

    const currentWeatherData = {

        location: `${city}, ${country}`,
        date: formattedDate,

        temperature: Math.round(data.current_weather.temperature),
        feelsLike: Math.round(data.hourly.apparent_temperature[indexToUse]),
        humidity: Math.round(data.hourly.relative_humidity_2m[indexToUse]),
        precipitation: data.hourly.precipitation[indexToUse].toFixed(2),
        wind: Math.round(data.current_weather.windspeed),
        weatherCode: data.current_weather.weathercode,
    };

    const hourlyTimes = data.hourly.time;
    const hourlyTemps = data.hourly.temperature_2m;
    const hourlyWeatherCodes = data.hourly.weather_code;

    const hourlyForecast = hourlyTimes.slice(indexToUse, indexToUse + 8).map((time, index) => {

        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hour12: true
        });

        const formattedHour = formatter.format(new Date(time));

        const absoluteIndex = indexToUse + index;

        return {
            hour: formattedHour, 
            temp: Math.round(hourlyTemps[absoluteIndex]),
            weatherCode: hourlyWeatherCodes[absoluteIndex],
        };
    });

    const dailyForecast = data.daily.time.map((time, index) => {
        const dayTime = new Date(time);
        return {

            day: dayTime.toLocaleDateString('en-US', { weekday: 'short' }),
            maxTemp: Math.round(data.daily.temperature_2m_max[index]),
            minTemp: Math.round(data.daily.temperature_2m_min[index]),
            weatherCode: data.daily.weather_code[index]
        };
    });

    return {
        currentData: currentWeatherData,
        daily: dailyForecast,
        hourly: hourlyForecast
    };
}