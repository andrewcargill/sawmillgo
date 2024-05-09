import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Define a center for the map to initialize
const defaultCenter = {
  lat: 63.8258, // Approximate center based on your data
  lng: 20.263,
};

function MyGoogleMap({ trees }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (treeId) => {
    setActiveMarker(treeId); // Set the active marker to the id of the tree
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null); // Reset the active marker when the info window is closed
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U">
           <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
            {/* Test marker */}
            <Marker
    position={{ lat: 63.8258, lng: 20.2630 }}
    title="Test Marker"
  />
        {trees.map(tree => (

          <Marker
            key={tree.id}
            position={{ lat: Number(tree.latitude), lng: Number(tree.longitude) }}
            onClick={() => handleMarkerClick(tree.id)}
            title={`Tree ID: ${tree.id}`} // Optional: title for hover text
          >
            {activeMarker === tree.id && (
              <InfoWindow onCloseClick={handleInfoWindowClose}>
                <div>
                  <h2>Tree Details</h2>
                  <p>ID: {tree.id}</p>
                  <p>Species: {tree.species}</p>
                  <p>Age: {tree.age}</p>
                  <p>Reason for Removal: {tree.reasonForRemoval}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyGoogleMap;
