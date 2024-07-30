import React, { useEffect, useRef } from 'react';
import loader from '../../utils/mapLoader'; // Adjust the path as necessary

const StockMapComponent = ({ locations, planks }) => {
  const mapRef = useRef(null);
  const mapInitialized = useRef(false);
  const polygonsRef = useRef([]); // Store references to polygons for cleanup

  useEffect(() => {
    console.log('StockMapComponent useEffect called with locations:', locations); // Log the initial locations prop
    console.log('StockMapComponent useEffect called with planks:', planks); // Log the initial planks prop

    loader.load().then((google) => {
      console.log('Google Maps loaded'); // Log when Google Maps is loaded

      let map;
      if (!mapInitialized.current) {
        map = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
          mapTypeId: 'satellite',
        });
        mapRef.current = map;
        mapInitialized.current = true;
      } else {
        map = mapRef.current;
      }

      let bounds = new google.maps.LatLngBounds();

      // Clear previous polygons
      polygonsRef.current.forEach(polygon => polygon.setMap(null));
      polygonsRef.current = [];

      if (locations.length === 0) {
        console.warn('No locations available to display.');
      } else {
        console.log(`Processing ${locations.length} locations`);
      }

      locations.forEach(location => {
        if (location.coordinates && location.coordinates.length > 0) {
          console.log(`Processing location ${location.id} (${location.name}) with coordinates:`, location.coordinates);
          const polygonCoords = location.coordinates.map(coord => ({
            lat: coord.lat,
            lng: coord.lng,
          }));

          const polygon = new google.maps.Polygon({
            paths: polygonCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          });

          polygon.setMap(map);
          polygonsRef.current.push(polygon); // Store reference for cleanup
          polygonCoords.forEach(coord => bounds.extend(coord));

          const locationPlanks = planks.filter(plank => plank.locationId === location.id);
          console.log(`Planks for location ${location.id} (${location.name}):`, locationPlanks);

          const infoWindowContent = `
            <div>
              <strong>${location.name}</strong><br>
              ${locationPlanks.map(plank => `Plank: ${plank.refId}`).join('<br>')}
            </div>`;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
          });

          google.maps.event.addListener(polygon, 'click', (event) => {
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map);
          });
        } else {
          console.warn(`Location ${location.id} (${location.name}) does not have coordinates.`);
        }
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
    });
  }, [locations, planks]); // Ensure the component re-renders when locations or planks change

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default StockMapComponent;
