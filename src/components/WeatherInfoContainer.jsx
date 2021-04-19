import style from './WeatherContainer.module.css'
import React from "react";
import {addLocalCity, changeCityActionCreator, changeUnitActionCreator, requestWeather} from "../redux/weatherReducer";
import Header from "./Header/Header";
import MainInfo from "./WeatherInfo/MainInfo/MainInfo";
import {connect} from "react-redux";
import cn from "classnames"


class WeatherContainer extends React.Component {

    componentDidMount() {
        this.props.requestWeather(this.props.store.currentCity.lat, this.props.store.currentCity.lon, this.props.store.currentUnit)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.store.currentCity.id !== prevProps.store.currentCity.id || this.props.store.currentUnit !== prevProps.store.currentUnit) {

            this.props.requestWeather(this.props.store.currentCity.lat, this.props.store.currentCity.lon, this.props.store.currentUnit)
        }
    }


    render() {


        console.log(this.props);

        return <div className={cn(style.appWrapper,
            {[style.appWrapper_clear]: this.props.weatherIndicators.weatherMainDescription === 'Clear'},
            {[style.appWrapper_rain]: this.props.weatherIndicators.weatherMainDescription === 'Rain'},)}>
            <Header
                currentUnit={this.props.currentUnit}
                currentCity={this.props.currentCity}
                cities={this.props.cities}
                localCity={this.props.localCity}
                requestWeather={this.props.requestWeather}
                changeUnit={this.props.changeUnit}
                changeCity={this.props.changeCity}
                addLocalCity={this.props.addLocalCity}/>
            <MainInfo currentUnit={this.props.currentUnit}
                      weatherIndicators={this.props.weatherIndicators}/>
        </div>
    }
}


let mapStateToProps = (store) => (
    {
        currentUnit: store.weather.currentUnit,
        currentCity: store.weather.currentCity,
        cities: store.weather.cities,
        weatherIndicators: store.weather.weatherIndicators,
        localCity: store.weather.localCity
    });

let mapDispatchToProps = (dispatch) => {

    return {
        requestWeather: (lat, lon, units) => {
            dispatch(requestWeather(lat, lon, units));
        },
        changeUnit: (unit) => {
            dispatch(changeUnitActionCreator(unit))
        },
        changeCity: (city) => {
            dispatch(changeCityActionCreator(city))
        },
        addLocalCity: (lat, lon, units) => {
            dispatch(addLocalCity(lat, lon, units))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);