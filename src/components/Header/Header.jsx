import classes from "./Header.module.css";
import { LocationIcon, SearchIcon } from "../SvgIcons";
import { useState, useCallback, useMemo, useEffect } from "react";
import OpenCage from "opencage-api-client";
import useStore from "../../hooks/useStore";

const Header = () => {
  const [name, setName] = useState("Mumbai");
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // 51.5074456&lon=-0.1277653
  const { data, setData } = useStore();
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=aca8465e6f8365434932759f1401e822`
          );

          if (!weatherResponse.ok) {
            throw new Error("something went wrong");
          }

          const response = await weatherResponse.json();
          const next5DaysData = [];
          const processedDays = new Set(); // To keep track of processed days

          response.list.forEach((item) => {
            const itemDate = new Date(item.dt * 1000);
            const dayKey = `${itemDate.getDate()}-${itemDate.getMonth() + 1}`; // Using day and month as a key

            // Include the item if it corresponds to a new day
            if (!processedDays.has(dayKey) && next5DaysData.length < 5) {
              console.log(item);
              const convertToCelsius = (kelvin) => kelvin - 273.15;
              const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

              const highTemperatureCelsius = `${Math.round(
                convertToCelsius(item.main.temp_max)
              )}°C`;
              const highTemperatureFahrenheit = `${Math.round(
                convertToFahrenheit(convertToCelsius(item.main.temp_max))
              )}°F`;
              const lowTemperatureCelsius = `${Math.round(
                convertToCelsius(item.main.temp_min)
              )}°C`;
              const lowTemperatureFahrenheit = `${Math.round(
                convertToFahrenheit(convertToCelsius(item.main.temp_min))
              )}°F`;
              next5DaysData.push({
                date: itemDate.toLocaleDateString(),
                weatherType: item.weather[0].main,
                highTemperature: `${highTemperatureCelsius} / ${highTemperatureFahrenheit}`,
                lowTemperature: `${lowTemperatureCelsius} / ${lowTemperatureFahrenheit}`,
                humidity: item.main.humidity,
                sunriseTime: new Date(
                  response.city.sunrise * 1000
                ).toLocaleTimeString(),
                sunsetTime: new Date(
                  response.city.sunset * 1000
                ).toLocaleTimeString(),
              });

              processedDays.add(dayKey);
            }
          });
          setData(next5DaysData);

          console.log(next5DaysData);
          // setForecast(weatherResponse.data.list);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  const inputHandler = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [name]
  );

  const submitHandler = useCallback(async () => {
    try {
      const geocodingResponse = await OpenCage.geocode({
        q: name,
        key: "c829592ffbf44894bca8fcc083243aba",
      });

      console.log(geocodingResponse);

      if (geocodingResponse.results.length > 0) {
        const components = geocodingResponse.results[0];
        const { lat, lng } = components.geometry;
        const city =
          components.components.city ||
          components.components.town ||
          components.components.village;
        const state = components.components.state;
        console.log(components.components);
        console.log(city, state);
        setCity(city);
        setState(state);
        setLatitude(lat);
        setLongitude(lng);
      }
      console.log(longitude, latitude);
    } catch (error) {
      console.log("Error fetching geocoding dat:", error);
    }
  }, [name]);

  return (
    <header>
      <div className={classes.locationWrapper}>
        <div className={classes["location-title"]}>
          <LocationIcon />
          <h3>{`${city}, ${state}`}</h3>
        </div>
        <p className={classes.latlng}>{`${longitude} & ${latitude}`}</p>
      </div>
      <div className={classes["input-wrapper"]} onChange={inputHandler}>
        <input type="text" placeholder="Search your city here.." />
        <div className={classes.srcicon} onClick={submitHandler}>
          <SearchIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
