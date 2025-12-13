import { useState } from 'react'
import style from "./App.module.css"
import CurrentWeatherCard from './components/CurrentWeatherCard/index.jsx';
import DailyForecast from './components/DailyForecast/index.jsx';
import HourlyForecast from './components/HourlyForecast/index.jsx';
import SpinLoader from './components/SpinLoader/index.jsx';
import ForecastSearch from './components/ForecastSearch/index.jsx';
import { weatherIconMap } from "./utils/weatherMap.js"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <main>
      <ForecastSearch
        setWeatherData={setWeatherData}
        setIsLoading={setIsLoading}
        setError={setError}
      />

      {isLoading && (
        <SpinLoader />
      )}

      {error && !isLoading && (
        <div className={style.notfound}>
          No search result found!
        </div>
      )}

      <div className={style.card_weather}>
        <div className={style.card_weather_and_daily}>
          {weatherData && (
            <CurrentWeatherCard
              city={weatherData.currentData.location}
              temperature={weatherData.currentData.temperature}
              date={weatherData.currentData.date}
              feelsLike={weatherData.currentData.feelsLike}
              humidity={weatherData.currentData.humidity}
              precipitation={weatherData.currentData.precipitation}
              wind={weatherData.currentData.wind}
            />
          )}

          {weatherData && (
            <section className={style.dailyForecast}>
              <p className={style.subtitles_daily}>Daily forecast</p>
              <div className={style.dailyrow}>
                {weatherData.daily.map((day, index) => {
                  const iconSource = weatherIconMap[day.weatherCode]
                  return (
                    <DailyForecast
                      key={index}
                      day={day.day}
                      img={iconSource}
                      maxTemp={day.maxTemp}
                      minTemp={day.minTemp}
                    />
                  )
                })}
              </div>
            </section>
          )}
        </div>

        <div>
          {weatherData && (
            <section className={style.hourlyforecast}>
              <p className={style.subtitles_hourly}>Hourly forecast</p>
              {weatherData.hourly.map((hour, index) => {
                const iconSource = weatherIconMap[hour.weatherCode]
                return (
                  <HourlyForecast
                    key={index}
                    img={iconSource}
                    hour={hour.hour}
                    temp={hour.temp}
                  />
                )
              })}
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

export default App