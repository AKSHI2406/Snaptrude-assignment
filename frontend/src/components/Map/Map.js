import React from "react";
import { APIProvider, Map as Gmaps } from "@vis.gl/react-google-maps";

const Map = ({defaultCenter,defaultZoom, handleCameraChange}) => {


  return (
    <div style={{ width: 500, height: "500px" }}>
      <APIProvider
        apiKey={"AIzaSyAi5rf8blIHtH69tFGLRKmFRo3QoYDeTiA"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Gmaps
          defaultZoom={defaultZoom}
          styles={{ height: "50", width: "50" }}
          defaultCenter={defaultCenter}
          onCameraChanged={handleCameraChange}
        ></Gmaps>
      </APIProvider>
    </div>
  );
};

export default Map;
