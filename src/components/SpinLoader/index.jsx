import style from "./style.module.css"

export default function SpinLoader() {
    return (
        <div className={style.content}>
            <div className={style.spinner}></div>
            <p>Loading...</p>
        </div>
    )
}