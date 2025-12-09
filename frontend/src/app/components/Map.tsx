"use client";


import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Dispatch, SetStateAction } from "react";

interface MapProps {
  view?: 'split' | 'map' | 'timeline';
  setView?: Dispatch<SetStateAction<'split' | 'map' | 'timeline'>>;
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
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            地図の読み込みに失敗しました
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-neutral"></span>
          <div className="text-lg font-semibold mt-4">
            読み込み中…
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="relative w-full h-full">
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
    </div>
  );
}
