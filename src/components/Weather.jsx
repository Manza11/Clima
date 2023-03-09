import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isFarenheit, setIsFarenheit] = useState(true);
  const [icon, setIcon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getCity(e.target.setCity.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=73497af22abcdd93b0e6d282f2ca609b`
        )
        .then((resp) => setWeatherData(resp.data))
        .catch((error) => console.error(error));
    });
  }, []);

  const getCity = (searchValue) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=73497af22abcdd93b0e6d282f2ca609b`
      )
      .then((resp) => setWeatherData(resp.data))
      .catch((error) => console.error(error));
  };

  const celsius = Math.floor(weatherData.main?.temp - 273);
  const farenheit = Math.floor(
    ((weatherData.main?.temp - 273.15) * 9) / 5 + 32
  );

  useEffect(() => {
    if (weatherData) {
      showIcon();
    }
  }, [weatherData]);

  const showIcon = () => {
    if (weatherData.weather?.[0].icon == "01d") {
      setIcon("1");
    } else if (weatherData.weather?.[0].icon == "02d") {
      setIcon("2");
    } else if (weatherData.weather?.[0].icon == "03d") {
      setIcon("3");
    } else if (weatherData.weather?.[0].icon == "04d") {
      setIcon("4");
    } else if (weatherData.weather?.[0].icon == "09d") {
      setIcon("5");
    } else if (weatherData.weather?.[0].icon == "10d") {
      setIcon("6");
    } else if (weatherData.weather?.[0].icon == "11d") {
      setIcon("7");
    } else if (weatherData.weather?.[0].icon == "13d") {
      setIcon("8");
    } else if (weatherData.weather?.[0].icon == "50d") {
      setIcon("9");
    }
  };

  return (
    <div className="box_weather">
      <nav className="nav_bar">
        <div className="title_app">Weather App</div>
        <form className="search_city" onSubmit={handleSubmit}>
          <input id="setCity" type="text" placeholder="Buscar ciudad..." />
          <button id="cityButton" type="submit">
            Buscar
          </button>
        </form>
      </nav>
      <div className="info_box">
        <div className="temp_container">
          <h3 className="temperature">
            {isFarenheit ? celsius : farenheit} {isFarenheit ? "°C" : "°F"}
          </h3>
          <img className="icon" src={`/${icon}.svg`} alt="" />
        </div>
        <ul className="list">
          <li>
            <p>
              <span>Nubes: {weatherData.clouds?.all}</span>
            </p>
          </li>
          <li>
            <p>
              <span>Viento: {weatherData.wind?.speed}</span>
            </p>
          </li>
          <li>
            <p>
              <span>Presion: {weatherData.main?.pressure}hPa</span>
            </p>
          </li>
          <li>
            <p>Estado: {weatherData.weather?.[0].description}</p>
          </li>
        </ul>
        <h3 className="title">
          {weatherData.name}, {weatherData.sys?.country}
        </h3>
      </div>
      <button className="but" onClick={() => setIsFarenheit(!isFarenheit)}>
        Cambiar °F/°C
      </button>
    </div>
  );
};

export default Weather;
