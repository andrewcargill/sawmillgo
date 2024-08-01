import React, { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config';
import loader from '../../utils/mapLoader'; 

const AreasMap = () => {
  const mapRef = useRef(null);
  const [areas, setAreas] = useState([]);
  const mapInitialized = useRef(false);

  const fetchAreas = async () => {
    const db = getFirestore(app);
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error('Sawmill ID is not available. Cannot fetch areas.');
      return;
    }

    try {
      console.log('Fetching areas from Firestore...');
      const querySnapshot = await getDocs(collection(db, `sawmill/${sawmillId}/locations`));
      const areasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched areas:', areasData);
      setAreas(areasData);
    } catch (error) {
      console.error('Error fetching areas: ', error);
    }
  };

  const calculateBounds = (coordinates) => {
    let bounds = new window.google.maps.LatLngBounds();
    coordinates.forEach(coord => {
      bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
    });
    return bounds;
  };

  const getPolygonColor = (type) => {
    switch (type) {
      case 'Forest':
        return '#228B22'; // Forest green
      case 'Sawmill':
        return '#8B4513'; // Saddle brown
      case 'Storage':
        return '#FFD700'; // Gold
      case 'Drying':
        return '#FF4500'; // Orange red
      default:
        return '#FF0000'; // Default red
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (!mapInitialized.current && areas.length > 0) {
      loader.load().then((google) => {
        console.log('Google Maps loaded');

        const map = new google.maps.Map(mapRef.current, {
          zoom: 2,
          center: { lat: 24.886, lng: -70.268 },
          mapTypeId: 'satellite', 
        });

        console.log('Map initialized:', map);
        mapInitialized.current = true;

        let bounds = new google.maps.LatLngBounds();

        areas.forEach((area) => {
          if (area.coordinates && area.coordinates.length > 0) {
            console.log('Plotting area:', area);

            const polygonCoords = area.coordinates.map(coord => ({
              lat: coord.lat,
              lng: coord.lng,
            }));

            console.log('Polygon coordinates:', polygonCoords);

            const polygonColor = getPolygonColor(area.type);

            const polygon = new google.maps.Polygon({
              paths: polygonCoords,
              strokeColor: polygonColor,
              strokeOpacity: 0.9,
              strokeWeight: 2,
              fillColor: polygonColor,
              fillOpacity: 0.35,
            });

            polygon.setMap(map);
            console.log('Polygon set on map:', polygon);

            // Extend the bounds to include each polygon's coordinates
            polygonCoords.forEach(coord => {
              bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `<div>
                          <strong>${area.name}</strong><br>
                          Type: ${area.type}<br>
                          Description: ${area.description}
                        </div>`,
            });

            // const tooltip = new google.maps.InfoWindow({
            //   content: `<div>${area.name}</div>`,
            // });

            // google.maps.event.addListener(polygon, 'mouseover', (event) => {
            //   tooltip.setPosition(event.latLng);
            //   tooltip.open(map);
            // });

            // google.maps.event.addListener(polygon, 'mouseout', () => {
            //   tooltip.close();
            // });

            google.maps.event.addListener(polygon, 'click', (event) => {
              infoWindow.setPosition(event.latLng);
              infoWindow.open(map);
            });
          } else {
            console.log('No coordinates for area:', area);
          }
        });

        // Set the map to fit all polygons within the view
        map.fitBounds(bounds);
      }).catch((error) => {
        console.error('Error loading Google Maps:', error);
      });
    }
  }, [areas]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} id="map" />;
};

export default AreasMap;
