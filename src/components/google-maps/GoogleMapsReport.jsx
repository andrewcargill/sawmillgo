
import React, { useEffect, useRef, useState } from 'react';
import loader from '../../utils/mapLoader';  // Adjust the path as necessary


// const tourStops = [
//     {
//       position: { lat: 34.8791806, lng: -111.8265049 },
//       title: "Boynton Pass",
//     },
//     {
//       position: { lat: 34.8559195, lng: -111.7988186 },
//       title: "Airport Mesa",
//     },
//     {
//       position: { lat: 34.832149, lng: -111.7695277 },
//       title: "Chapel of the Holy Cross",
//     },
//     {
//       position: { lat: 34.823736, lng: -111.8001857 },
//       title: "Red Rock Crossing",
//     },
//     {
//       position: { lat: 34.800326, lng: -111.7665047 },
//       title: "Bell Rock",
//     },
//   ];



const containerStyle = {
  width: '100%',
  height: '400px',
};

// const defaultCenter = {
//   lat: 63.8258,
//   lng: 20.2630,
// };


function GoogleMapsTour( { trees }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const defaultCenter = trees[0].position;

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 17,
        mapId: "56127499ee1ce2ef"  // Replace with your actual Map ID
      });

      setMap(map);

      google.maps.importLibrary("marker").then(() => {
        trees.forEach(({ position, title, id }, i) => {
          const { AdvancedMarkerElement, PinElement } = google.maps.marker;
          const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: new PinElement({
            //   glyph: `${i + 1}`,
              glyph: id,
              scale: 1.5,
              background: "white",
            }).element
          });

          // Additional logic as necessary
        });
      });
    }).catch(error => {
      console.error("Failed to load Google Maps", error);
    });
  }, [trees]);

  return <div ref={mapRef} style={containerStyle} />;
}

export default GoogleMapsTour;

