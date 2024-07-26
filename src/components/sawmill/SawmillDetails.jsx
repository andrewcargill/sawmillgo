import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FlagIcon from "../country-components/FlagIcon";
import CountryNameFromCode from "../country-components/CountryNameFromCode";
import ReadOnlyMapWithPin from "../google-maps/ReadOnlyMapWithPin";
import { ImageCarousel } from "../image-components/SawmillImageGallery";
import FullImageModal from "../image-components/SawmillImageGallery";

const SawmillDetails = () => {
  const [sawmill, setSawmill] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSawmill = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem('user'));
      const sawmillId = userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log('Sawmill ID not found.');
        return;
      }

      const sawmillRef = doc(db, `sawmill/${sawmillId}`);
      try {
        const sawmillDoc = await getDoc(sawmillRef);
        if (sawmillDoc.exists()) {
          setSawmill({ id: sawmillDoc.id, ...sawmillDoc.data() });
        } else {
          console.log('No such sawmill document!');
        }
      } catch (error) {
        console.error('Error fetching sawmill details: ', error);
      }
    };

    fetchSawmill();
  }, [db]);

  const handleEditClick = () => {
    navigate('/edit-sawmill');
  };

  const openImageModal = (index) => {
    setSelectedImage(index);
    setOpenModal(true);
  };

  const closeImageModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      {sawmill ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Sawmill Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Name: {sawmill.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Owners: {sawmill.owners}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Location: {sawmill.location}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Description: {sawmill.description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Forest Plan: {sawmill.forestPlan}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Contact Email: {sawmill.contactEmail}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Country: <FlagIcon countryCode={sawmill.country} /> <CountryNameFromCode countryCode={sawmill.country} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyMapWithPin location={sawmill.mapLocation} />
          </Grid>
          <Grid item xs={12}>
            <ImageCarousel
              items={[
                {
                  src: sawmill.imageURL1,
                  description: sawmill.imageDescription1,
                  altText: "Image 1",
                },
                {
                  src: sawmill.imageURL2,
                  description: sawmill.imageDescription2,
                  altText: "Image 2",
                },
                {
                  src: sawmill.imageURL3,
                  description: sawmill.imageDescription3,
                  altText: "Image 3",
                },
              ]}
              openModal={openImageModal}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              Edit Sawmill
            </Button>
          </Grid>
          <FullImageModal
            isOpen={openModal}
            handleClose={closeImageModal}
            image={
              selectedImage !== null
                ? {
                    src: sawmill[`imageURL${selectedImage + 1}`],
                    description: sawmill[`imageDescription${selectedImage + 1}`],
                    altText: `Image ${selectedImage + 1}`,
                  }
                : null
            }
          />
        </Grid>
      ) : (
        <Typography variant="h6">Loading sawmill details...</Typography>
      )}
    </div>
  );
};

export default SawmillDetails;
