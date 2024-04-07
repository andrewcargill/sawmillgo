import React, { useState } from 'react';
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import { app } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';

const AddLocationForm = () => {
  const [locationData, setLocationData] = useState({
    name: '',
    type: '',
    description: '',
  });

  const db = getFirestore(app);
  const navigate = useNavigate(); // To navigate after form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error("Sawmill ID is not available. Cannot add location.");
      return;
    }

    try {
      await addDoc(collection(db, `sawmill/${sawmillId}/locations`), locationData);
      alert('Location added successfully!');
      // Optionally navigate to another route after success
      // navigate('/some-route');
      setLocationData({
        name: '',
        type: '',
        description: '',
      });
    } catch (error) {
      console.error("Error adding location: ", error);
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
      <button type="submit">Add Location</button>
    </form>
  );
};

export default AddLocationForm;
