import React, { useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase-config';
import { useNavigate, useParams } from 'react-router-dom';
import MapComponent from './MapComponent'; // Adjust the path as necessary

const EditLocationForm = () => {
  const [locationData, setLocationData] = useState({
    name: '',
    type: '',
    description: '',
    coordinates: [], // To store polygon coordinates
  });
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const navigate = useNavigate();
  const { locationId } = useParams(); // Get locationId from the URL parameters

  const fetchLocationData = async () => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error('Sawmill ID is not available. Cannot fetch location.');
      return;
    }

    try {
      const docRef = doc(db, `sawmill/${sawmillId}/locations`, locationId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLocationData(docSnap.data());
        setLoading(false);
      } else {
        console.error('No such document!');
        alert('Location not found');
        navigate('/locations'); 
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePolygonComplete = useCallback((coordinates) => {
    console.log('Polygon complete callback:', coordinates); 
    setLocationData((prevState) => ({
      ...prevState,
      coordinates,
    }));
  }, []); // Use an empty dependency array to ensure it's stable

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error('Sawmill ID is not available. Cannot update location.');
      return;
    }

    try {
      const docRef = doc(db, `sawmill/${sawmillId}/locations`, locationId);
      await updateDoc(docRef, locationData);
      alert('Location updated successfully!');
      navigate('/locations'); // Redirect to some other page after success
    } catch (error) {
      console.error('Error updating location:', error);
      alert('Failed to update location. See console for details.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Location</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={locationData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Type:
          <select name="type" value={locationData.type} onChange={handleChange} required>
            <option value="">Select a type</option>
            <option value="Storage">Storage</option>
            <option value="Drying">Drying</option>
            <option value="Forest">Forest</option>
            <option value="Sawmill">Sawmill</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={locationData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <MapComponent onPolygonComplete={handlePolygonComplete} initialCoordinates={locationData.coordinates} />
      <button type="submit">Update Location</button>
    </form>
  );
};

export default EditLocationForm;
