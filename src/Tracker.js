import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Menu,
  MenuItem,
  Select,
} from "@material-ui/core";

function Tracker() {
  const [countries, setCountries] = useState([]);
  const [con, setCon] = useState("World Wide");

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
    <div class="tracker-app">
      <div class="tracker-app-header">
        <h1>Covid-19 Tracker</h1>
        <FormControl class="drop-down">
          <Select variant="outlined" value={con}>
            {console.log(con)}
            <MenuItem value="world">World Wide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            {/* <MenuItem value="world">${coun}</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Tracker;
