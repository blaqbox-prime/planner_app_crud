import React, { useState, useEffect, useLayoutEffect } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  // const [usersCity, setUsersCity] = useState("Polokwane");

  useEffect(() => {
      getWeatherReport();
    },[]);
  
  const WEATHER_API_KEY = "1fe4edb33ff2e81398999828f50768fc";


  const setWeatherSymbol = (condition) => {

    switch (condition) {
      case 'Thunderstorm': return "/images/weather/storm.svg";
      case 'Rain': return "/images/weather/heavy-rain.svg";
      case 'Drizzle': return "/images/weather/light-rain.svg"
      case 'Snow' : return "/images/weather/snow.svg";
      case 'Clouds': return "/images/weather/partly-cloudy-day.svg";
      case 'Clear' : return "/images/weather/sun.svg";
      default: return "/images/weather/sun.svg";
    }
    
  }

  const getWeatherReport = () => {

    const weatherReport = sessionStorage.getItem("weather_report");
    const needsUpdate = () => {
      const currentTime = new Date();
      const lastUpdate = new Date(JSON.parse(sessionStorage.getItem("last_upate")));

      if (currentTime.getTime() - lastUpdate.getTime() > 10800000){
        return true;
      } else {
        return false;
      }

    }
  
    if(weatherReport !== null && !needsUpdate()){console.log(JSON.parse(weatherReport)); return setWeather(JSON.parse(weatherReport))} 
    else {
        console.log('report needs update. Now fetching from api')
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Polokwane&appid=${WEATHER_API_KEY}`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              setWeather(data);  
              localStorage.setItem('weather_report', JSON.stringify(data));
              localStorage.setItem('last_update',JSON.stringify(new Date()));
          })
            .catch((error) => {
              console.log(error);
            });
    }

  }

  const kelvinToCelcius = (temperature) => {
      return Math.floor(temperature - 273.15);
  }

  return (
    <div className="Weather">
      <div className="Weather__header">
          <div className="weather__city">Polokwane</div>
          <Time/>
      </div>
      {/* ===================================== */}
      <div className="Weather__forecast">
        <img src={weather != null && setWeatherSymbol(weather.weather[0].main)} alt="weather condition" className="Weather__conditionImg" />
        <h2 className="Weather__condition">{weather != null && weather.weather[0].description}</h2>
      </div>
      {/* ============================= */}
      <div className="Weather__detailsContainer">
        <div className="">
          <ul className="Weather__details">
            <li><img src="/images/weather/windy.svg" alt="" className="Weather__icon" /><p className="Weather__windSpeed">8km/h</p></li>
            <li><img src="/images/weather/light-rain.svg" alt="" className="Weather__icon" /><p className="Weather__rainChance">8%</p></li>
            <li><img src="/images/weather/sun.svg" alt="" className="Weather__icon" /><p className="Weather__sunHours">8h</p></li>
          </ul>
        </div>
        <h1 className="Weather__temp">{weather != null ? kelvinToCelcius(weather.main.temp) : 0}&deg;</h1>
      </div>
    </div>
  );
}

export default Weather;

function Time(){
  const [time, setTime] = useState("00:00");
  useEffect(() => {
    getTime();
  }, []);
  

  const getTime = () => {
    setInterval(() => {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      setTime(`${hours > 9 ? hours : `0${hours}`} : ${minutes > 9 ? minutes : `0${minutes}`}`);
    },1000);
  }

  return(<div className="weather__time">{time}</div>);
}