import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const NeshanMap = dynamic(() => import("react-neshan-map-leaflet"), {
  ssr: false,
});

const CustomNeshanMap = ({
  center = [36.1463, 49.218], // Abhar, Zanjan coordinates
  actionHandler,
  zoom = 15, // Increased zoom for better city view
  width = "100%",
  height = "350px",
  disabled = false,
}) => {
  function checkCenter() {
    if (!center[0] || !center[1]) {
      return [36.1463, 49.218]; // Abhar, Zanjan coordinates
    } else {
      return center;
    }
  }

  return (
    <div className="centered">
      <NeshanMap
        options={{
          key: "web.6roYlkOpjDq1HaRkFGL6upTQvNY542u1y9w6J8Gm",
          maptype: "dreamy",
          poi: true,
          traffic: false,
          center: checkCenter(),
          zoom: zoom,
        }}
        style={{
          width: width,
          height: height,
          marginTop: "2rem",
          zIndex: "1",
          borderRadius: "30px",
        }}
        onInit={(L, myMap) => {
          // Create custom icon
          const customIcon = L.icon({
            iconUrl: "/images/marker.png",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          // Create marker with custom icon
          let marker = L.marker(checkCenter(), { icon: customIcon }).addTo(
            myMap
          );

          // Add popup to marker with more detailed information
          marker
            .bindPopup(
              `
            <div dir="rtl" class="text-right">
              <strong>امید الکترونیک عزیزخانی</strong><br>
              ابهر، زنجان
            </div>
          `
            )
            .openPopup();

          if (!disabled) {
            myMap.on("click", function (e) {
              marker.setLatLng(e.latlng);
              actionHandler(e.latlng.lat, e.latlng.lng);
            });
          }
        }}
      />
    </div>
  );
};

export default CustomNeshanMap;
