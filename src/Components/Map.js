import React from "react";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import "../Css/Map.css";

const MyMap = () => {
    return (
        <>
                    <MapContainer center={[ 20.5937,78.9629]} zoom={4} style={{ height: '75vh', width: '90vw' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
        </>
    );
}

export default MyMap;