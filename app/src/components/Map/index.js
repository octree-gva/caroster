import React from "react";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ width = "100%", height = "20rem", position }) => {
  return (
    <LeafletMap center={position} zoom={13} style={{ width, height }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}></Marker>
    </LeafletMap>
  );
};

export default Map;
