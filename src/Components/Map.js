import React from "react";
import { TileLayer, Marker, Popup, MapContainer, useMapEvent } from "react-leaflet";
import {Icon} from "leaflet"; //for creating the instance of customized icon
import "../Css/Map.css";
import {addressList} from "../Address/AddressData";
import Location from "../Images/location.png";
import PopUp from "./PopUp";

const MyMap = () => {

    const customizedMarker = new Icon({
        iconUrl : Location,
        iconSize: [28, 35],
      //   iconAnchor: [22, 94],
        popupAnchor: [-5, -5],
    });

    const SetClick = ()=>{
        const map = useMapEvent("click" , (e)=>{   //added the click event
            // console.log(e);
            map.setView(e.latlng,map.getZoom());  //setting the view to the clicked position
            map.flyTo(e.latlng,10);  //zooming it to the zomm level of 10
            // console.log(map);
        });

        console.log(map.getZoom());
        return null;
    }

    return (
        <>
                <MapContainer center={[ 20.5937,78.9629]} zoom={6} style={{ height: '75vh', width: '90vw' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                     addressList.map((office,index) =>(
                     <Marker key={index} position={[office.geometry.coordinates[1] , office.geometry.coordinates[0]]}  icon={customizedMarker}>
                         <Popup>
                            <PopUp office={office}/>
                         </Popup>
                     </Marker>
                    ))}
                    
                   <SetClick />
                </MapContainer>
        </>
    );
}

export default MyMap;