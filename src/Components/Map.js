import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { showDataOnMap1 } from "./util";
import { showDataOnMap2 } from "./util_vacc";

function Map({ countries, casesType, center, zoom, isTrue }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {isTrue
          ? showDataOnMap1(countries, casesType)
          : showDataOnMap2(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
