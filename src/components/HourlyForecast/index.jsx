import style from "./style.module.css"

export default function HourlyForecast({ img, hour, temp }) {
    return (
        <div className={style.contenthour}>
            <div className={style.img_and_hour}>
                <img src={img} alt="icon-weather" className={style.img} />
                <p className={style.hour_text}>{hour}</p>
            </div>
            <div className={style.img_and_hour}>
                <p>{temp}&deg;</p>
            </div>
        </div>
    )
}