import React, { useState, useEffect } from "react";
import axios from "axios";

function CountryDisplay({ countries, onCountrySelect }) {
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [renderedCountries, setRenderedCountries] = useState(null);
  useEffect(() => {
    if (countries.length === 1)
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital[0].replace(
            " ",
            "%20"
          )}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric`
        )
        .then((data) => {
          setWeather(data.data);
          return data;
        })
        .then((data) => setIcon(data.data.weather[0].icon));
  }, [countries]);
  useEffect(() => {
    if (weather && countries.length === 1) {
      let country = countries[0];
      setRenderedCountries(
        <div>
          <h2>{country.name.common}</h2>
          <div>Capital: {country.capital.join(", ")}</div>
          <div>Area: {country.area}</div>
          <div>
            Languages:{" "}
            <ul>
              {Object.values(country.languages).map((language, idx) => (
                <li key={idx}>{language}</li>
              ))}
            </ul>
          </div>
          <div>
            <img src={country.flags.png} alt={"Flag"} />
          </div>
          <div>
            <h3>Weather in {countries[0].capital[0]}</h3>
            <p>Temperature: {weather.main.temp} Celsius</p>
            {icon && (
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={"Weather condition"}
              />
            )}
            <p>Wind: {weather.wind.speed}</p>
          </div>
        </div>
      );
    }
  }, [weather, countries, icon]);
  useEffect(() => {
    if (countries.length > 10) {
      setRenderedCountries(<p>Too many matches, specify another filter</p>);
    } else if (countries.length === 0) {
      setRenderedCountries(<p>No countries match this filter</p>);
    } else {
      setRenderedCountries(
        <ul>
          {countries.map((country) => (
            <li key={country.name.official}>
              {country.name.common}{" "}
              <button onClick={onCountrySelect.bind(country.cca3)}>
                Details
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }, [countries, onCountrySelect]);
  return <div>{renderedCountries}</div>;
}

export default CountryDisplay;
