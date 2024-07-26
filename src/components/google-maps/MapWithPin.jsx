import React, { useEffect, useRef, useState } from 'react';
import loader from '../../utils/mapLoader';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = { lat: 0, lng: 0 };

const MapWithPin = ({ location, setLocation }) => {
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
          draggable: true,
        });

        marker.addListener('dragend', (event) => {
          const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          setLocation(newLocation);
        });

        markerRef.current = marker;
      }

      map.addListener('click', (event) => {
        const newLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        if (markerRef.current) {
          markerRef.current.setPosition(newLocation);
        } else {
          const marker = new google.maps.Marker({
            position: newLocation,
            map: map,
            draggable: true,
          });

          marker.addListener('dragend', (event) => {
            const newLocation = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            setLocation(newLocation);
          });

          markerRef.current = marker;
        }
        setLocation(newLocation);
      });
    }).catch(error => {
      console.error("Failed to load Google Maps", error);
    });
  }, [location]);

  useEffect(() => {
    if (location && markerRef.current) {
      markerRef.current.setPosition(location);
    }
  }, [location]);

  return (
    <div>
      <div ref={mapRef} style={containerStyle} />
    </div>
  );
};

export default MapWithPin;
