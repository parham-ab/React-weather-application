import React, { useState, useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import {
  CardContent,
  Box,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
// react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../functions/toast";
// icons
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { WiHumidity } from "react-icons/wi";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

const Weather = () => {
  const [city, setCity] = useState("");
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=a96370fc68b837af41891380246f1463&units=metric`
      )
      .then((response) => setMyData(response.data))
      .catch((error) => {
        notify("error", "City Invalid!");
      });
  }, []);
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
      <Box component="div" className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button type="submit">
          {/* Search */}
          <SearchIcon />
        </Button>
      </Box>
      {/* displaying results */}
      <Box component="div" className="result-container ">
        {myData.base && (
          <Card className="container" sx={{ maxWidth: 310 }}>
            <CardActionArea>
              <img
                src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${myData.weather[0]["icon"]}.svg`}
                alt="icon"
                width={180}
                style={{ padding: "20px 0" }}
              />
              <Typography variant="h5" component="div" fontWeight={700}>
                {myData.name}
                <sup>
                  <Chip
                    className="country"
                    icon={<LocationOnIcon />}
                    size="small"
                    label={myData.sys.country}
                  />
                </sup>
              </Typography>

              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  display="flex"
                  justifyContent="space-evenly"
                >
                  <Typography
                    className="weather-state"
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={700}
                  >
                    {myData.weather[0].description}
                  </Typography>
                  <Typography
                    className="weather-state"
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontWeight={700}
                  >
                    {myData.main.temp.toFixed()}°C
                  </Typography>
                </Typography>

                <Typography
                  sx={{ display: "flex", justifyContent: "space-around" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  <Typography
                    sx={{ display: "flex" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      fontWeight={700}
                    >
                      <LocalFireDepartmentIcon
                        style={{ color: "#ee4300", margin: " -6px 1px" }}
                      />
                      {myData.main.temp_max.toFixed()} °C
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      fontWeight={700}
                    >
                      <DeviceThermostatIcon
                        style={{ color: "#4cb1ca", margin: " -6px 1px" }}
                      />
                      {myData.main.temp_min.toFixed()} °C
                    </Typography>
                  </Typography>

                  <Typography
                    className="humidity"
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontWeight={700}
                  >
                    <WiHumidity />
                    {myData.main.humidity} %
                  </Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Box>
      <ToastContainer />
    </form>
  );
};

export default Weather;
