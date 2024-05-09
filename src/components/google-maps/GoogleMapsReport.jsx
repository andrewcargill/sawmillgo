import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import  logImage from '../../media/images/log.png';


const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 63.8258,
  lng: 20.2630,
};


function GoogleMapsReport({ trees }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
      version: "weekly",
      libraries: ["marker"]
    });

    loader.load().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15,
        mapId: "56127499ee1ce2ef"
      });

      setMap(map);

      google.maps.importLibrary("marker").then(() => {
        trees.forEach(tree => {
          const { AdvancedMarkerElement } = google.maps.marker;
          new AdvancedMarkerElement({
            position: { lat: tree.latitude, lng: tree.longitude },
            map: map,
            title: `Tree ID: ${tree.id}`,

            
          });
        });
      });
    });
  }, [trees]);

  return (
    <div ref={mapRef} style={containerStyle} />
  );
}

export default GoogleMapsReport;
