import React, { useEffect, useRef, useState } from 'react';
import loader from '../../utils/mapLoader'; // Adjust the path to where your mapLoader.js is located

const MapComponent = ({ onPolygonComplete }) => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const mapInitialized = useRef(false); // To ensure the map is only initialized once
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log('MapComponent useEffect called'); // Log when useEffect is called
    if (mapInitialized.current) {
      console.log('Map is already initialized, skipping re-initialization');
      return;
    }
    loader.load().then((google) => {
      console.log('Google Maps loaded'); // Log when Google Maps is loaded

      const initializedMap = new google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      console.log('Map initialized:', initializedMap); // Log map initialization

      drawingManagerRef.current = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          editable: true,
          draggable: true,
        },
      });

      drawingManagerRef.current.setMap(initializedMap);
      setMap(initializedMap);
      mapInitialized.current = true;
      console.log('Drawing Manager initialized:', drawingManagerRef.current); // Log drawing manager initialization

      google.maps.event.addListener(drawingManagerRef.current, 'polygoncomplete', (polygon) => {
        console.log('Polygon complete event fired'); // Log polygon completion event
        drawingManagerRef.current.setDrawingMode(null); // Disable drawing mode after polygon is complete

        if (polygonRef.current) {
          polygonRef.current.setMap(null); // Remove the existing polygon if any
        }

        polygonRef.current = polygon;

        const path = polygon.getPath();
        const coordinates = [];
        for (let i = 0; i < path.getLength(); i++) {
          coordinates.push({
            lat: path.getAt(i).lat(),
            lng: path.getAt(i).lng(),
          });
        }

        console.log('Polygon coordinates:', coordinates); // Log polygon coordinates
        onPolygonComplete(coordinates);

        // Add an event listener to remove the polygon on double click
        google.maps.event.addListener(polygon, 'dblclick', () => {
          polygon.setMap(null); // Remove polygon from the map
          polygonRef.current = null;
          console.log('Polygon removed'); // Log polygon removal
        });
      });

      // Initialize the Autocomplete service
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ['geometry'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          map.setCenter(place.geometry.location);
          map.setZoom(15);
        }
      });
    });
  }, [onPolygonComplete]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter an address"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default MapComponent;
