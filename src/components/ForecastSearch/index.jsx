    import { useState } from 'react';
    import { fetchWeatherData } from "../../utils/weather-api.js"
    import LogoWeather from "../../assets/images/logo.svg"
    import IconSearch from "../../assets/images/icon-search.svg"
    import style from "./style.module.css"

    export default function ForecastSearch({ setWeatherData, setIsLoading, setError }) {
        const [input, setInput] = useState('');

        async function handlerInput(e) {
            e.preventDefault()
            setIsLoading(true)
            setWeatherData(null)

            try {
                const result = await fetchWeatherData(input)
                setWeatherData(result)
                if (!result) {
                    setError(true)
                } else {
                    setError(false)
                }

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        return (
            <div className={style.main}>

                <div className={style.logo}>
                    <img src={LogoWeather} />
                    
                </div>

                <header className={style.header}>

                    <h1>How's the sky looking today?</h1>

                    <div className={style.search_container}>
                        <form onSubmit={handlerInput}>
                            <div className={style.search_input}>
                                <img className={style.search_icon} src={IconSearch} alt="icon-search" />
                                <input
                                    type="text"
                                    placeholder='Search for a place...'
                                    onChange={({ target }) => setInput(target.value)} />
                            </div>

                            <div>
                                <button type='submit'>Search</button>
                            </div>
                        </form>
                    </div>
                </header>
            </div>
        )
    }