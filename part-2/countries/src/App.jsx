import { useEffect, useState } from "react";
import axios from "axios";
import CountryDisplay from "./components/CountryDisplay";

function App() {
  const [countries, setCountries] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [query, setQuery] = useState("");

  function queryChangeHandler(event) {
    setQuery(event.target.value);
  }

  function selectCountryHandler() {
    let country = countriesToShow.filter((country) => country.cca3 === this);
    setCountriesToShow(country);
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all/")
      .then((data) => setCountries(data.data));
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }
    let updatedCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setCountriesToShow(updatedCountries);
  }, [query, countries]);

  useEffect(() => {
    if (countriesToShow.length !== 1) return;
  }, [countriesToShow]);

  return (
    <div>
      Find countries: <input value={query} onChange={queryChangeHandler} />
      {countries && (
        <CountryDisplay
          countries={countriesToShow}
          onCountrySelect={selectCountryHandler}
        />
      )}
    </div>
  );
}

export default App;
