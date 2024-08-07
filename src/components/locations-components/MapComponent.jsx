import React, { useEffect, useRef } from 'react';
import loader from '../../utils/mapLoader'; // Adjust the path to where your mapLoader.js is located

const MapComponent = ({ onPolygonComplete, initialCoordinates = [] }) => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const mapInitialized = useRef(false); // To ensure the map is only initialized once

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

      if (initialCoordinates.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        initialCoordinates.forEach(coord => bounds.extend(new google.maps.LatLng(coord.lat, coord.lng)));
        initializedMap.fitBounds(bounds);

        const polygon = new google.maps.Polygon({
          paths: initialCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          editable: true,
          draggable: true,
        });
        polygon.setMap(initializedMap);
        polygonRef.current = polygon;

        google.maps.event.addListener(polygon.getPath(), 'set_at', () => {
          const path = polygon.getPath();
          const coordinates = [];
          for (let i = 0; i < path.getLength(); i++) {
            coordinates.push({
              lat: path.getAt(i).lat(),
              lng: path.getAt(i).lng(),
            });
          }
          onPolygonComplete(coordinates);
        });

        google.maps.event.addListener(polygon.getPath(), 'insert_at', () => {
          const path = polygon.getPath();
          const coordinates = [];
          for (let i = 0; i < path.getLength(); i++) {
            coordinates.push({
              lat: path.getAt(i).lat(),
              lng: path.getAt(i).lng(),
            });
          }
          onPolygonComplete(coordinates);
        });
      }

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

        // Add an event listener to update the polygon on path change
        google.maps.event.addListener(polygon.getPath(), 'set_at', () => {
          const updatedPath = polygon.getPath();
          const updatedCoordinates = [];
          for (let i = 0; i < updatedPath.getLength(); i++) {
            updatedCoordinates.push({
              lat: updatedPath.getAt(i).lat(),
              lng: updatedPath.getAt(i).lng(),
            });
          }
          onPolygonComplete(updatedCoordinates);
        });

        google.maps.event.addListener(polygon.getPath(), 'insert_at', () => {
          const updatedPath = polygon.getPath();
          const updatedCoordinates = [];
          for (let i = 0; i < updatedPath.getLength(); i++) {
            updatedCoordinates.push({
              lat: updatedPath.getAt(i).lat(),
              lng: updatedPath.getAt(i).lng(),
            });
          }
          onPolygonComplete(updatedCoordinates);
        });

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
        console.log('Place selected:', place); // Log the selected place
        if (place.geometry) {
          initializedMap.setCenter(place.geometry.location);
          initializedMap.setZoom(15);
        }
      });
    });
  }, [onPolygonComplete, initialCoordinates]);

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
