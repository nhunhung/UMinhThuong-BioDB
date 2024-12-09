import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = () => {
    const defaultLat = 9.5715; // Vĩ độ của Vườn Quốc gia U Minh Thượng
    const defaultLng = 105.1055; // Kinh độ của Vườn Quốc gia U Minh Thượng

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full h-96 max-w-4xl bg-white shadow-lg rounded-lg">
                <LoadScript googleMapsApiKey="AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s">
                    <GoogleMap
                        mapContainerClassName="w-full h-full"
                        center={{ lat: defaultLat, lng: defaultLng }}
                        zoom={14} // Zoom mặc định để hiển thị chi tiết
                    >
                        <Marker position={{ lat: defaultLat, lng: defaultLng }} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Map;
