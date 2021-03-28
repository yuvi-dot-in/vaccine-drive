import React, { useEffect, useState } from "react";
import { Card, FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import "./Tracker.css";
import LineGraph from "./Components/LineGraph";
import Map from "./Components/Map";
import "leaflet/dist/leaflet.css";

function Vaccine() {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({
    lat: 13.137879,
    lng: 80.097166,
  });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  const onCountryChange = async (event) => {
    console.log(countryCode);
    setCountryCode(event.target.value);
    console.log(countryCode);
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log(data.countryInfo);
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
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
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountries(countries);
  }, [countries]);

  return (
    <div className="tracker-app">
      <div className="app-top">
        <div className="app-left">
          <div className="tracker-app-header">
            <h1>Covid-19 Vaccination Stats</h1>
            <FormControl className="drop-down">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={countryCode}
              >
                <MenuItem value="Worldwide">World Wide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app_stats">
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="💉 People Vaccinated"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
              active={casesType === "cases"}
            />
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="😷 People Yet to Vaccinate"
              cases={""}
              active={casesType === "recovered"}
              total={countryInfo.recovered}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="😨 People Had SideEffects"
              active={casesType === "deaths"}
              cases={""}
              total={countryInfo.deaths}
            />
          </div>
        </div>
        <Card className="app-right">
          <LineGraph casesType={casesType} />
        </Card>
      </div>
      <div className="app-bottom">
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  );
}

export default Vaccine;
