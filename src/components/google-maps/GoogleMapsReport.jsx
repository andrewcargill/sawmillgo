import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import loader from '../../utils/mapLoader';  
import { app } from '../../firebase-config';
import treeLabelColors from '../project-report/treeLabelColors.json';
import { doc, getDoc, getFirestore } from 'firebase/firestore';


const containerStyle = {
  width: '100%',
  height: '600px',
};

function GoogleMapsTour({ trees }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);

  const defaultCenter = trees[0]?.position || { lat: 0, lng: 0 };

  const db = getFirestore(app);


  // Fetch lumberjack avatar from Firestore
  const fetchLumberjackAvatar = async (lumberjackId) => {
    console.log('Fetching avatar for lumberjack:', lumberjackId);
    if (!lumberjackId) return null;

    try {
      const userDoc = await getDoc(doc(db, 'users', lumberjackId));
      if (userDoc.exists()) {
        return userDoc.data().imageUrl;  // Retrieve the avatar URL
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return null;  // Return null if no avatar found
  };

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 18,
        mapId: "56127499ee1ce2ef", 
        mapTypeId: "satellite",
        styles: [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      setMap(map);

      google.maps.importLibrary("marker").then(() => {
        trees.forEach(({ tree, position, id, refId }, i) => {
          const { AdvancedMarkerElement, PinElement } = google.maps.marker;

          const marker = new AdvancedMarkerElement({
            position,
            map: map,
            title: `${i + 1}. ${tree?.title}`,
            content: new PinElement({
              glyph: `${i + 1}`,
              scale: 1.5,
              background: treeLabelColors.colors[i],
              borderColor: 'white',
              glyphColor: treeLabelColors.textColors[i],
            }).element
          });

          marker.addListener('click', async () => {
            const treeData = trees[i];

            // Fetch and update avatar
            const avatarUrl = await fetchLumberjackAvatar(treeData.lumberjack);
            setSelectedTree({ ...treeData, lumberjackAvatar: avatarUrl });
            setOpen(true);
          });
        });
      });
    }).catch(error => {
      console.error("Failed to load Google Maps", error);
    });
  }, [trees]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div ref={mapRef} style={containerStyle} />
      {selectedTree && (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
            {selectedTree.title}
          </DialogTitle>
          <DialogContent sx={{ padding: '20px', lineHeight: 1.6 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <img 
                src={selectedTree.lumberjackAvatar || '/default-avatar.png'}  // Display fetched avatar
                alt={selectedTree.lumberjackName} 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginRight: '16px',
                  objectFit: 'cover',
                  border: '3px solid #ddd'  
                }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{selectedTree.lumberjackName}</h3>
                <p style={{ margin: '4px 0', color: '#666' }}>
                  <strong>Date:</strong> {selectedTree.date}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#444',
                  fontStyle: 'italic'
                }}>
                  "{selectedTree.reason}"
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p><strong>System ID:</strong> {selectedTree.refId}</p>
              <p><strong>Position:</strong> {selectedTree.position.lat}, {selectedTree.position.lng}</p>
              <p><strong>Species:</strong> {selectedTree.speciesName}</p>
     
            </div>

            <img 
              src={selectedTree.image} 
              alt="Tree" 
              style={{ 
                width: '100%', 
                maxHeight: '400px', 
                objectFit: 'cover', 
                borderRadius: '8px' 
              }} 
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleClose} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default GoogleMapsTour;
