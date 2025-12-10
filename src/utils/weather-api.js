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
 
    const urlForecast = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=${paramsHourly}&daily=${paramsDaily}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`;
    
    const forecastResponse = await fetch(urlForecast);
    const data = await forecastResponse.json();
    
    if (!data || !data.current_weather) {
        return undefined
    }
    
    //Format date
    const currentDateTime = new Date(data.current_weather.time);
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = currentDateTime.toLocaleDateString('en-US', options);


    const currentWeatherData = {
        
        location: `${city}, ${country}`,
        date: formattedDate,
    
        temperature: Math.round(data.current_weather.temperature),

        feelsLike: Math.round(data.hourly.apparent_temperature[0]),

        humidity: Math.round(data.hourly.relative_humidity_2m[0]),
        
        wind: Math.round(data.current_weather.windspeed),
        
        precipitation: data.hourly.precipitation[0].toFixed(2), 
        weatherCode: data.current_weather.weathercode,
    };

    
    const hourlyForecast = data.hourly.time.slice(0, 10).map((time, index) => {
        const hourTime = new Date(time);
        return {
        
            hour: hourTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }), 
            temp: Math.round(data.hourly.temperature_2m[index]),
            weatherCode: data.hourly.weather_code[index],
            uvIndex: Math.round(data.daily.uv_index_max[index])
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
        hourly: hourlyForecast,
        daily: dailyForecast
    };
}
