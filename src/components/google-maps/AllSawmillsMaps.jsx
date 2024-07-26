import React, { useEffect, useRef, useState } from 'react';
import loader from '../../utils/mapLoader';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config';
import { Grid } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '600px',

};

const defaultCenter = { lat: 0, lng: 0 };

const AllSawmillsMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [sawmills, setSawmills] = useState([]);

  useEffect(() => {
    const fetchSawmills = async () => {
      const db = getFirestore(app);
      const sawmillsCollection = collection(db, 'sawmill');
      const sawmillDocs = await getDocs(sawmillsCollection);

      const sawmillsData = sawmillDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSawmills(sawmillsData);
    };

    fetchSawmills();
  }, []);

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 2,
        mapId: "56127499ee1ce2ef",
        mapTypeId: "roadmap",
      });

      sawmills.forEach((sawmill) => {
        if (sawmill.mapLocation) {
          new google.maps.Marker({
            position: sawmill.mapLocation,
            map: map,
            title: sawmill.name,
          });
        }
      });

      setMap(map);
    }).catch(error => {
      console.error("Failed to load Google Maps", error);
    });
  }, [sawmills]);

  return (
    <Grid xs={12}>
     
        
          
    
      <div ref={mapRef} style={containerStyle}/>
    
    </Grid>
  );
};

export default AllSawmillsMap;
