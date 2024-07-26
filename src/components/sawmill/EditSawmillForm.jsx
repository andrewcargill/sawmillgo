import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CountrySelect from "../country-components/CountrySelect";
import MapWithPin from "../google-maps/MapWithPin";

const EditSawmillForm = () => {
  const [name, setName] = useState('');
  const [owners, setOwners] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [forestPlan, setForestPlan] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mapLocation, setMapLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([null, null, null]);
  const [imageURLs, setImageURLs] = useState([null, null, null]);
  const [imageDescriptions, setImageDescriptions] = useState(['', '', '']);

  const db = getFirestore(app);
  const storage = getStorage(app);
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
          const sawmillData = sawmillDoc.data();
          setName(sawmillData.name);
          setOwners(sawmillData.owners);
          setLocation(sawmillData.location);
          setDescription(sawmillData.description);
          setForestPlan(sawmillData.forestPlan);
          setContactEmail(sawmillData.contactEmail);
          setCountry(sawmillData.country);
          setMapLocation(sawmillData.mapLocation || null);
          setImageURLs([
            sawmillData.imageURL1 || null,
            sawmillData.imageURL2 || null,
            sawmillData.imageURL3 || null
          ]);
          setImageDescriptions([
            sawmillData.imageDescription1 || '',
            sawmillData.imageDescription2 || '',
            sawmillData.imageDescription3 || ''
          ]);
          setLoading(false);
        } else {
          console.log('No such sawmill document!');
        }
      } catch (error) {
        console.error('Error fetching sawmill details: ', error);
      }
    };

    fetchSawmill();
  }, [db]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.log('Sawmill ID not found.');
      return;
    }

    const sawmillRef = doc(db, `sawmill/${sawmillId}`);
    const updatedData = {
      name,
      owners,
      location,
      description,
      forestPlan,
      contactEmail,
      country,
      mapLocation,
      imageDescription1: imageDescriptions[0],
      imageDescription2: imageDescriptions[1],
      imageDescription3: imageDescriptions[2],
    };

    // Upload images to Firebase Storage if new images are selected
    for (let i = 0; i < images.length; i++) {
      if (images[i] && typeof images[i] !== 'string') {
        const imageRef = ref(storage, `sawmillImages/${sawmillId}/image${i + 1}`);
        await uploadBytes(imageRef, images[i]);
        const imageUrl = await getDownloadURL(imageRef);
        updatedData[`imageURL${i + 1}`] = imageUrl;
        setImageURLs((prev) => {
          const newImageURLs = [...prev];
          newImageURLs[i] = imageUrl;
          return newImageURLs;
        });
      }
    }

    try {
      await updateDoc(sawmillRef, updatedData);
      alert('Sawmill details updated successfully');
      navigate('/sawmill-details'); // Navigate back to sawmill details page
    } catch (error) {
      console.error('Error updating sawmill: ', error);
      alert('Failed to update sawmill');
    }
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleImageDescriptionChange = (e, index) => {
    const newImageDescriptions = [...imageDescriptions];
    newImageDescriptions[index] = e.target.value;
    setImageDescriptions(newImageDescriptions);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Edit Sawmill Details</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Owners"
            value={owners}
            onChange={(e) => setOwners(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Forest Plan"
            value={forestPlan}
            onChange={(e) => setForestPlan(e.target.value)}
            fullWidth
            required
            multiline
            rows={6}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Email"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CountrySelect
            country={country}
            setCountry={setCountry}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Location on Map</Typography>
          <MapWithPin location={mapLocation} setLocation={setMapLocation} />
        </Grid>
        {[0, 1, 2].map((index) => (
          <Grid item xs={12} key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
            {(images[index] || imageURLs[index]) && (
              <div>
                {imageURLs[index] && (
                  <img src={imageURLs[index]} alt={`Sawmill Image ${index + 1}`} width="100" />
                )}
                <TextField
                  label={`Image ${index + 1} Description`}
                  value={imageDescriptions[index]}
                  onChange={(e) => handleImageDescriptionChange(e, index)}
                  fullWidth
                  required
                  multiline
                  rows={2}
                />
              </div>
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Sawmill
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditSawmillForm;
