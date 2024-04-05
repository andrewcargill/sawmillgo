import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebase-config';

const AddSawmillForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const db = getFirestore(app);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    try {
      // Add a new document with a generated id to the "sawmill" collection
      await addDoc(collection(db, "sawmill"), {
        name,
        location,
        description,
      });

      alert("Sawmill added successfully");
      // Optionally, clear the form fields
      setName('');
      setLocation('');
      setDescription('');
    } catch (error) {
      console.error("Error adding sawmill: ", error);
      alert("Failed to add sawmill");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Sawmill</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Sawmill</button>
    </form>
  );
};

export default AddSawmillForm;
