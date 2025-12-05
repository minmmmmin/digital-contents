"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Dispatch, SetStateAction } from "react";

interface MapProps {
  view: 'split' | 'map' | 'timeline';
  setView: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

// 初期表示位置（今は日本大学文理学部）
const center = {
  lat: 35.662186020148546,
  lng: 139.63409803900635,
};


export default function Map({ view, setView }: MapProps) {
  return (
    <div className="relative w-full h-full">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        {/* いったん全部要素は載せています */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: false,
            gestureHandling: "greedy",
          }}
        >
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
