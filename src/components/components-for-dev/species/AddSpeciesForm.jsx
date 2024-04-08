import React, { useState } from 'react';
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore';
import { app } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';

const AddSpeciesForm = () => {
  const [speciesData, setSpeciesData] = useState({
    name: '',
    description: '',
  });

  const db = getFirestore(app);
  const navigate = useNavigate(); // To navigate after form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpeciesData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error("Sawmill ID is not available. Cannot add species.");
      return;
    }

    try {
      // Adjusted path to target 'species' collection inside a sawmill
      await addDoc(collection(db, `sawmill/${sawmillId}/species`), speciesData);
      alert('Species added successfully!');
      // Optionally navigate to another route after success
      // navigate('/species-list');
      setSpeciesData({
        name: '',
        description: '',
      });
    } catch (error) {
      console.error("Error adding species: ", error);
      alert('Failed to add species. See console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Species</h3>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={speciesData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
   
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={speciesData.description}
            onChange={handleChange}
        
          />
        </label>
      </div>
      <button type="submit">Add Species</button>
    </form>
  );
};

export default AddSpeciesForm;
