import {cityAPI, weatherAPI} from "../API/apiWeather";

const GET_WEATHER = "GET_WEATHER";
const CHANGE_UNIT = "CHANGE_UNIT";
const CHANGE_CITY = "CHANGE_CITY";
const ADD_LOCAL_CITY = "ADD_CITY";

const units = ['metric', 'imperial'];

const citiesList = [
    {id: 'vladivostok', name: 'Владивосток', lat: 43.1056, lon: 131.8735, isCurrent: false},
    {id: 'volgograd', name: 'Волгоград', lat: 48.7194, lon: 44.5018, isCurrent: false},
    {id: 'kazan', name: 'Казань', lat: 55.7887, lon: 49.1221, isCurrent: false},
    {id: 'sochi', name: 'Сочи', lat: 43.6, lon: 39.7303, isCurrent: false},
    {id: 'krasnoyarsk', name: 'Красноярск', lat: 56.0097, lon: 92.7917, isCurrent: false},
    {id: 'moscow', name: 'Москва', lat: 55.7522, lon: 37.6156, isCurrent: false},
    {id: 'novosibirsk', name: 'Новосибирск', lat: 55.0415000, lon: 82.9346000, isCurrent: true},
    {id: 'tyumen', name: 'Тюмень', lat: 55.7887400, lon: 49.1221400, isCurrent: false},
    {id: 'ufa', name: 'Уфа', lat: 54.7430600, lon: 55.9677900, isCurrent: false}
];

const setInitialState = (el) => {
    let currentCity;
    switch (el) {
        case 'cities':
            return Array.from(citiesList);
        case 'units':
            return units;
        case 'current':
            currentCity = citiesList.find((c) => {
                return c.isCurrent
            });
            return currentCity;
        case 'personalLocation': {
            let currentCoords = [];
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLat = position.coords.latitude.toFixed(4);
                const currentLon = position.coords.longitude.toFixed(4);
                currentCoords.push(currentLat, currentLon);
            });
            return currentCoords
        }

        default:
            return
    }
};

const initialState = {
    weatherIndicators: {
        temp: '',
        weatherMainDescription: '',
        weatherDescription: '',
        windSpeed: '',
        windDirection: '',
        pressure: '',
        humidity: '',
        probabilityPrecipitation: ''
    },

    cities: setInitialState('cities'),
    units: setInitialState('units'),
    currentCity: setInitialState('current'),
    currentUnit: 'metric',
    localCity: setInitialState('personalLocation')
};

const weatherReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_WEATHER:
            return {
                ...state,
                weatherIndicators: action.weatherIndicators,
            };
        case CHANGE_UNIT:

            return {
                ...state,
                currentUnit: action.unit
            };
        case CHANGE_CITY:

            state.cities.forEach((c) => {
                c.name !== action.city.name ? c.isCurrent = false : c.isCurrent = true;
                c.name === action.city ? (state.localCity.isCurrent = false) && (c.isCurrent = true) : c.isCurrent = false;
            });

            if (state.localCity.isCurrent) {
                return {
                    ...state,
                    cities: [...state.cities],
                    currentCity: action.city
                };
            }

            return {
                ...state,
                cities: [...state.cities],
                currentCity: state.cities.find((c) => {
                    return c.name === action.city
                })
            };
        case ADD_LOCAL_CITY:
            return {
                ...state,
                localCity: action.city
            };
        default:
            return {
                ...state
            }
    }
};

export const getWeatherActionCreator = (weatherIndicators) => ({type: GET_WEATHER, weatherIndicators});
export const changeUnitActionCreator = (unit) => ({type: CHANGE_UNIT, unit});
export const changeCityActionCreator = (city) => ({type: CHANGE_CITY, city});
export const addLocalCityActionCreator = (city) => ({type: ADD_LOCAL_CITY, city});

export const requestWeather = (lat, lon, units) => {
    return async (dispatch) => {
        let data = await weatherAPI.getWeather(lat, lon, units);

        let weatherIndicators = {
            temp: data.data.current.temp,
            weatherMainDescription: data.data.current.weather[0].main,
            weatherDescription: data.data.current.weather[0].description,
            windSpeed: data.data.current.wind_speed,
            windDirection: data.data.current.wind_deg,
            pressure: data.data.current.pressure,
            humidity: data.data.current.humidity,
            probabilityPrecipitation: data.data.daily[0].pop
        };

        dispatch(getWeatherActionCreator(weatherIndicators));
    }
};

export const addLocalCity = (lat, lon, units) => {
    return async (dispatch) => {
        let city = await cityAPI.getCity(lat, lon);
        debugger
        let localCity = {
            id: city.data[3].local_names.id,
            name: city.data[3].local_names.ru,
            lat: city.data[3].lat,
            lon: city.data[3].lon,
            isCurrent: true
        };
        dispatch(addLocalCityActionCreator(localCity));
        dispatch(changeCityActionCreator(localCity));
        dispatch(requestWeather(lat, lon, units));
    }
};

export default weatherReducer;