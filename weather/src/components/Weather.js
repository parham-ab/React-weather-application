import React, { useState } from "react";
import axios from "axios";
// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// icons
import { RiTempColdLine } from "react-icons/ri";
import { FaFire } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { notify } from "../functions/toast";

const Weather = () => {
  const [city, setCity] = useState("");
  const [myData, setMyData] = useState([]);

  //   submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a96370fc68b837af41891380246f1463&units=metric`;
    axios
      .get(baseURL)
      .then((response) => setMyData(response.data))
      .catch((error) => {
        notify("error", "City Invalid!");
      });
    // clear input
    setCity("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">search</button>
      </div>
      {/* displaying results */}
      <div className="container">
        <div className="result-container">
          {myData.base ? (
            <div className="card">
              <div className="location">
                <div>{myData.name}</div>
                <div className="country">{myData.sys.country}</div>
              </div>
              <img
                src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${myData.weather[0]["icon"]}.svg`}
                alt="icon"
              />
              <div className="weather-state">
                <p>{myData.weather[0].description}</p>
                <p className="temp">{myData.main.temp.toFixed()} °C</p>
              </div>
              <div className="weather-details">
                <div>
                  <p>
                    <FaFire className="hot" />
                    <span className="details-value">
                      {myData.main.temp_max} °C
                    </span>
                  </p>
                  <p>
                    <RiTempColdLine className="cold" />
                    <span className="details-value">
                      {myData.main.temp_min} °C
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <WiHumidity className="humidity" />
                    <span className="details-value">
                      {myData.main.humidity} %
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Weather;
