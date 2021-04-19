import axios from "axios";

const API_KEY = 'f8e1f3d9e5b4948898ecf01f191c512e';

export const weatherAPI = {
    getWeather(lat, lon, units){
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly, minutely&appid=${API_KEY}&units=${units}&lang=ru`);
    },
};

export const cityAPI = {
    getCity(lat, lon) {
        return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=4&appid=${API_KEY}`)
    }
}