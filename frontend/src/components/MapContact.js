import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

const markerIcon = new L.Icon({
    iconUrl: "./assets/images/position.webp",
    iconSize: [30, 30],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const MarkersMap = () => {
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <div className="row">
            <div className="col text-center">
                <div className="col">
                    <MapContainer 
                        center={[9.5715, 105.1055]} 
                        zoom={ZOOM_LEVEL} 
                        ref={mapRef} 
                        style={{ height: "700px", width: "400px" }}
                    >
                        <TileLayer
                            url={osm.maptiler.url}
                            attribution={osm.maptiler.attribution}
                        />
                        <Marker 
                            position={[9.5715, 105.1055]} 
                            icon={markerIcon}
                        />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default MarkersMap;
