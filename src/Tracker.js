import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./Components/InfoBox";

function Tracker() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };

    getCountries(countries);
  }, []);

  return (
    <div className="tracker-app">
      <div className="tracker-app-header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="drop-down">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="Worldwide">World Wide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={10000} total={120912} />
        <InfoBox title="recovered" cases={10000} total={120912} />
        <InfoBox title="Deaths" cases={10000} total={120912} />
      </div>
    </div>
  );
}

export default Tracker;
