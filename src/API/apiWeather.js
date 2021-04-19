import axios from "axios";

const API_KEY = 'API_KEY';

export const weatherAPI = {
    getWeather(lat, lon, units){
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly, minutely&appid=${API_KEY}&units=${units}&lang=ru`);
    },
};

export const cityAPI = {
    getCity(lat, lon) {
        return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=4&appid=${API_KEY}`)
    }
};