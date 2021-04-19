import style from './MainInfo.module.css'
import React from "react";
import Description from "../description/Description";
import cloud from '../../../assets/cloud.svg'
import partlyCloudy from '../../../assets/partlyCloudy.svg'
import rain from '../../../assets/rain.svg'
import storm from '../../../assets/storm.svg'
import sun from '../../../assets/sun.svg'
import mist from '../../../assets/mist.svg'
import snow from '../../../assets/snowy.svg'
import {ReactSVG} from "react-svg";

const MainInfo = (props) => {

    let icon;
    switch (props.weatherIndicators.weatherMainDescription) {
        case "Clouds":
            props.weatherIndicators.weatherDescription === 'облачно с прояснениями' ? icon = partlyCloudy : icon = cloud;
            break;
        case "Rain":
            icon = rain;
            break;
        case "Thunderstorm":
            icon = storm;
            break;
        case "Clear":
            icon = sun;
            break;
        case "Mist":
            icon = mist;
            break;
        case "Snow":
            icon = snow;
            break;
        default: break
    }

    return <div className={style.mainInfo_wrapper}>
        <div className={style.mainInfo_block}>
            <div className={style.mainInfo_blockWithTemp}>
                <div className={style.mainInfo_icon}>
                    <ReactSVG src={icon}/>
                </div>
                <div className={style.mainInfo_temp}>
                    {Math.round(props.weatherIndicators.temp)}
                    <span className={style.mainInfo_temp_degree}>o</span>
                </div>
            </div>
            <div className={style.mainInfo_blockWithDescription}>
                {props.weatherIndicators.weatherDescription.charAt(0).toUpperCase() + props.weatherIndicators.weatherDescription.slice(1)}
            </div>
        </div>

        <Description currentUnit={props.currentUnit}
                     weatherIndicators={props.weatherIndicators}/>
    </div>
};

export default MainInfo;