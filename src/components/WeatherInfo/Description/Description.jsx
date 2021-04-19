import style from './Description.module.css'
import React from "react";

const Description = (props) => {

    let speedUnit = (props.currentUnit === 'metric') ? ' м/с, ' : " миль/ч, "

    let windDirection;
    if ((0 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 23) || (337 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 360)) {
        windDirection = 'Северный';
    }
    if (24 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 68) {
        windDirection = 'Северо-восточный';
    }
    if (69 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 113) {
        windDirection = 'Восточный';
    }
    if (114 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 158) {
        windDirection = 'Юго-восточный';
    }
    if (159 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 203) {
        windDirection = 'Южный';
    }
    if (204 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 248) {
        windDirection = 'Юго-западный';
    }
    if (249 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 293) {
        windDirection = 'Западный';
    }
    if (294 <= props.weatherIndicators.windDirection && props.weatherIndicators.windDirection <= 336) {
        windDirection = 'Северо-западный';
    }


    return <div className={style.description_wrapper}>
        <div className={style.description_block}>
            <div className={style.description_item}>
                <div className={style.description_item_name}>
                    Ветер
                </div>
                <div className={style.description_item_value}>
                    {props.weatherIndicators.windSpeed + speedUnit + windDirection}
                </div>
            </div>
            <div className={style.description_item}><div className={style.description_item_name}>
                Давление
            </div>
                <div className={style.description_item_value}>
                    {props.weatherIndicators.pressure + ' мм рт. ст.'}
                </div>
            </div>
        </div>
        <div className={style.description_block}>
            <div className={style.description_item}>
                <div className={style.description_item_name}>
                    Влажность
                </div>
                <div className={style.description_item_value}>
                    {props.weatherIndicators.humidity + '%'}
                </div>
            </div>
            <div className={style.description_item}>
                <div className={style.description_item_name}>
                    Вероятность дождя
                </div>
                <div className={style.description_item_value}>
                    {Math.round(props.weatherIndicators.probabilityPrecipitation * 100 )+ '%'}
                </div>
            </div>

        </div>
    </div>
};

export default Description;