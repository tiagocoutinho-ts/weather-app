import style from "./style.module.css"

export default function DailyForecast({ day, maxTemp, minTemp, img }) {
    return (
        <div className={style.cardDailyForecast}>
            <div className={style.daily}>
                <p>{day}</p>
                <img src={img} alt="icon-weather" className={style.img} />
                <div className={style.temp}>
                    <p>{minTemp}&deg;</p>
                    <p>{maxTemp}&deg;</p>
                </div>
            </div>
        </div>

    )
}