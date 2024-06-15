import React, { useState } from "react";
import Map from "../Map/Map";
import "./MainPage.css";
import MyScene from "../Texture/MyScene";

const MainPage = () => {
  const [location, setLocation] = useState({ lat: 32, lng: 76, zoom: 13 });
  const [imageId, setImageId] = useState(null);
  const callMapApi = async () => {
    const response = await fetch(`http://localhost:8000/image`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: location.lat,
        long: location.lng,
        zoom: location.zoom,
      }),
    });
    const res = await response.json();
    setImageId(res);
  };

  const handleButtonClick = () => {
    callMapApi();
  };

  const handleCameraChange = (ev) => {
    console.log(ev.detail);
    setLocation({
      lng: ev.detail.center.lng,
      lat: ev.detail.center.lat,
      zoom: ev.detail.zoom,
    });
  };

  return (
    <div>
      {imageId ? (
        <MyScene imageId={imageId} />
      ) : (
        <>
          <Map
            defaultCenter={{ lat: location.lat, lng: location.lng }}
            defaultZoom={location.zoom}
            handleCameraChange={handleCameraChange}
          />
          <button className="mainpage_btn" onClick={handleButtonClick}>
            Click me
          </button>
        </>
      )}
    </div>
  );
};

export default MainPage;
