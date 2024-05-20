
import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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

const colors = ["#FF5733", "#33FFB8", "#3361FF", "#F4FF33", "#8333FF"];
const textColors = ["white", "black", "white", "white", "white"];


function GoogleMapsTour( { trees, getPlankBorderColor }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);

  const defaultCenter = trees[0].position;

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 18,
        mapId: "56127499ee1ce2ef"  // Replace with your actual Map ID
      });

      setMap(map);

      google.maps.importLibrary("marker").then(() => {
        trees.forEach(({tree, position, id, refId }, i) => {
          const { AdvancedMarkerElement, PinElement } = google.maps.marker;
          const marker = new AdvancedMarkerElement({
            position,
            map: map,
            title: `${i + 1}. ${tree?.title}`,
            content: new PinElement({

              glyph: refId,
              scale: 1.5,

                background: colors[i],
                borderColor: 'white',
                glyphColor: textColors[i],
                
            
            }).element
          });

          marker.addListener('click', () => {
            setSelectedTree(trees[i]);
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedTree.title}</DialogTitle>
          <DialogContent>
            <p>ID: {selectedTree.id}</p>
            <p>Position: {selectedTree.position.lat}, {selectedTree.position.lng}</p>
            <p>Removed by: {selectedTree.lumberjackName}, Date: {selectedTree.date}</p>
            <p>Reason: {selectedTree.reason}</p>
            <p>Species: {selectedTree.speciesName}</p>
            <img src={selectedTree.treeImage} alt="Tree" style={{ width: "100%" }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default GoogleMapsTour;

