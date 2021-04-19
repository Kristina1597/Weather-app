import style from './Header.module.css'
import React, {useState} from "react";
import ChangeCityForm from "./forms/ChangeCityForm";
import ChangeUnitsForm from "./forms/ChangeUnitsForm";
import {ReactSVG} from "react-svg";
import location from "./../../assets/location.svg"
import cn from "classnames"

const Header = (props) => {
    let [isEditMode, setEditMode] = useState(false);
    const [isLocalCityChosen, setLocalCityChosen] = useState(false);

    let turnOnEditMode = () => {
        setEditMode(true)
    };

    let turnOffEditMode = () => {
        setEditMode(false)
    };

    let getPersonalForecast = () => {
        props.localCity && props.localCity.length >= 2
            ? props.addLocalCity(props.localCity[0], props.localCity[1], props.currentUnit)
            : props.addLocalCity(props.localCity.lat, props.localCity.lon, props.currentUnit)
    };

    let onChooseLocalCity = () => {
        getPersonalForecast();
        setLocalCityChosen(true);
    };

    return <div className={style.headerWrapper}>
        {isEditMode ?
            <div className={style.header_form}>
                <div className={style.header_form_editState}>
                    <ChangeCityForm isEditMode={isEditMode}
                                    turnOffEditMode={turnOffEditMode}
                                    requestWeather={props.requestWeather}
                                    localCity={props.localCity}
                                    isLocalCityChosen={isLocalCityChosen}
                                    setLocalCityChosen={setLocalCityChosen}
                                    changeCity={props.changeCity}
                                    cities={props.cities}
                                    currentCity={props.currentCity}
                    />
                    <div className={cn(style.unitForm, {[style.unitForm_mobile]: isEditMode})}>
                        <ChangeUnitsForm requestWeather={props.requestWeather}
                                         currentUnit={props.currentUnit}
                                         changeUnit={props.changeUnit}
                        />
                    </div>
                </div>
            </div>
            : <div className={style.header_form}>
                <div className={style.header_cityForm}>
                    <div className={style.header_cityForm_currentCity}>
                        {isLocalCityChosen ? props.localCity.name : props.currentCity.name}
                    </div>
                    <div className={style.unitForm}>
                        <ChangeUnitsForm requestWeather={props.requestWeather}
                                         currentUnit={props.currentUnit}
                                         changeUnit={props.changeUnit}
                        />
                    </div>
                </div>
                <div className={style.header_cityForm_settings}>
                    <button className={style.cityForm_changeCityButton}
                            onClick={turnOnEditMode}>
                        Сменить город
                    </button>
                    <button onClick={onChooseLocalCity} className={style.cityForm_changeMyLocationButton}>
                        <ReactSVG src={location}/>Мое местоположение
                    </button>
                </div>
            </div>}
    </div>
};

export default Header;