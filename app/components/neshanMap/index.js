import React, { useState, useEffect, useRef } from "react";
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
  const mapRef = useRef(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup function
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setIsMapInitialized(false);
    };
  }, []);

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
          if (isMapInitialized) return;

          // Create marker with default icon
          let marker = L.marker(checkCenter()).addTo(myMap);

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

          // Store map instance and mark as initialized
          mapRef.current = myMap;
          setIsMapInitialized(true);
        }}
      />
    </div>
  );
};

export default CustomNeshanMap;
