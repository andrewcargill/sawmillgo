import React, { useState, useCallback } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent'; // Adjust the path as necessary

const AddLocationForm = () => {
  const [locationData, setLocationData] = useState({
    name: '',
    type: '',
    description: '',
    coordinates: [], // To store polygon coordinates
  });

  const db = getFirestore(app);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePolygonComplete = useCallback((coordinates) => {
    console.log('Polygon complete callback:', coordinates); // Log the coordinates in the callback
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
      console.error('Sawmill ID is not available. Cannot add location.');
      return;
    }

    try {
      await addDoc(collection(db, `sawmill/${sawmillId}/locations`), locationData);
      alert('Location added successfully!');
      setLocationData({
        name: '',
        type: '',
        description: '',
        coordinates: [],
      });
    } catch (error) {
      console.error('Error adding location:', error);
      alert('Failed to add location. See console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Location</h3>
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
            <option value="Creator">Creator</option>
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
      <MapComponent onPolygonComplete={handlePolygonComplete} />
      <button type="submit">Add Location</button>
    </form>
  );
};

export default AddLocationForm;
