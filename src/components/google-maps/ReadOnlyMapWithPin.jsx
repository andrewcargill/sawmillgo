import React, { useEffect, useRef } from 'react';
import loader from '../../utils/mapLoader';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = { lat: 0, lng: 0 };

const ReadOnlyMapWithPin = ({ location }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: location || defaultCenter,
        zoom: 10,
        mapId: "56127499ee1ce2ef",
        mapTypeId: "roadmap",
      });

      if (location) {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: false,
        });

        markerRef.current = marker;
      }
    }).catch(error => {
      console.error("Failed to load Google Maps", error);
    });
  }, [location]);

  useEffect(() => {
    if (markerRef.current && location) {
      markerRef.current.setPosition(location);
    }
  }, [location]);

  return (
    <div>
      <div ref={mapRef} style={containerStyle} />
    </div>
  );
};

export default ReadOnlyMapWithPin;
