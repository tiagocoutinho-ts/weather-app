import style from "./style.module.css"

export default function CurrentWeatherCard(
  { city,
    date,
    temperature,
    feelsLike,
    humidity,
    wind,
    precipitation
  }) {

  return (
    <section className={style.WeatherCard}>
      <div className={style.contentmain}>
        <div>
          <p className={style.city}>{city}</p>
          <p className={style.date}>{date}</p>
        </div>
        <h1 className={style.maintemp}>{temperature}&deg;</h1>
      </div>

      <div className={style.more}>
        <div className={style.boxweather}>
          <p className={style.title}>Feels Like</p>
          <p className={style.infotime}>{feelsLike}&deg;</p>

        </div>

        <div className={style.boxweather}>
          <p className={style.title}>Humidity</p>
          <p className={style.infotime}>{humidity}%</p>
        </div>

        <div className={style.boxweather}>
          <p className={style.title}>Wind</p>
          <p className={style.infotime}>{wind} mph</p>
        </div>

        <div className={style.boxweather}>
          <p className={style.title}>Precipitation</p>
          <p className={style.infotime}>{precipitation} in</p>
        </div>
      </div>
    </section>
  )
}